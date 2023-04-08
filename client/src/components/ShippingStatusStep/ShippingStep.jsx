import React from 'react'
import "./shippingStatus.css"

const ShippingStep = (props) => {
    return (
        <>
            <div className='row shipping-line text-center mb-3 mt-1'>
                <div className={props.step_1 ? "col-3 active" : "col-3"}>SignIn</div>
                <div className={props.step_2 ? "col-3 active" : "col-3"}>Shipping</div>
                <div className={props.step_3 ? "col-3 active" : "col-3"}>Payment</div>
                <div className={props.step_4 ? "col-3 active" : "col-3"}>Place Order</div>

            </div>
        </>
    )
}

export default ShippingStep