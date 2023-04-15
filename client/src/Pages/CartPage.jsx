import React, { useContext, useEffect, useState } from 'react'
import "./cart.css"
import assuredLogo from "../Images/CartAssurence/eLogo2.gif"
import assuredTitle from "../Images/CartAssurence/assuredTitle2.gif"
import { Store } from '../StateManager/store'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'


const CartPage = () => {
    // const dispatch = useDispatch();

    // const cart = useSelector((state) => state.cartReducer.cart)
    // console.log("Cart: ", cart)
    const { state, dispatch: contextDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    console.log("Cart:", cart)


    const [subTotal, setSubTotal] = useState(0);
    //const [cartToken, setCarttoken] = useState(cart)

    useEffect(() => {
        console.log("Mounted")
        let price = cart.reduce((accumulator, product) => accumulator + parseInt(product.price) * product.quantity, 0);
        setSubTotal(price);

        // axios.post("http://localhost:3200/api/cart", cart, {
        //     headers: { "token": "Bearer " + localStorage.getItem("token") }
        // })
        //     .then(() => {
        //         console.log(cart)
        //         localStorage.setItem("cartKey", JSON.stringify(cart))
        //         //navigate("/Cart")
        //     })
        //     .catch((err) => console.log(err)); 
        localStorage.setItem("myCart", JSON.stringify(cart))
        console.log("Unmounted")
    }, [cart])

        // useEffect(() => {
        //     // axios.get("http://localhost:3200/api/cart", {
        //     //     headers: { "token": "Bearer " + localStorage.getItem("token") }
        //     // }).then(response => {
        //     //     console.log(response.data);
        //     // })
        //     //     .catch(error => {
        //     //         console.log(error);
        //     //     });

        // }, [])

        //console.log(cart.map((product) => { return (product.title + (product.quantity)) }))

        ;



    return (
        <>
            <Helmet><title>Shopping Cart</title></Helmet>
            <div>
                <div className='container'>
                    <div className='row mt-2'>
                        <div className='col-sm-12 col-md-8 col-lg-8'>
                            <div className='card '>
                                <div className='card-header bg-body '>
                                    <h2 className=' fw-medium fs-3 m-0'>Shopping Cart</h2>
                                    <p className='text-muted d-flex justify-content-end m-0' id='lg-price' >Price</p>
                                </div>

                                {cart.length === 0 ? <p className='text-center fs-2'> Your cart is currently empty</p>
                                    :
                                    cart.map((product) => {
                                        return (

                                            <div className='card-body' key={product._id}>
                                                <ul>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-6 col-lg-2'>
                                                            <img src={product.img}
                                                                alt="" className='buy-card-img' />
                                                        </div>

                                                        <div className='col-sm-12 col-md-6 col-lg-9'>
                                                            <h3 className='m-0 fs-6'>{product.title}</h3>
                                                            <hr className='mt-2 mb-0' />
                                                            <p className='buy-info-1'>Usually Dispatch Between 2 Day's</p>

                                                            <span className='d-flex mt-1 align-items-center p-0'>
                                                                <img className='assuredLogo1 rounded-circle' src={assuredLogo} alt="logo.." />
                                                                <img className='assuredLogo2' src={assuredTitle} alt="assured" />
                                                            </span>

                                                            <div className='d-flex  align-items-center m-1'>

                                                                <button className='btn btn-plus-minus' >
                                                                    <i className="fa-solid fa-square-minus plus-minus" id='plus' onClick={() => { contextDispatch({ type: "DECRIMENT_FROM_CART", payload: product }) }}></i>
                                                                </button>

                                                                <input type="number" name="item" value={product.quantity} id="num" className='buy-quantity m-1' readOnly />

                                                                <button className='btn btn-plus-minus' disabled={product.quantity === product.inStock}>
                                                                    <i className="fa-solid fa-square-plus plus-minus" onClick={() => { contextDispatch({ type: "INCREMENT_FROM_CART", payload: product }) }} id='minus'></i>
                                                                    &nbsp; {product.quantity === product.inStock ? <span className='fw-bold text-warning bg-dark'>Out Of Stock</span> : ""}
                                                                </button>

                                                                <i className="fa-solid fa-trash plus-minus" style={{ marginLeft: "20px" }} onClick={() => { contextDispatch({ type: "DEL_FROM_CART", payload: product._id }) }} id="del" ></i>
                                                            </div>

                                                        </div>

                                                        <div className='col-sm-12 col-md-6 col-lg-1'>
                                                            <div className='d-flex justify-content-end'>
                                                                <p className='text-muted mx-2' id='sm-price'>Price:</p>
                                                                <p className='fw-bold'>{product.price}</p>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </ul>

                                            </div>

                                        )
                                    })
                                }

                            </div>

                        </div>

                        {cart.length === 0 ? "" :
                            <div className='col-sm-12 col-md-4 col-lg-4'>

                                <div className='card'>
                                    <div className='card-body bg-body '>
                                        <div className='d-flex align-items-center'>
                                            <h4>Subtotal<span> ({cart.reduce((acc, item) => acc + (item.quantity), 0)} item)</span></h4>
                                            &ensp;
                                            <span className='fs-4 fw-bold mb-1'>$:{subTotal}</span>
                                        </div>
                                        <hr />
                                        <div>
                                            {userInfo && userInfo.user ? (
                                                <NavLink to="/shipping">
                                                    <button className='checkout-btn'>Check Out</button>
                                                </NavLink>
                                            ) : (
                                                <NavLink to="/SignIn?redirect=/shipping">
                                                    <button className='checkout-btn'>Check Out</button>
                                                </NavLink>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default CartPage;






