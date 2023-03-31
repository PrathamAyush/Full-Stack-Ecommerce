import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, } from 'react-router-dom';
import ShippingStep from '../components/ShippingStatusStep/ShippingStep'
import { Store } from '../StateManager/store';

const PaymentPage = () => {

    const { state, dispatch: contextDispatch } = useContext(Store);
    const { shippingInfo, paymentType } = state;
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState(paymentType || "Paypal");

    const handalPayment = (e) => {
        e.preventDefault();
        if (paymentMethod === "Paypal") {
            contextDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
            localStorage.setItem("paymentType", paymentMethod);
            navigate(`/${paymentType}/placeOrder`);
        } else if (paymentMethod === "Paytm") {
            contextDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
            localStorage.setItem("paymentType", paymentMethod);
            navigate(`/${paymentType}/placeOrder`);
        }

    }

    useEffect(() => {
        if (!shippingInfo) {
            navigate("/shipping");
        }
    }, [navigate, shippingInfo])
    return (
        <>
            <Helmet>
                <title>
                    Payment Method
                </title>
            </Helmet>
            <ShippingStep step_1 step_2 step_3 />
            <h2 className='text-center'>Payment Method</h2>
            <div className='d-flex justify-content-center'>
                <div className='card' style={{ width: "18rem" }}>
                    <p className='card-header fw-bolder'>Payment Options</p>
                    <div className='card-body'>
                        <form onSubmit={handalPayment}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio"
                                    name="flexRadioDefault" id="flexRadioDefault1" value={"Paypal"}
                                    checked={paymentMethod === "Paypal"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label className="form-check-label fw-bold" htmlFor="flexRadioDefault1">
                                    Paypal
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio"
                                    name="flexRadioDefault" id="flexRadioDefault2" value={"Paytm"}
                                    checked={paymentMethod === "Paytm"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label className="form-check-label fw-bold" htmlFor="flexRadioDefault2">
                                    Paytm
                                </label>
                            </div>
                            <input className='btn btn-secondary mt-2' type="submit" value="Continue" />
                        </form>

                    </div>

                </div>
            </div>

        </>
    )
}

export default PaymentPage