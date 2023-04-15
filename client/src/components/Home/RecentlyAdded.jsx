import React, { useEffect, useReducer } from 'react'
import "./RecentlyAdded.css"
import logger from 'use-reducer-logger';
import ErrorMsg from '../ErrorStatus/ErrorMsg';
import LoaderBox from '../Loading/LoaderBox';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ErrorResp from '../ErrorStatus/ErrorResp';



//Reducer Function To Fatching Data from backend
const reducerForDeal = (state, action) => {
    switch (action.type) {
        case "REQUEST_DATA": {
            return { ...state, loading: true };
        }
        case "REQUEAT_DONE": {
            const flipDealProducts = action.payload.filter(product => product.flipDeal === true);
            return { ...state, dealProduct: flipDealProducts, loading: false };
        }
        case "ERROR_REQUEST": {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state;
        }
    }
};

const RecentlyAdded = () => {

    const [{ loading, error, dealProduct }, dispatch] = useReducer(logger(reducerForDeal), {
        dealProduct: [],
        loading: true,
        error: ""
    });

    useEffect(() => {
        console.log("Mounted");
        const flipDealProduct = async () => {
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
        flipDealProduct();
        console.log("Unmounted")
    }, [])


    return (

        <>
            <div style={{ textAlign: "center", fontWeight: "bolder" }} className="pt-2">
                <h4>Flip The Deal!</h4>
            </div>

            {
                loading ? (
                    // <div className="text-center">Loading...</div>
                    <LoaderBox />
                ) : error ? (
                    <ErrorMsg className="alert alert-warning text-center" role="alert">
                        {error}
                    </ErrorMsg>
                ) : (

                    dealProduct.slice(0, 4).map((product) => {
                        return (
                            < div className="container-new-arrive pt-3" key={product._id}>
                                <div className="flip-card">
                                    <div className="flip-card-in">
                                        <div className="flip-card-front">
                                            <img src={product.img} alt="" width={"60%"} height={"230px"} />
                                        </div>
                                        <div className="flip-card-back">
                                            <img src={product.img} alt="" />
                                            <h5>{product.title}</h5>
                                            <h1>{product.price}$</h1>


                                            <NavLink to={`/product/${product._id}`}>
                                                <button className="btn btn-primary" style={{ margin: "6px" }}>
                                                    Buy Now</button>
                                            </NavLink>


                                        </div>
                                    </div>
                                </div>
                            </div >
                        )

                    })

                )}



            {/* <div className="flip-card">
                    <div className="flip-card-in">
                        <div className="flip-card-front">
                            <img src="https://images.frandroid.com/wp-content/uploads/2020/03/realme-6-pro-frandroid-2020.png" alt="" />
                        </div>
                        <div className="flip-card-back">
                            <img src="https://images.frandroid.com/wp-content/uploads/2020/03/realme-6-pro-frandroid-2020.png" alt="" />
                            <h5>Realme 5G</h5>
                            <h1>$150</h1>
                            <button className="btn btn-primary" style={{ margin: "6px" }}>Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="flip-card">
                    <div className="flip-card-in">
                        <div className="flip-card-front">
                            <img src="https://www.gigabyte.com/FileUpload/Global/KeyFeature/360/images/fullHd.png" alt="" />
                        </div>
                        <div className="flip-card-back">
                            <img src="https://www.gigabyte.com/FileUpload/Global/KeyFeature/360/images/fullHd.png" alt="" />
                            <h5>Gamming Laptop "GIGABYTE"</h5>
                            <h1>$200</h1>
                            <button className="btn btn-primary" style={{ margin: "6px" }}>Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="flip-card">
                    <div className="flip-card-in">
                        <div className="flip-card-front">
                            <img src="http://5.imimg.com/data5/WR/ER/MY-6047929/home-theater-system-500x500.png" alt="" />
                        </div>
                        <div className="flip-card-back">
                            <img src="http://5.imimg.com/data5/WR/ER/MY-6047929/home-theater-system-500x500.png" alt="" />
                            <h5>Music System</h5>
                            <h1>$100</h1>
                            <button className="btn btn-primary" style={{ margin: "6px" }}>Buy Now</button>
                        </div>
                    </div>
                </div> */}

        </>
    )
}

export default RecentlyAdded