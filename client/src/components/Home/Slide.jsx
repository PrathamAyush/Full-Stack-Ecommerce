import React from "react";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Products } from "./Products";
const Slide = () => {



    return (
        <>
            <div>
                <h4 className="product-head">Featured Products</h4>
            </div>

            {/* Carousel works on wide screnn only when screen size is above 800px */}

            {/* Defining Carousel for showing Featured Products in Slide View */}

            <div id="carouselExampleInterval" className="carousel slide " data-bs-ride="carousel">
                <div className="carousel-inner">

                    {/* First Slide of Product in Carousel */}

                    <div className="carousel-item active">
                        <div className="container-fluid featured-product ">

                            {/* <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://i.pinimg.com/originals/56/3a/aa/563aaa96643886974ba370409df26dc2.png" className="card-img-top img-style" alt=""
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Blue Gown</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://freepngimg.com/thumb/dress/31269-2-dress-transparent.png"
                                            className="card-img-top img-style" alt="" ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Red Skirt</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://www.pngall.com/wp-content/uploads/5/Model-Man-PNG-File.png" className="card-img-top img-style" alt=""
                                        ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Denim-Jacket</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://editzstock.com/wp-content/uploads/2022/05/Kerala-wedding-men-dress-png-1-768x768.png" className="card-img-top img-style" alt=""
                                        ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Sherwani</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                            </div> */}
                            {
                                Products.map((e) => {
                                    return (
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 col-lg-3">
                                                <div className="card card-img m-2" style={{ width: "18rem" }}>
                                                    <img src={e.url} alt="" className="card-img-top img-style" />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{e.title}</h5>
                                                        <span style={{ fontWeight: "bolder" }}>{e.price}</span>
                                                        <p className="card-text">{e.discription}</p>
                                                    </div>
                                                    <a href="/" type="button" className="btn-cart">
                                                        View</a>
                                                </div>

                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>

                    {/* Second Slide of Product in Carousel */}

                    <div className="carousel-item">
                        <div className="container-fluid featured-product">

                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://cdn-magento.mykronoz.com/media/catalog/product/cache/6/thumbnail/760x/e4d92e6aceaad517e7b5c12e0dc06587/p/r/product-760x760px-zebuds_pro_black_1_1.png" className="card-img-top img-style" alt=""
                                        ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Ear Bud</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://fantech.id/media/HG26/Headset_Gaming_Terbaik.png" className="card-img-top img-style" alt=""
                                        ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">HeadPhone</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://pngimg.com/uploads/watches/watches_PNG9876.png" className="card-img-top img-style" alt=""
                                        ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Watch</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:no-product-image.jpg/v1610015491/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/225899_azihnh.png" className="card-img-top img-style" alt=""
                                        ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">NeckBand</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Third Slide Of Product in Carousel */}

                    <div className="carousel-item">
                        <div className="container-fluid featured-product">

                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://www.pngarts.com/files/3/Men-Suit-PNG-Image.png" className="card-img-top img-style" alt=""
                                        ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Men Suit</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5ab48afe-5a18-4e55-9620-2f1a3f7ce889/superrep-cycle-2-next-nature-indoor-cycling-shoes-ggp2zs.png"
                                            className="card-img-top img-style" alt="" ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Nike Fashion Shoes</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://pngimg.com/uploads/women_bag/women_bag_PNG6398.png" className="card-img-top img-style" alt=""
                                        ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Crock Leather Bag</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-3 ">
                                    <div className="card card-img" >
                                        <img src="https://d2w9m16hs9jc37.cloudfront.net/dimg/landing/man_suit3/7378.png" className="card-img-top img-style" alt=""
                                        ></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Mens Three Piece</h5>
                                            <span style={{ fontWeight: "bolder" }}>$15</span>
                                            <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit.
                                            </p>
                                        </div>
                                        <a href="/" type="button" className="btn-cart">
                                            View</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >

                {/* Previous And Next buttons of Slider/Carousel */}

                <a className="prev" role="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev" href="#slid">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="next" role="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next" href="#slid">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>

            </div >
            {/* --------------------------------------------------------------------------------------------- */}
            {/* when Screen size reduce to 800px then this div is work */}

            <div id="productCards">
                <div className="container-fluid featured-product ">

                    <div className="row">

                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://i.pinimg.com/originals/56/3a/aa/563aaa96643886974ba370409df26dc2.png" className="card-img-top img-style" alt=""
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Blue Gown</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://freepngimg.com/thumb/dress/31269-2-dress-transparent.png"
                                    className="card-img-top img-style" alt="" ></img>
                                <div className="card-body">
                                    <h5 className="card-title">Red Skirt</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://www.pngall.com/wp-content/uploads/5/Model-Man-PNG-File.png" className="card-img-top img-style" alt=""
                                ></img>
                                <div className="card-body">
                                    <h5 className="card-title">Denim-Jacket</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://editzstock.com/wp-content/uploads/2022/05/Kerala-wedding-men-dress-png-1-768x768.png" className="card-img-top img-style" alt=""
                                ></img>
                                <div className="card-body">
                                    <h5 className="card-title">Sherwani</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="container-fluid featured-product">

                    <div className="row">
                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://cdn-magento.mykronoz.com/media/catalog/product/cache/6/thumbnail/760x/e4d92e6aceaad517e7b5c12e0dc06587/p/r/product-760x760px-zebuds_pro_black_1_1.png" className="card-img-top img-style" alt=""
                                ></img>
                                <div className="card-body">
                                    <h5 className="card-title">Ear Bud</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                        elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://fantech.id/media/HG26/Headset_Gaming_Terbaik.png" className="card-img-top img-style" alt=""
                                ></img>
                                <div className="card-body">
                                    <h5 className="card-title">HeadPhone</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                        elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://pngimg.com/uploads/watches/watches_PNG9876.png" className="card-img-top img-style" alt=""
                                ></img>
                                <div className="card-body">
                                    <h5 className="card-title">Watch</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                        elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:no-product-image.jpg/v1610015491/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/225899_azihnh.png" className="card-img-top img-style" alt=""
                                ></img>
                                <div className="card-body">
                                    <h5 className="card-title">NeckBand</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                        elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="container-fluid featured-product">

                    <div className="row">
                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://www.pngarts.com/files/3/Men-Suit-PNG-Image.png" className="card-img-top img-style" alt=""
                                ></img>
                                <div className="card-body">
                                    <h5 className="card-title">Men Suit</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                        elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5ab48afe-5a18-4e55-9620-2f1a3f7ce889/superrep-cycle-2-next-nature-indoor-cycling-shoes-ggp2zs.png"
                                    className="card-img-top img-style" alt="" ></img>
                                <div className="card-body">
                                    <h5 className="card-title">Nike Fashion Shoes</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                        elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://pngimg.com/uploads/women_bag/women_bag_PNG6398.png" className="card-img-top img-style" alt=""
                                ></img>
                                <div className="card-body">
                                    <h5 className="card-title">Crock Leather Bag</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                        elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 ">
                            <div className="card card-img" >
                                <img src="https://d2w9m16hs9jc37.cloudfront.net/dimg/landing/man_suit3/7378.png" className="card-img-top img-style" alt=""
                                ></img>
                                <div className="card-body">
                                    <h5 className="card-title">Mens Three Piece</h5>
                                    <span style={{ fontWeight: "bolder" }}>$15</span>
                                    <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing
                                        elit.
                                    </p>
                                </div>
                                <a href="/" type="button" className="btn-cart">
                                    View</a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
export default Slide;