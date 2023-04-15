import React from 'react'
import { Helmet } from 'react-helmet-async'

const AboutUs = () => {
    return (
        <>
            <Helmet><title>About Page</title></Helmet>
            <h3 className='text-center'>About Our Ecommerce</h3>
            <div className='d-flex justify-content-center'>
                <div className='card mb-2' style={{ width: "62rem" }}>
                    <div className='cart-body'>
                        <p className='card-text fs-4 p-2 text-wrap' style={{ fontFamily: "initial" }}>
                            Welcome to our online store! We are dedicated to providing you with the best shopping experience possible.
                            Our company was founded with a simple mission: to offer high-quality products at competitive prices and provide
                            exceptional customer service.

                            Our team of experienced professionals sources the latest and greatest products from all around the world to
                            bring them to you in one convenient location. We specialize in a wide range of categories, including fashion,
                            electronics, home and garden, and much more.

                            At our store, we pride ourselves on putting our customers first.
                            We strive to make your shopping experience as easy and enjoyable as possible,
                            which is why we offer a variety of payment and shipping options to suit your needs.
                            If you ever have any questions or concerns,
                            our friendly and knowledgeable customer service team is always available to assist you.

                            We also believe in giving back to the community.
                            That's why we partner with various charities and organizations to donate a portion of
                            our profits to help those in need.

                            Thank you for choosing our store for all your shopping needs.
                            We look forward to serving you and exceeding your expectations.
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

export default AboutUs