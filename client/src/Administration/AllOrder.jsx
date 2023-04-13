import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Store } from '../StateManager/store';
import logger from 'use-reducer-logger';
import axios from 'axios';
import ErrorResp from '../components/ErrorStatus/ErrorResp';
import { NavLink } from 'react-router-dom';
import LoaderBox from '../components/Loading/LoaderBox';
import ErrorMsg from '../components/ErrorStatus/ErrorMsg';

const reducerAllOrder = (state, action) => {
    switch (action.type) {
        case "REQUEST_DATA": {
            return { ...state, loading: true };
        }
        case "REQUEAT_DONE": {
            return { ...state, ManageOrders: action.payload, loading: false };
        }
        case "REQUEAT_UPDATE": {
            return { ...state, UpdateOrders: action.payload, loading: false };
        }
        case "ERROR_REQUEST": {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state;
        }
    }
};

const AllOrder = () => {

    const [{ loading, error, ManageOrders }, dispatch] = useReducer(logger(reducerAllOrder), {
        ManageOrders: [],
        loading: true,
        error: ""
    });

    const [editOrder, setEditOrder] = useState(false);

    const [updateOrder, setUpdateOrder] = useState('');

    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {

        const getAllOrders = async () => {
            dispatch({ type: "REQUEST_DATA" });
            try {
                await axios.get("http://localhost:3200/api/order/", {
                    headers: { "token": "Bearer " + localStorage.getItem("token") }
                }
                ).then((res) => {
                    if (res) {
                        dispatch({ type: "REQUEAT_DONE", payload: res.data });
                    }
                })
                    .catch((err) => dispatch({ type: "ERROR_REQUEST", payload: ErrorResp(err) }))

            } catch (error) {
                console.log(error)
            }
        }
        getAllOrders();

    }, [editOrder])

    const handleDetails = (orderId) => {
        setUpdateOrder(orderId)
        setEditOrder(true)
    }


    const handleUpdate = (e, orderID) => {
        e.preventDefault()
        const newOrderStatus = e.target.value;

        axios.put(`http://localhost:3200/api/order/${orderID}`, { orderStatus: newOrderStatus },
            {
                headers: { "token": "Bearer " + localStorage.getItem("token") }
            }
        ).then((res) => {
            if (res) {
                console.log(res.data);
                //setUpdateOrder(res.data)
                dispatch({ type: "REQUEAT_UPDATE", payload: res.data });
                setEditOrder(false)
            }
        }).catch((err) => dispatch({ type: "ERROR_REQUEST", payload: ErrorResp(err) }))
    }


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
                                    <th>Date</th>
                                    <th>Pay_Method</th>
                                    <th>Pay_Status</th>
                                    <th>Order_Status</th>
                                    <th>Price</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    ManageOrders.sort((acc, order) => new Date(order.createdAt) - new Date(acc.createdAt))
                                        .map((order) => {
                                            return (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{order.shippingAddress.fullName}</td>
                                                    <td>{order.createdAt.substring(0, 10)}</td>
                                                    <td>{order.paymentMethod}</td>
                                                    <td>{order.paymentStatus === "pending" ? "Pending" : "Paid"}</td>
                                                    <td>{order.orderStatus}</td>
                                                    <td>{order.totalPrice}</td>

                                                    <td>
                                                        {order.orderStatus === "delivered" ? <button className='btn btn-secondary p-1' disabled>Details</button>
                                                            : <button className='btn btn-secondary p-1' onClick={(e) => handleDetails(order._id)}>Details</button>
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

            {/* Updation Part of Order by ADMIN */}

            {
                editOrder && (
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User_Name</th>
                                    <th>Date</th>
                                    <th>Pay_Method</th>
                                    <th>Pay_Status</th>
                                    <th>Price</th>
                                    <th>Order_Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    ManageOrders
                                        .filter((order) => order._id === updateOrder) // Filter the orders to find the one with the corresponding ID
                                        .map((order) => {
                                            return (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{order.shippingAddress.fullName}</td>
                                                    <td>{order.createdAt.substring(0, 10)}</td>
                                                    <td>{order.paymentMethod}</td>
                                                    <td>{order.paymentStatus === "pending" ? "Pending" : "Paid"}</td>
                                                    <td>{order.totalPrice}</td>

                                                    <td>
                                                        <select defaultValue={order.orderStatus} onChange={(e) => handleUpdate(e, order._id)} >
                                                            <option value="pending">Pending</option>
                                                            <option value="confirmed">Confirmed</option>
                                                            <option value="shipped">Shipped</option>
                                                            <option value="In-Transit">In Transit</option>
                                                            <option value="delivered">Delivered</option>
                                                        </select>
                                                    </td>

                                                    <td>
                                                        <button className='btn btn-secondary p-1' onClick={(e) => setEditOrder(false)} >Cancel</button>
                                                    </td>
                                                </tr>
                                            )
                                        })

                                }

                            </tbody>
                        </table>
                    </div>
                )
            }
            <div className='d-flex justify-content-center'>
                <NavLink to="/admin">
                    <button className='btn btn-secondary mb-3'>BACK</button>
                </NavLink>
            </div>

        </>
    )
}

export default AllOrder