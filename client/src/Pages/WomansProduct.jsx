import React, { useEffect, useReducer, } from 'react'
import axios from "axios"
import { NavLink, useParams } from 'react-router-dom'
import "./product.css"
import { Helmet } from 'react-helmet-async';
import ErrorResp from '../components/ErrorStatus/ErrorResp';
import logger from 'use-reducer-logger';
import LoaderBox from '../components/Loading/LoaderBox';
import ErrorMsg from '../components/ErrorStatus/ErrorMsg';

const reducerProductByFemaleCategory = (state, action) => {
    switch (action.type) {
        case "REQUEST_DATA": {
            return { ...state, loading: true };
        }
        case "REQUEAT_DONE": {
            return { ...state, catProducts: action.payload, loading: false };
        }
        case "ERROR_REQUEST": {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state;
        }
    }
};


const WomansProduct = () => {

    const [{ loading, error, catProducts }, dispatch] = useReducer(logger(reducerProductByFemaleCategory), {
        catProducts: [],
        loading: true,
        error: ""
    });

    //const [products, setProducts] = useState([]);

    const { category } = useParams()

    useEffect(() => {

        const getProductByCat = async () => {
            dispatch({ type: "REQUEST_DATA" });
            try {
                await axios.get(`http://localhost:3200/api/product?category=${category}`)
                    .then((res) => {
                        if (res) {
                            dispatch({ type: "REQUEAT_DONE", payload: res.data });
                        }
                    })
                    .catch((err) => dispatch({ type: "ERROR_REQUEST", payload: ErrorResp(err) }));
            } catch (error) {
                console.log(error);
            }

        }
        getProductByCat()

    }, [category]);

    return (
        <>

            <Helmet>
                <title>Womans{category === "skirt" ? "Skirts" : category === "tops" ? "Tops" : "All Product"}</title>
            </Helmet>

            <h3 className='fw-bold text-center mt-3'>Womans {category === "skirt" ? "Skirts" : category === "tops" ? "Tops" : "All Product"}</h3>
            <div className='d-flex flex-wrap justify-content-center text-center'>

                {
                    loading ? (
                        <LoaderBox />
                    ) : error ? (
                        <ErrorMsg className="alert alert-warning" role="alert">
                            {error}
                        </ErrorMsg>
                    ) : (
                        catProducts.length === 0
                            ?
                            <span className='alert alert-dark' role="alert">
                                Product Not Avaliable Right Know It will be Introduce Soon
                            </span>
                            :
                            catProducts.map((product) => {
                                return (
                                    <div className='' key={product._id}>
                                        <div className='card card-size m-3' >
                                            <img src={product.img} alt="Item pic.." className='card-img-top' style={{ height: "300px" }} />
                                            <div className="card-body">
                                                <h5 className="card-title">{product.title}</h5>
                                                <span style={{ fontWeight: "bolder" }}>{product.price}</span>
                                                <p className="card-text">{product.disc}</p>
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

export default WomansProduct