import React, { useContext, useEffect, useReducer, } from 'react'
import { Store } from '../StateManager/store'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
import ErrorResp from '../components/ErrorStatus/ErrorResp';
import LoaderBox from "../components/Loading/LoaderBox"
import ErrorMsg from '../components/ErrorStatus/ErrorMsg';

const reducerOrderHistory = (state, action) => {
    switch (action.type) {
        case "REQUEST_DATA": {
            return { ...state, loading: true };
        }
        case "REQUEAT_DONE": {
            return { ...state, orders: action.payload, loading: false };
        }
        case "ERROR_REQUEST": {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state;
        }
    }
};

const MyOrder = () => {

    const [{ loading, error, orders }, dispatch] = useReducer(logger(reducerOrderHistory), {
        orders: [],
        loading: true,
        error: ""
    });

    const navigate = useNavigate();

    //const [detail, setDetail] = useState(false);

    const { state, } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        }

        const myOrder = () => {

            dispatch({ type: "REQUEST_DATA" });
            axios.get("http://localhost:3200/api/order/myOrder", {
                headers: { "token": "Bearer " + localStorage.getItem("token") }
            }).then((res) => {
                if (res) {
                    console.log(res)
                    dispatch({ type: "REQUEAT_DONE", payload: res.data });
                }
            })
                .catch((err) => dispatch({ type: "ERROR_REQUEST", payload: ErrorResp(err) }))
        }
        myOrder();

    }, [userInfo, navigate]);

    //const { id } = orders.map((id) => id._id)

    // const handleDetail = (e) => {
    //     e.prevantDefault();
    //     setDetail(true);
    //     axios.put(`http://localhost:3200/api/order/user/${id}`,{paymentStatus:true}, {
    //         headers: { "token": "Bearer " + localStorage.getItem("token") }
    //     }).then((res) => {
    //         if (res) {
    //             console.log(res)
    //             dispatch({ type: "REQUEAT_DONE", payload: res.data });
    //             setDetail(false);
    //         }
    //     })
    //         .catch((err) => dispatch({ type: "ERROR_REQUEST", payload: ErrorResp(err) }))
    // }



    return (
        <>
            <h3 className='text-center fw-bold'>My Order History</h3>
            <div>
                <div className='table-responsive'>
                    {loading ? (
                        <LoaderBox />
                    ) : error ? (
                        <ErrorMsg className="alert alert-warning text-center" role="alert">
                            {error}
                        </ErrorMsg>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr >
                                    <th>Order_ID</th>
                                    <th>Date</th>
                                    <th>Payment Method</th>
                                    <th>Payment Status</th>
                                    <th>Order Status</th>
                                    <th>Price</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    orders.sort((acc, product) => new Date(product.createdAt) - new Date(acc.createdAt))
                                        .map((product) => {
                                            return (
                                                <tr key={product._id}>
                                                    <td>{product._id}</td>
                                                    <td>{product.createdAt.substring(0, 10)}</td>
                                                    <td>{product.paymentMethod}</td>
                                                    <td>{product.paymentStatus === "pending" ? "Pending" : "Paid"}</td>
                                                    <td>{product.orderStatus}</td>
                                                    <td>{product.totalPrice}</td>

                                                    <td>

                                                        <NavLink to={`/myOrder/${product._id}`}>
                                                            <button className='btn btn-secondary p-1'>Details</button>

                                                        </NavLink>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                }
                            </tbody>

                        </table>
                    )}
                </div>

            </div>
        </>
    )
}

export default MyOrder