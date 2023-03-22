import React, { useEffect, useState } from "react";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import axios from "axios";
import { NavLink } from "react-router-dom";
//import { Products } from "./Products";


const FeaturedProductSlider = () => {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const featuredProduct = () => {
            axios.get("http://localhost:3200/api/product")
                .then((res) => setProduct(res.data)).catch((err) => console.log(err))
        }
        featuredProduct();
    }, [])



    var settings = {
        dots: true,
        infinite: true,
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
                                product.slice(0, 9).map((e) => {
                                    return (
                                        <div className="featured-product" key={e._id}>
                                            <div className="card pd-card-img m-5" >
                                                <img src={e.img} alt="" className="card-img-top img-style" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{e.title}</h5>
                                                    <span style={{ fontWeight: "bolder" }}>{e.price}</span>
                                                    <p className="card-text">{e.disc}</p>
                                                </div>
                                                <NavLink to={`/product/${e._id}`} type="button" className="btn-cart">
                                                    View</NavLink>
                                            </div>
                                        </div>
                                    )
                                })

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
                                <div className="featured-product ">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 col-lg-3">
                                            <div className="card pd-card-img m-2" style={{ width: "18rem" }}>
                                                <img src={e.img} alt="" className="card-img-top img-style" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{e.title}</h5>
                                                    <span style={{ fontWeight: "bolder" }}>{e.price}</span>
                                                    <p className="card-text">{e.disc}</p>
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