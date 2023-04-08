import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom';
import ErrorResp from '../components/ErrorStatus/ErrorResp';
import axios from 'axios';
import { Store } from '../StateManager/store';
import { toast } from 'react-toastify';


const UserProfile = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const { state, dispatch: contextDispatch } = useContext(Store);
    const { userInfo } = state;
    const token = userInfo.token;

    const [update, setUpdate] = useState({
        fullName: userInfo.user.fullName || "",
        email: userInfo.user.email || "",
        phone: userInfo.user.phone || "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);


    const HandleUpdate = (e) => {
        e.preventDefault();
        const { fullName, phone, email, password } = update;

        setLoading(true);

        const data = {
            fullName,
            phone,
            email,
            ...(password && { password }) // Only include password if it's not an empty string
        };

        axios.put(`http://localhost:3200/api/users/${id}`, data,
            {
                headers: { "token": "Bearer " + localStorage.getItem("token") }
            }
        )
            .then((result) => {
                if (result) {
                    console.log({ "update Success": result });
                    contextDispatch({ type: "USER_UPDATED", payload: result.data });
                    localStorage.setItem("userToken", JSON.stringify({ token, user: result.data }))
                    toast.success("User Updated Successfully");
                    navigate(`/profile/${id}`);
                    setLoading(false);
                    setShowForm(false); // Adding this line to set `setShowForm` to false after successful update
                }

            }).catch((err) => {
                console.log({ "Error": err })
                toast.error(ErrorResp(err))
                setLoading(false);
            });


    }

    const handleEdit = () => {
        setShowForm(true);
    }

    return (
        <>
            <Helmet><title>My Profile</title></Helmet>
            <h3 className='text-center'>My Profile</h3>

            <div className='d-flex justify-content-center'>
                <div className='card' style={{ width: "20rem" }}>

                    <div className='card-header '>
                        <h4 className='text-center'>My Profile Info</h4>
                    </div>

                    <div className='card-body'>

                        {userInfo && (
                            <div className='text-center'>
                                <h5 className='card-text'>Name:{' '}{userInfo.user.fullName}</h5>
                                <h5 className='card-text'>Email:{' '}{userInfo.user.email}</h5>
                                <h5 className='card-text'>Phone:{' '}{userInfo.user.phone}</h5>
                                <button className='btn btn-secondary' onClick={handleEdit}>Edit</button>
                            </div>
                        )}

                        {showForm && (
                            <div>


                                <form className='d-flex flex-column' onSubmit={HandleUpdate}>

                                    <label className='mt-1' htmlFor='firstName' >Name</label>
                                    <input type="text" name='firstName' placeholder='eg:Jhon' required
                                        value={update.fullName} onChange={(e) => setUpdate({ ...update, fullName: e.target.value })} />

                                    <label className='mt-1' htmlFor='firstName' >Email</label>
                                    <input type="email" name='firstName' placeholder='eg:email' required
                                        value={update.email} onChange={(e) => setUpdate({ ...update, email: e.target.value })} />

                                    <label className='mt-2' htmlFor='phone' >Phone</label>
                                    <input type="tel" name='phone' placeholder='eg:91xxxxxx00' required
                                        maxLength={10}
                                        value={update.phone} onChange={(e) => setUpdate({ ...update, phone: e.target.value })} />



                                    <label className='mt-2' htmlFor="password">Password</label>
                                    <input type="password" name='password' placeholder='password'
                                        value={update.password} onChange={(e) => setUpdate({ ...update, password: e.target.value })} />

                                    {loading ? "Loading..." : <input className='mt-3' type="submit" value="Update" />}


                                </form>

                                <button className='btn btn-secondary mt-2' onClick={() => setShowForm(false)}>Cancel</button>
                            </div>
                        )}

                    </div>

                </div>
            </div>

        </>
    )
}

export default UserProfile