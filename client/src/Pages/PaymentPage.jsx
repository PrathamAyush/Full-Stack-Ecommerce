import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../StateManager/store';
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import axios from 'axios';
import LoaderBox from '../components/Loading/LoaderBox';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import logger from 'use-reducer-logger';
import ErrorResp from '../components/ErrorStatus/ErrorResp';


//reducer for payment Process
const reducerPaymentOrder = (state, action) => {
    switch (action.type) {
        case "REQUEST_PAY": {
            return { ...state, loadingPay: true };
        }
        case "PAY_SUCCESS": {
            return { ...state, loadingPay: false, successPay: true };
        }
        case "PAY_FAIL": {
            return { ...state, loadingPay: false, }
        }
        case "PAY_RESET": {
            return { ...state, loadingPay: false, successPay: false }
        }
        default: {
            return state;
        }
    }
};


//Payment Page function
const PaymentPage = () => {

    const navigate = useNavigate();

    //getting record from store to manage the state
    const { state, dispatch: contextDispatch } = useContext(Store);
    const { cart, paymentType, } = state;
    //console.log(orderDetails);

    const orderinfo = JSON.parse(localStorage.getItem("orderInfo"));
    console.log(orderinfo)

    //useReducer for payment to handle the state instead of useState hook
    const [{ successPay, loadingPay }, dispatch] = useReducer(logger(reducerPaymentOrder), {
        loadingPay: false,
        successPay: false
    });


    //paypal reducer function to handle paypal buttons
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    //getting record from store of cart to calculate priceing of products and texese
    const price = cart.reduce((accumulator, product) => accumulator + parseInt(product.price) * product.quantity, 0);

    let GST = 0; //price * (18 / 100);
    GST = price * (18 / 100);
    GST = Math.round(GST * 100) / 100;

    let shippingCharge = 0;
    if (price > 30) {
        shippingCharge = price * 0.05; // 5% shipping charge
    } else if (price > 10) {
        shippingCharge = price * 0.03; // 3% shipping charge
    }
    // Round the shipping charge to 2 decimal places
    shippingCharge = Math.round(shippingCharge * 100) / 100;

    const totalPrice = price + shippingCharge + GST;


    //fuctions for Paypal Buttons when order create
    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: totalPrice || orderinfo.totalPrice },

                    }

                ]
            }).then((orderID) => {
                return orderID;
            });
    }

    //fuctions for Paypal Buttons when order Approved
    const { id } = useParams();
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            try {
                dispatch({ type: "REQUEST_PAY" });
                axios.put(`http://localhost:3200/api/order/user/${id}`, { paymentStatus: true, details },
                    {
                        headers: { "token": "Bearer " + localStorage.getItem("token") }
                    }
                ).then((res) => {
                    if (res) {
                        console.log(res);
                        dispatch({ type: "PAY_SUCCESS", payload: res.data.paymentStatus });
                        toast.success("Paymet Success");
                        contextDispatch({ type: "CLEAR_CART" });
                        contextDispatch({ type: "CLEAR_ORDER_DETAIL" });
                        localStorage.removeItem("myCart");
                        navigate("/");
                    } else {
                        toast.warn("Payment Not Completed");
                        dispatch({ type: 'PAY_FAIL' });
                    }
                })
            } catch (error) {
                dispatch({ type: 'PAY_FAIL', payload: ErrorResp(error) });
                toast.error(ErrorResp(error));
            }
        })
    };

    //fuctions for Paypal Buttons when order have some issue and error
    const onError = (err) => {
        toast.error(ErrorResp(err))
    }


    //Getting paypal key/client_ID from backend to perform paypal paymant process 
    useEffect(() => {
        const payPalLoader = () => {
            axios.get(`http://localhost:3200/api/keys/paypal`, {
                headers: { "token": "Bearer " + localStorage.getItem("token") }
            }).then(({ clientId }) => {
                if (clientId) {
                    paypalDispatch({
                        type: "resetOptions",
                        value: {
                            "client-id": clientId,
                            currency: "INR",
                            disableFunding: "card,credit",
                            "merchant-id": "YOUR_MERCHANT_ID"
                        }
                    });
                    paypalDispatch({ type: "setLoadingStatus", value: "pending" })
                }
            })
        }
        payPalLoader();
        if (successPay) {

            payPalLoader();
            dispatch({ type: "PAY_RESET" })
        }
        localStorage.removeItem("orderInfo")
        if (orderinfo === null && totalPrice === 0) {
            navigate("/myOrder")
        }
    }, [paypalDispatch, successPay, id, totalPrice, orderinfo, navigate])

    return (
        <>
            <h3 className='text-center'>Payment Using {paymentType}</h3>

            <div className='container d-flex justify-content-center'>

                <div className='card m-2'>
                    <h3 className='card-header text-center '>Pay Order</h3>
                    <div className='card-body'>
                        {
                            orderinfo
                                ?
                                (
                                    <div>
                                        <ul className='card-text fw-bold me-3' style={{ listStyle: "none" }}>
                                            <li className='d-flex justify-content-between'>
                                                <p>Products Price:</p>
                                                <span>{orderinfo.totalPrice}$</span>
                                            </li>
                                        </ul>
                                        {isPending
                                            ?
                                            (<LoaderBox />) : (
                                                <div>
                                                    <PayPalScriptProvider>
                                                        <PayPalButtons createOrder={createOrder}
                                                            onApprove={onApprove}
                                                            onError={onError} />
                                                    </PayPalScriptProvider>
                                                </div>

                                            )}
                                        {loadingPay && <LoaderBox />}
                                    </div>

                                ) : (
                                    <div>
                                        <ul className='card-text fw-bold me-3' style={{ listStyle: "none" }}>
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
                                        {isPending
                                            ?
                                            (<LoaderBox />) : (
                                                <div>
                                                    <PayPalScriptProvider>
                                                        <PayPalButtons createOrder={createOrder}
                                                            onApprove={onApprove}
                                                            onError={onError} />
                                                    </PayPalScriptProvider>
                                                </div>

                                            )}
                                        {loadingPay && <LoaderBox />}
                                    </div>
                                )}


                    </div>
                </div>

            </div>
        </>
    )
}

export default PaymentPage