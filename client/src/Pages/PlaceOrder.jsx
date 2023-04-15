import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink, useNavigate } from 'react-router-dom';
import logger from 'use-reducer-logger';
import ErrorResp from '../components/ErrorStatus/ErrorResp';
import ShippingStep from '../components/ShippingStatusStep/ShippingStep'
import { Store } from '../StateManager/store';
import LoaderBox from '../components/Loading/LoaderBox';
import { toast } from 'react-toastify';

//creating reducer for place order page 
const reducerPlaceOrder = (state, action) => {
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
const PlaceOrder = () => {
    const navigate = useNavigate();

    //calling useReducer hook to dispach the state of Request and using logger to see the how state works on console
    const [{ loading }, dispatch] = useReducer(logger(reducerPlaceOrder), {
        loading: false,
    });

    //requiring data from store using useContext hook that we stores 
    // eslint-disable-next-line
    const { state, dispatch: contextDispatch } = useContext(Store);
    const { cart, shippingInfo, paymentType, userInfo } = state;
    const { id } = userInfo.user.id;
    console.log(paymentType)
    //const { paymentMethod } = paymentType.data.paymentMethod;

    //after requireing state using accordingly like we use `cart` for calculating all the products,price and taxex
    const price = cart.reduce((accumulator, product) => accumulator + parseInt(product.price) * product.quantity, 0);

    let GST = 0; //price * (18 / 100);
    GST = price * (18 / 100);
    GST = Math.round(GST * 100) / 100;

    let shippingCharge = 0;
    if (price > 35) {
        shippingCharge = price * 0.05; // 5% shipping charge
    } else if (price > 15) {
        shippingCharge = price * 0.03; // 3% shipping charge
    }
    // Round the shipping charge to 2 decimal places
    shippingCharge = Math.round(shippingCharge * 100) / 100;

    const totalPrice = price + shippingCharge + GST;

    /*handling place order function that fires when user click to place order button that send all the
    information related to product to backend order routes and model to store in database*/
    const handalPlaceOrder = async () => {

        try {
            //dispatching current state of data to reducer function 
            dispatch({ type: "REQUIEST_DATA" });

            await axios.post("http://localhost:3200/api/order/", {
                totalPrice: totalPrice,
                userId: id,
                products: cart,
                shippingAddress: shippingInfo,
                paymentMethod: paymentType,
            },
                {
                    headers: { "token": "Bearer " + localStorage.getItem("token") }
                }
            ).then((res) => {
                if (res) {
                    console.log(res)

                    if (paymentType === "Cash On Delevery") {
                        dispatch({ type: "REQUIEST_DONE" });
                        contextDispatch({ type: "CLEAR_CART" });
                        localStorage.removeItem("myCart");
                        navigate("/")
                        toast.success("Order Placed Successfully")
                    } else {
                        dispatch({ type: "REQUIEST_DONE" });
                        // contextDispatch({ type: "CLEAR_CART" });
                        // localStorage.removeItem("myCart");
                        //After successfull post we will redirect to the payment page with url payment type and Product id
                        navigate(`/paymentPage/${paymentType}/${res.data._id}`)

                    }
                }
            }).catch((err) => dispatch({ type: "ERROR_REQUIEST", payload: ErrorResp(err) }))
        } catch (error) {
            console.log(error);
        }
    }

    //when you try to access the placeorder page without having any item in cart this useEffect send back to the cart page
    useEffect(() => {
        if (cart.length === 0) {
            navigate("/Cart")
        }
    }, [cart, navigate]);

    return (
        <>
            <div>
                <Helmet><title>Place Order</title></Helmet>

                {/* Shipping step is determine that which page you are active on while checkout */}
                <ShippingStep step_1 step_2 step_3 step_4 />

                <h2 className='text-center'>Place Order</h2>

                <div className='row d-flex justify-content-center'>
                    <div className='col-sm-12 col-lg-5'>
                        <div className='card m-2'>
                            <h3 className='card-header text-center'>Order Preview</h3>
                            <div className='card-body'>

                                <div className='card-text' style={{ fontFamily: "sans-serif" }}>
                                    <h3 className='fw-bolder'>Shipping</h3>
                                    <p><span className='fw-bold'>Name:</span>{" "}{shippingInfo.fullName}</p>
                                    <p><span className='fw-bold'>Contect:</span>{" "}{shippingInfo.mobile} ({shippingInfo.email})</p>
                                    <p><span className='fw-bold'>Address:</span>{" "}{shippingInfo.address}
                                        {shippingInfo.State},{shippingInfo.zip},{shippingInfo.country}</p>
                                    <NavLink to="/shipping">
                                        <button className='btn btn-secondary'>Change</button>
                                    </NavLink>
                                </div>

                                <hr />

                                <div className='card-text' style={{ fontFamily: "sans-serif" }}>
                                    <h3 className='fw-bolder'>Payment</h3>
                                    <p><span className='fw-bold'>Payment Method:</span>{" "}{paymentType}</p>
                                    <NavLink to="/payType">
                                        <button className='btn btn-secondary'>Change</button>
                                    </NavLink>
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
                                                    cart.map((product) => {
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
                                        <NavLink to="/Cart">
                                            <button className='btn btn-secondary'>Change</button>
                                        </NavLink>
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
                                        <p>Products Price:</p>
                                        <span>{price}$</span>
                                    </li>
                                    <li className='d-flex justify-content-between'>
                                        <p>Shipping Charge:</p>
                                        <span>{shippingCharge}$</span>
                                    </li>
                                    <li className='d-flex justify-content-between'>
                                        <p>GST: <span style={{ color: "darkred" }}>@18%</span></p>
                                        <span>{GST}$</span>
                                    </li>
                                    <hr />
                                    <li className='d-flex justify-content-between'>
                                        <p>Totle: <span style={{ color: "red" }}>*</span></p>
                                        <span>{totalPrice}$</span>
                                    </li>
                                </ul>
                                <div className='d-flex justify-content-center'>
                                    {loading
                                        ? (<LoaderBox />)
                                        : (
                                            <NavLink to="#">
                                                <button className='btn btn-secondary' onClick={handalPlaceOrder}>Place Order</button>
                                            </NavLink>)
                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceOrder