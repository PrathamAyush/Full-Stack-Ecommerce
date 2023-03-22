import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./product.css"
import { NavLink } from 'react-router-dom';

const AllProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const getAllProduct = () => {
            axios.get("http://localhost:3200/api/product")
                .then((res) => setProducts(res.data)).catch((err) => { console.log(err) })
        }
        getAllProduct()
    }, [])


    return (
        <>
            <h3 className='text-style-logo'>Ecommerce</h3>
            <div className='d-flex flex-wrap justify-content-center text-center'>

                {
                    products.map((product) => {
                        return (
                            <div className='' key={product._id}>
                                <div className='card card-size m-3'>
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
                }

            </div>
        </>
    )
}

export default AllProducts