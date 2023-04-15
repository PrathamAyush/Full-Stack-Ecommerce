import React from 'react'
import { Helmet } from 'react-helmet-async'

const ContactUs = () => {
    return (
        <>
            <Helmet><title>Contact Page</title></Helmet>
            <h3 className='text-center'>Contect To Our Ecommerce Team</h3>
            <div className='d-flex justify-content-center'>
                <div className='card mb-2' style={{ width: "62rem" }}>
                    <div className='cart-body'>
                        <p className='card-text fs-5 p-2 text-wrap' style={{ fontFamily: "initial" }}>
                            We value our customers and are committed to providing exceptional service. Please don't hesitate to reach out to us with any questions or concerns.
                            <br /><br />
                            <span className='fw-bolder'>Phone:</span>
                            You can reach us by phone at <span className='fw-bold'>(+918292744536)</span> during the following hours:
                            Monday - Friday: 9am - 5pm EST
                            Saturday - Sunday: Closed
                            <br /><br />
                            <span className='fw-bolder'>Email:</span>
                            If you prefer to contact us by email, please send your inquiry to <span className='fw-bold'>(singhayugh6049@gmail.com)</span>. We strive to respond to all emails within 24 hours.
                            <br /><br />
                            <span className='fw-bolder'>Address:</span>
                            Our headquarters is located at <span className='fw-bold'>(Lane-6 west to Hanuman Mandir, PrabhunathNagar Chapra Bihar)</span>. While we do not have a physical store, we welcome any customers who would like to pick up their orders in person. Please reach out to us in advance to arrange for pickup.
                            <br /><br />
                            Thank you for choosing our Ecommerce store. We look forward to hearing from you!
                            <br /><br />
                            <span className='fw-bold'>Sincerely,</span>
                            <br />
                            <span className='fw-bold'>Team Ecommerce</span>
                            <br />
                            <span className='fst-italic fw-bold text-muted'>The H3rmit Corp</span>
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ContactUs