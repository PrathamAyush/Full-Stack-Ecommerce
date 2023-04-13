import React, { useEffect, useReducer, } from "react";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import axios from "axios";
import logger from "use-reducer-logger"
import { NavLink } from "react-router-dom";
import LoaderBox from "../Loading/LoaderBox";
import ErrorMsg from "../ErrorStatus/ErrorMsg";
import ErrorResp from "../ErrorStatus/ErrorResp";
//import { Products } from "./Products";

//Reducer Function To Fatching Data from backend
const reducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_DATA": {
            return { ...state, loading: true };
        }
        case "REQUEAT_DONE": {
            const featuredProducts = action.payload.filter(product => product.feturedProduct === true);
            return { ...state, product: featuredProducts, loading: false };
        }
        case "ERROR_REQUEST": {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state;
        }
    }
};

const FeaturedProductSlider = () => {

    const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
        product: [],
        loading: true,
        error: ""
    });
    console.log(product)
    //const [product, setProduct] = useState([]);

    useEffect(() => {
        console.log("Mounted");
        const featuredProduct = async () => {
            dispatch({ type: "REQUEST_DATA" });
            try {
                await axios.get("http://localhost:3200/api/product")
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
        featuredProduct();
        console.log("Unmounted")
    }, [])



    var settings = {
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear",


    };

    return (
        <>
            <div>
                <h4 className="product-head">Featured Products</h4>
            </div>

            <div id="carouselExampleInterval">

                <div className="container" >
                    <div className="mb-5" >
                        <Slider {...settings}>
                            {
                                loading ? (
                                    // <div className="text-center">Loading...</div>
                                    <LoaderBox />
                                ) : error ? (
                                    <ErrorMsg className="alert alert-warning text-center" role="alert">
                                        {error}
                                    </ErrorMsg>
                                ) : (

                                    product.slice(0, 9).map((e) => {
                                        return (
                                            <div className="featured-product" key={e._id}>
                                                <div className="card pd-card-img m-5" >
                                                    <img src={e.img} alt="" className="card-img-top img-style" />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{e.title}</h5>
                                                        <span style={{ fontWeight: "bolder" }}>{e.price}</span>
                                                        {/* <p className="card-text">{e.disc}</p> */}
                                                    </div>
                                                    <NavLink to={`/product/${e._id}`} type="button" className="btn-cart">
                                                        View</NavLink>
                                                </div>
                                            </div>
                                        )
                                    })
                                )

                            }
                        </Slider>
                    </div>
                </div>
            </div>

            {/* --------------------------------------------------------------------------------------------- */}
            {/* when Screen size reduce to 800px then this div is work */}

            <div id="productCards">
                <div className=" ">
                    {
                        product.map((e) => {
                            return (
                                <div className="featured-product " key={e._id}>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 col-lg-3">
                                            <div className="card pd-card-img m-2" style={{ width: "18rem" }}>
                                                <img src={e.img} alt="" className="card-img-top img-style" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{e.title}</h5>
                                                    <span style={{ fontWeight: "bolder" }}>{e.price}</span>
                                                    {/* <p className="card-text">{e.disc}</p> */}
                                                </div>
                                                <NavLink to={`/product/${e.id}`} type="button" className="btn-cart">
                                                    View</NavLink>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        </>
    )
}
export default FeaturedProductSlider;