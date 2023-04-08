import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import logger from 'use-reducer-logger';
import ShippingStep from '../components/ShippingStatusStep/ShippingStep'
import { Store } from '../StateManager/store';
import LoaderBox from '../components/Loading/LoaderBox';

//creating reducer for place order page 
const reducerOrder = (state, action) => {
    switch (action.type) {
        case "REQUIEST_DATA": {
            return { ...state, loading: true };
        }
        case "REQUIEST_DONE": {
            return { ...state, loading: false };
        }
        case "ERROR_REQUIEST": {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state;
        }
    }
};

//place order page function
const OrderDetail = () => {
    const navigate = useNavigate();

    //calling useReducer hook to dispach the state of Request and using logger to see the how state works on console
    const [{ loading }, dispatch] = useReducer(logger(reducerOrder), {
        loading: false,
    });

    //requiring data from store using useContext hook that we stores 
    // eslint-disable-next-line
    const { state, dispatch: contextDispatch } = useContext(Store);
    const { userInfo } = state;



    const [detail, setDetail] = useState("");


    const { id } = useParams();

    // const orderDetail = () => {
    //     axios.get(`http://localhost:3200/api/order/myOrder/${id}`,
    //         {
    //             headers: { "token": "Bearer " + localStorage.getItem("token") }
    //         }
    //     ).then((res) => {
    //         if (res) {
    //             console.log(res.data)
    //             setDetail(res.data)
    //             contextDispatch({ type: "ORDER_DETAIL", payload: res.data });
    //             localStorage.setItem("orderInfo", JSON.stringify(res.data))

    //         }
    //     }).catch((err) => console.log(err))
    // }

    //when you try to access the placeorder page without having any item in cart this useEffect send back to the cart page
    useEffect(() => {
        const orderDetail = () => {
            axios.get(`http://localhost:3200/api/order/myOrder/${id}`,
                {
                    headers: { "token": "Bearer " + localStorage.getItem("token") }
                }
            ).then((res) => {
                if (res) {
                    console.log(res.data)
                    setDetail(res.data)
                    contextDispatch({ type: "ORDER_DETAIL", payload: res.data });
                    if (res.data.paymentStatus === "pending") {


                    }

                }
            }).catch((err) => console.log(err))
        }
        orderDetail()
        if (!userInfo) {
            navigate("/")
        }

    }, [id, contextDispatch, userInfo, navigate]);

    const handleOrderDetail = () => {
        localStorage.setItem("orderInfo", JSON.stringify(detail))
        //localStorage.removeItem("orderInfo");
        //contextDispatch({ type: "CLEAR_ORDER_DETAIL" });
    }

    return (
        <>
            <div>
                <Helmet><title>Order Details</title></Helmet>

                {/* Shipping step is determine that which page you are active on while checkout */}
                {/* <ShippingStep step_1 step_2 step_3 step_4 /> */}

                <h2 className='text-center'>Order Detail</h2>

                <div className='row d-flex justify-content-center'>
                    <div className='col-sm-12 col-lg-5'>
                        <div className='card m-2'>
                            <h3 className='card-header text-center'>Order Preview</h3>
                            <div className='card-body'>

                                {detail.shippingAddress && (
                                    <div className='card-text' style={{ fontFamily: "sans-serif" }}>
                                        <h3 className='fw-bolder'>Shipping</h3>
                                        <p><span className='fw-bold'>Name:</span>{" "}{detail.shippingAddress.fullName}</p>
                                        <p><span className='fw-bold'>Contect:</span>{" "}{detail.shippingAddress.mobile} ({detail.shippingAddress.email})</p>
                                        <p><span className='fw-bold'>Address:</span>{" "}{detail.shippingAddress.address}
                                            {detail.shippingAddress.State},{detail.shippingAddress.zip},{detail.shippingAddress.country}</p>
                                    </div>
                                )}

                                <hr />

                                <div className='card-text' style={{ fontFamily: "sans-serif" }}>
                                    <h3 className='fw-bolder'>Payment</h3>
                                    <p><span className='fw-bold'>Payment Method:</span>{" "}{detail.paymentMethod}</p>

                                </div>

                                <hr />

                                <div className='card-text' style={{ fontFamily: "sans-serif" }}>
                                    <h3 className='fw-bolder'>Products</h3>
                                    <div className='table-responsive'>
                                        <table className="table">
                                            <thead>
                                                <tr >
                                                    <th>Product</th>
                                                    <th>Title</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    detail.products && detail.products.map((product) => {
                                                        return (
                                                            <tr key={product._id}>
                                                                <td><img src={product.img}
                                                                    alt={product.title} width="30%" height={"50px"} /></td>
                                                                <td>{product.title}</td>
                                                                <td>{product.quantity}</td>
                                                                <td>{product.price}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-12 col-lg-3'>
                        <div className='card m-2'>
                            <h3 className='card-header text-center '>Order Summery</h3>

                            <div className='card-body'>
                                <ul className='card-text fw-bold' style={{ listStyle: "none" }}>

                                    <li className='d-flex justify-content-between'>
                                        <p>Totle: <span style={{ color: "red" }}>*</span></p>
                                        <span>&#8377; {detail.totalPrice}</span>
                                    </li>
                                </ul>
                                {detail.paymentStatus === "pending"

                                    ?
                                    <div className='d-flex justify-content-center'>
                                        {loading
                                            ? (<LoaderBox />)
                                            : (
                                                <NavLink to={`/paymentPage/${detail.paymentMethod}/${detail._id}`}>
                                                    <button className='btn btn-secondary' onClick={handleOrderDetail}>Place Order</button>
                                                </NavLink>)
                                        }

                                    </div>
                                    : <p className='fw-bold'>Paid</p>
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetail