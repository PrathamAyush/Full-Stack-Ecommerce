import axios from 'axios';
import React, { useContext, useEffect, useReducer, } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import "./productview.css"
import Rating from '../components/Rating/Rating';
import logger from 'use-reducer-logger';
import { Helmet } from 'react-helmet-async';
import LoaderBox from '../components/Loading/LoaderBox';
import ErrorMsg from '../components/ErrorStatus/ErrorMsg';
import ErrorResp from '../components/ErrorStatus/ErrorResp';
import { Store } from '../StateManager/store';

const reducerProductById = (state, action) => {
    switch (action.type) {
        case "REQUEST_DATA": {
            return { ...state, loading: true };
        }
        case "REQUEAT_DONE": {
            return { ...state, viewProduct: action.payload, loading: false };
        }
        case "ERROR_REQUEST": {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state;
        }
    }
};


const ProductView = () => {

    //const dispatch = useDispatch();
    // const reduxDispatch = useDispatch()
    //const navigate = useNavigate()
    //const cart = useSelector(state => state.cartReducer.cart);

    const [{ loading, error, viewProduct }, dispatch] = useReducer(logger(reducerProductById), {
        viewProduct: [],
        loading: true,
        error: ""
    });

    //const [viewProduct, setViewProduct] = useState([]);


    const { id } = useParams();
    useEffect(() => {
        console.log("Mounted");
        const productView = async () => {
            dispatch({ type: "REQUEST_DATA" });
            try {
                await axios.get(`http://localhost:3200/api/product/${id}`)
                    .then((res) => {
                        if (res) {
                            dispatch({ type: "REQUEAT_DONE", payload: res.data });
                        }
                    })
                    .catch((err) => dispatch({ type: "ERROR_REQUEST", payload: ErrorResp(err) }))

            } catch (error) {
                console.log(error)
            }
        }
        productView();
        console.log("Unmounted")
    }, [id])

    const { dispatch: contextDispatch } = useContext(Store);
    const handleAddToCart = () => {
        // //console.log("Adding to cart:", viewProduct);
        // //axios.get(`http://localhost:3200/api/product/${id}`)
        // // axios.post("http://localhost:3200/api/cart", , {
        // //     headers: { "token": "Bearer " + localStorage.getItem("token") }
        // // })
        // //     .then(() => {

        // //         navigate("/Cart")
        // //     })
        // //     .catch((err) => console.log(err));

        // reduxDispatch({ type: "ADD_TO_CART", payload: viewProduct })
        contextDispatch({ type: "ADD_TO_CART", payload: { ...viewProduct } })

    }
    // const handleBuyNow = () => {

    //     contextDispatch({ type: "ADD_TO_CART", payload: { ...viewProduct } })

    // }



    return (
        <>
            <div>
                <Helmet><title>{viewProduct.title}</title></Helmet>

                {loading ? (
                    <LoaderBox />
                ) : error ? (
                    <ErrorMsg className="alert alert-warning text-center" role="alert">
                        {error}
                    </ErrorMsg>
                ) : (
                    <div className='container' key={viewProduct.id}>

                        {/* Row Starts for Displaying Products in Gride System */}
                        < div className='row mt-2'>

                            {/* First Column With Proper BreakPoints */}
                            <div className='col-sm-12 col-md-6 col-lg-6'>

                                <div className='card card-inner border-0'>
                                    <img src={viewProduct.img}
                                        alt="Prodict_Image.." className='card-img-top card-pd-img' />

                                    {/* This Buttons Are Enable when View Size Is above 765px */}

                                    {
                                        viewProduct.inStock >= 1 ? (
                                            <div className='card-body card-btn-lable-1' >
                                                <button className='btn-style-1' id='btn1' onClick={handleAddToCart}  >
                                                    <NavLink to="/Cart" className="text-decoration-none text-dark">Add to Cart</NavLink>
                                                </button>

                                                <button className='btn-style-2' id='btn2' onClick={handleAddToCart} >
                                                    <NavLink to={"/SignIn?redirect=/shipping"} className="text-decoration-none text-dark">Buy Now</NavLink>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className='card-body card-btn-lable-1' >
                                                <button className='btn-style-1' id='btn1' disabled>
                                                    <NavLink to="#" className="text-decoration-none text-dark" ></NavLink>
                                                    Add to Cart
                                                </button>

                                                <button className='btn-style-2' id='btn2' disabled >
                                                    <NavLink to="#" className="text-decoration-none text-dark"></NavLink>
                                                    Buy Now
                                                </button>
                                            </div>
                                        )
                                    }
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
                                            Original Price: <span className='text-decoration-line-through'>{viewProduct.price * 2}</span>
                                        </p>
                                        <p className='card-text fs-5 fw-semibold m-0'>For You Only: {viewProduct.price}</p>
                                        <p className='card-text text-muted fst-italic m-0'>You Save 50%</p>

                                        <Rating className='card-text fs-5 fw-semibold m-0' Rating={viewProduct.rating} numofReview={viewProduct.numOfReview} />

                                        {/* Product Status */}
                                        <span className='fw-bold d-flex'>Status:
                                            {viewProduct.inStock >= 1
                                                ?
                                                <p className='in-stock'>In Stock</p>
                                                :
                                                <p className='out-of-stock'>Out of Stock</p>}
                                        </span>

                                        <p className='card-text fw-semibold fst-italic mt-4'>Product Discription:
                                            <span className='text-muted fst-normal fw-normal'>
                                                {viewProduct.disc}
                                            </span>
                                        </p>
                                    </div>



                                    {/* Responsive view This Button is Enable When View Size going below to 765px */}

                                    {viewProduct.inStock === true ? (
                                        <div className=' card-btn-lable-2'>

                                            <button className='btn-style-1' id='btn3' onClick={handleAddToCart} >
                                                <NavLink to="/Cart" className="text-decoration-none text-dark">Add to Cart</NavLink>
                                            </button>

                                            <button className='btn-style-2' id='btn4' >
                                                <NavLink to="/buyNow" className="text-decoration-none text-dark">Buy Now</NavLink>
                                            </button>
                                        </div>
                                    ) : (<div className=' card-btn-lable-2'>

                                        <button className='btn-style-1' id='btn3' disabled >
                                            <NavLink to="#" className="text-decoration-none text-dark"></NavLink>
                                            Add to Cart
                                        </button>

                                        <button className='btn-style-2' id='btn4' disabled >
                                            <NavLink to="#" className="text-decoration-none text-dark"></NavLink>
                                            Buy Now
                                        </button>
                                    </div>)}

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductView