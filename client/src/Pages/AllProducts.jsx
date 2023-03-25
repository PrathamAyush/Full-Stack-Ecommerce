import React, { useEffect, useReducer, } from 'react'
import axios from "axios"
import logger from 'use-reducer-logger'
import { Helmet } from 'react-helmet-async'
import "./product.css"
import { NavLink } from 'react-router-dom';
import Rating from '../components/Rating/Rating';

const reducerAllProducts = (state, action) => {
    switch (action.type) {
        case "REQUEST_DATA": {
            return { ...state, loading: true };
        }
        case "REQUEAT_DONE": {
            return { ...state, products: action.payload, loading: false };
        }
        case "ERROR_REQUEST": {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state;
        }
    }
};

const AllProducts = () => {

    const [{ loading, error, products }, dispatch] = useReducer(logger(reducerAllProducts), {
        products: [],
        loading: true,
        error: ""
    });


    //const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("Mounted");
        const getAllProducts = async () => {
            dispatch({ type: "REQUEST_DATA" });
            try {
                await axios.get("http://localhost:3200/api/product")
                    .then((res) => {
                        if (res) {
                            dispatch({ type: "REQUEAT_DONE", payload: res.data });
                        }
                    })
                    .catch((err) => dispatch({ type: "ERROR_REQUES", payload: err.message }))

            } catch (error) {
                console.log(error)
            }
        }
        getAllProducts();
        console.log("Unmounted")
    }, [])


    return (
        <>
            <Helmet>
                <title>All Ptoducts</title>
            </Helmet>
            <h3 className='text-style-logo'>All Products</h3>
            <div className='d-flex flex-wrap justify-content-center text-center'>

                {loading ? (<div>Loading...</div>) : error ? (<div>{error}</div>) : (
                    products.map((product) => {
                        return (
                            <div className='' key={product._id}>
                                <div className='card card-size m-3'>
                                    <img src={product.img} alt="Item pic.." className='card-img-top' style={{ height: "300px" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <span style={{ fontWeight: "bolder" }}>{product.price}</span>
                                        <p className="card-text">{product.disc}</p>
                                        <Rating className="card-text" Rating={product.rating} numofReview={product.numOfReview} />
                                    </div>
                                    <NavLink to={`/product/${product._id}`} type="button" className="btn-cart-allProduct">
                                        View</NavLink>

                                </div>

                            </div>
                        )
                    })
                )
                }

            </div>
        </>
    )
}

export default AllProducts