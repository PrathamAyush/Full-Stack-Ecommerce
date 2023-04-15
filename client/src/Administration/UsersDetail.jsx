import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import LoaderBox from '../components/Loading/LoaderBox';
import { Helmet } from 'react-helmet-async';
import logger from 'use-reducer-logger';
import { Store } from '../StateManager/store';
import ErrorMsg from '../components/ErrorStatus/ErrorMsg';
import ErrorResp from '../components/ErrorStatus/ErrorResp';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


const reducerGetUsers = (state, action) => {
    switch (action.type) {
        case "REQUEST_DATA": {
            return { ...state, loading: true };
        }
        case "REQUEAT_DONE": {
            return { ...state, ManageUsers: action.payload, loading: false };
        }
        case "REQUEAT_UPDATE": {
            return { ...state, ManageUsers: action.payload, loading: false };
        }
        case "REQUEAT_DELETE": {
            return { ...state, loading: false };
        }
        case "ERROR_REQUEST": {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state;
        }
    }
};

const UsersDetail = () => {


    const [delUser, setDelUser] = useState('')
    const [edtUser, setEDTUser] = useState(false)


    const [{ loading, error, ManageUsers }, dispatch] = useReducer(logger(reducerGetUsers), {
        ManageUsers: [],
        loading: true,
        error: ""
    });

    const { state } = useContext(Store);
    const { userInfo } = state;

    // Getting All User Details
    const getUserDetails = () => {
        dispatch({ type: "REQUEST_DATA" })
        axios.get("http://localhost:3200/api/users/user",
            {
                headers: { "token": "Bearer " + localStorage.getItem("token") }
            }
        ).then((res) => {
            if (res) {
                console.log(res);
                dispatch({ type: "REQUEAT_DONE", payload: res.data });
                //setGetUser(res.data)
            }
        }).catch((err) => {
            console.log(err);
            dispatch({ type: "ERROR_REQUEST", payload: ErrorResp(err) })
        })
    }


    const editUser = (id, isAdmin) => {

        if (!id) {
            return;
        }

        axios.put(`http://localhost:3200/api/users/${id}`, { isAdmin },
            {
                headers: { "token": "Bearer " + localStorage.getItem("token") }
            }
        ).then((res) => {
            if (res) {
                console.log(res);
                setEDTUser(false)
                const updatedUsers = ManageUsers.map((user) =>
                    user._id === id ? { ...user, isAdmin } : user
                );
                dispatch({ type: "REQUEAT_UPDATE", payload: updatedUsers });
                //dispatch({ type: "REQUEAT_UPDATE", payload: res.data });
                toast.success("USER UPDATED")

            }
        }).catch((err) => {
            console.log(err);
            dispatch({ type: "ERROR_REQUEST", payload: ErrorResp(err) })
        })
    }

    const deleteUser = (id) => {

        if (!id) {
            return;
        }

        axios.delete(`http://localhost:3200/api/users/${id}`,
            {
                headers: { "token": "Bearer " + localStorage.getItem("token") }
            }
        ).then((res) => {
            if (res) {
                console.log(res);
                dispatch({ type: "REQUEAT_DELETE" });
                toast.success("USER Deleted")
                setDelUser(res)

            }
        }).catch((err) => {
            console.log(err);
            dispatch({ type: "ERROR_REQUEST", payload: ErrorResp(err) })
        })
    }

    useEffect(() => {
        getUserDetails();

    }, [delUser, edtUser])

    return (
        <>
            <div>
                <Helmet><title>All Order</title></Helmet>
                <div className='text-center'>
                    <h4>Welcome To The Admin Panal</h4>
                    <h5>{userInfo.user.fullName}</h5>
                </div>

                <div className='m-3 table-responsive'>
                    {loading ? (
                        <LoaderBox />
                    ) : error ? (
                        <ErrorMsg className="alert alert-warning text-center" role="alert">
                            {error}
                        </ErrorMsg>
                    ) : (

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User_Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Admin</th>
                                    <th>Changes</th>

                                </tr>
                            </thead>
                            <tbody>

                                {
                                    ManageUsers
                                        .map((user) => {
                                            return (
                                                <tr key={user._id}>
                                                    <td>{user._id}</td>
                                                    <td>{user.fullName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone}</td>
                                                    <td>
                                                        {
                                                            edtUser ?
                                                                (<select defaultValue={user.isAdmin} onChange={(e) => editUser(user._id, e.target.value)} >
                                                                    <option value={true}>True</option>
                                                                    <option value={false}>False</option>
                                                                </select>)
                                                                :
                                                                (user.isAdmin === true ? "ADMIN" : "USER")
                                                        }
                                                    </td>
                                                    <td>
                                                        {user.isAdmin === true ?
                                                            <button className='btn btn-secondary btn-sm'
                                                                style={{ width: "4rem", padding: "2px" }} onClick={() => setEDTUser(true)} >
                                                                Edit
                                                            </button> : <button className='btn btn-secondary btn-sm'
                                                                style={{ width: "4rem", padding: "2px" }} onClick={() => deleteUser(user._id)} >
                                                                Delete
                                                            </button>

                                                        }   {" "}
                                                        {
                                                            edtUser ?
                                                                (<button className='btn btn-secondary btn-sm'
                                                                    style={{ width: "4rem", padding: "2px" }} onClick={() => setEDTUser(false)} >
                                                                    Cancel
                                                                </button>) : ""

                                                        }


                                                    </td>
                                                </tr>
                                            )
                                        })
                                }

                            </tbody>
                        </table>

                    )}
                </div>
            </div>


            <div className='d-flex justify-content-center'>
                <NavLink to="/admin">
                    <button className='btn btn-secondary mb-3'>BACK</button>
                </NavLink>
            </div>

        </>
    )
}

export default UsersDetail