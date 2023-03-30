import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from "react-helmet-async"
import { useNavigate } from 'react-router-dom';
import ShippingStep from '../components/ShippingStatusStep/ShippingStep';
import { Store } from '../StateManager/store';
import "./shipping.css"

const defaultForm = { fullName: "", email: "", mobile: "", address: "", state: "", zip: "", country: "" };

const Shipping = () => {

    const { state, dispatch: contextDispatch } = useContext(Store);
    const { userInfo, shippingInfo } = state;

    const [formData, setFormData] = useState(shippingInfo || defaultForm);
    const navigate = useNavigate();

    const handalShipping = (e) => {
        e.preventDefault();

        const { fullName, email, mobile, address, state, zip, country } = formData;

        contextDispatch({
            type: "STORE_SHIPPING_ADDRESS", payload: { fullName, email, mobile, address, state, zip, country }
        });

        localStorage.setItem("ShipAddress", JSON.stringify({ fullName, email, mobile, address, state, zip, country }));
        navigate("/payment")
        setFormData(defaultForm)
    }

    //useEffect to protecting Route when user not loggedin 
    useEffect(() => {
        if (!userInfo) {
            navigate("/SignIn?redirect=/shipping");
        }
    }, [navigate, userInfo])

    return (
        <>
            <Helmet>
                <title>Shipping Process</title>
            </Helmet>
            <ShippingStep step_1 step_2></ShippingStep>
            <h2 className='text-center'>Shipping Process</h2>
            <div className='container d-flex justify-content-center'>
                <div className='card card-shadow' style={{ width: "28rem" }} >
                    <div className='card-body'>
                        <form className='d-flex flex-column form-controler' onSubmit={handalShipping}>

                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" name='fullName' id='fullName' placeholder='Name' required
                                value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />

                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' id='email' placeholder='Email' required
                                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                            <label htmlFor="mobile">Mobile.No</label>
                            <input type="number" name='mobile' id='mobile' placeholder='mobile' required
                                value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />

                            <label htmlFor="address">Address</label>
                            <input type="text" name='address' id='address' placeholder='Address' required
                                value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />

                            <label htmlFor="state">State</label>
                            <input type="text" name='state' id='state' placeholder='State' required
                                value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />

                            <label htmlFor="zip">Zip/Pin code</label>
                            <input type="text" name='zip' id='zip' placeholder='Zip/Pin code' required
                                value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />

                            <label htmlFor="country">country</label>
                            <input type="text" name='country' id='country' placeholder='country' required
                                value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />

                            <input className='btn btn-warning mt-3 fw-bold' type="submit" id='submit' value={"Continue"} />
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Shipping