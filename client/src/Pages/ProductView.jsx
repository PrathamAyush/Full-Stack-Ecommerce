import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import "./productview.css"

const CART_STORAGE_KEY = 'myCart';

const ProductView = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer.cart);

    const [viewProduct, setViewProduct] = useState({});


    const { id } = useParams();
    useEffect(() => {
        //console.log(id)
        const productView = () => {
            axios.get(`http://localhost:3200/api/product/${id}`)
                .then((res) => setViewProduct(res.data)).catch((err) => console.log(err))
        }
        productView();
    }, [id]);

    const handleAddToCart = () => {
        //console.log("Adding to cart:", viewProduct);
        dispatch({ type: "ADD_TO_CART", payload: viewProduct });

        //const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        // Save the token to localStorage
        // const cartData = localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        // if (cartData) {
        //     dispatch({ type: "SET_CART", payload: JSON.parse(cartData) });
        // }
    }



    return (
        <>
            <div>
                {viewProduct ? (
                    <div className='container' key={viewProduct.id}>

                        {/* Row Starts for Displaying Products in Gride System */}
                        < div className='row mt-2'>

                            {/* First Column With Proper BreakPoints */}
                            <div className='col-sm-12 col-md-6 col-lg-6'>

                                <div className='card card-inner border-0'>
                                    <img src={viewProduct.img}
                                        alt="Prodict_Image.." className='card-img-top card-pd-img' />

                                    {/* This Buttons Are Enable when View Size Is above 765px */}

                                    <div className='card-body card-btn-lable-1'>

                                        {/* <input type="button" value="Add to Cart" className='btn-style-1' id='btn1' /> */}

                                        <button className='btn-style-1' id='btn1' onClick={handleAddToCart} >
                                            <NavLink to="/Cart" className="text-decoration-none text-dark">Add to Cart</NavLink>
                                        </button>

                                        {/* <input type="button" value="Buy Now"  /> */}

                                        <button className='btn-style-2' id='btn2' >
                                            <NavLink to="#" className="text-decoration-none text-dark">Buy Now</NavLink>
                                        </button>
                                    </div>
                                </div>

                            </div>

                            {/* Second Column Its Product Discription Column */}
                            <div className='col-sm-12 col-md-6 col-lg-6'>

                                <div className='card border-0'>
                                    <div className='card-header bg-body'>
                                        <h2 className='text-muted fs-5  mb-0'>
                                            {viewProduct.title}
                                        </h2>
                                    </div>
                                    <div className='card-body'>
                                        <p className='card-text text-muted m-0'>
                                            Original Price: <span className='text-decoration-line-through'>{viewProduct.price}</span>
                                        </p>
                                        <p className='card-text fs-5 fw-semibold m-0'>For You Only: {viewProduct.price}</p>
                                        <p className='card-text text-muted fst-italic m-0'>You Save 50%</p>

                                        <p className='card-text fw-semibold fst-italic mt-4'>Product Discription:
                                            <span className='text-muted fst-normal fw-normal'>
                                                {viewProduct.disc}
                                            </span>
                                        </p>
                                    </div>

                                    {/* This Button is Enable When View Size going below to 765px */}
                                    <div className=' card-btn-lable-2'>

                                        {/* <input type="button" value="Add to Cart" className='btn-style-1' id='btn3' /> */}

                                        <button className='btn-style-1' id='btn3' onClick={handleAddToCart} >
                                            <NavLink to="/Cart" className="text-decoration-none text-dark">Add to Cart</NavLink>
                                        </button>

                                        {/* <input type="button" value="Buy Now" className='btn-style-2' id='btn4' /> */}

                                        <button className='btn-style-2' id='btn4' >
                                            <NavLink to="/buyNow" className="text-decoration-none text-dark">Buy Now</NavLink>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (<p>Product Is No Longer Avaliable.....</p>)}
            </div>
        </>
    )
}

export default ProductView