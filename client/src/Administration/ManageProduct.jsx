import React, { useContext, useEffect, useReducer, useState, } from 'react'
import axios from "axios"
import logger from 'use-reducer-logger'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom';
import LoaderBox from '../components/Loading/LoaderBox'
import ErrorMsg from '../components/ErrorStatus/ErrorMsg'
import ErrorResp from '../components/ErrorStatus/ErrorResp'
import { toast } from 'react-toastify';
import { Store } from '../StateManager/store';

const reducerAllProducts = (state, action) => {
    switch (action.type) {
        case "REQUEST_DATA": {
            return { ...state, loading: true };
        }
        case "REQUEAT_DONE": {
            return { ...state, MngProduct: action.payload, loading: false };
        }
        case "ERROR_REQUEST": {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state;
        }
    }
};

const ManageProduct = () => {

    const [edtProduct, setEdtProduct] = useState(false);
    const [edtProductId, setEdtProductId] = useState(null);

    //Requiring the information of productDetails from store
    const { state, dispatch: contextDispatch } = useContext(Store);
    const { productDetails } = state;
    console.log(productDetails)

    //Aquare the the same value of product data which belongs to the respected ID
    const prodDetail = productDetails.find(item => item._id === edtProductId);

    const [productData, setProductData] = useState({});

    const [{ loading, error, MngProduct }, dispatch] = useReducer(logger(reducerAllProducts), {
        MngProduct: [],
        loading: true,
        error: ""
    });

    //Getting All Product Details to Admin DashBoard
    useEffect(() => {
        console.log("Mounted");
        const getAllProducts = async () => {
            dispatch({ type: "REQUEST_DATA" });
            try {
                await axios.get("http://localhost:3200/api/product")
                    .then((res) => {
                        if (res) {
                            dispatch({ type: "REQUEAT_DONE", payload: res.data });
                            contextDispatch({ type: "PRODUCT_DETAILS", payload: res.data })
                            localStorage.setItem("prodDetail", JSON.stringify(res.data))
                        }
                    })
                    .catch((err) => dispatch({ type: "ERROR_REQUEST", payload: ErrorResp(err) }))

            } catch (error) {
                console.log(error)
            }
        }
        getAllProducts();
        console.log("Unmounted")
    }, [edtProduct, contextDispatch])

    //Handleing the Edit Or Update Request of Products
    let count = 0;

    const handleEdtProduct = (e, id) => {
        e.preventDefault();

        setEdtProductId(id);

        axios.put(`http://localhost:3200/api/product/${id}`,
            productData,
            {
                headers: { "token": "Bearer " + localStorage.getItem("token") }
            }).then((res) => {
                if (res) {
                    console.log("product Updated");
                    setEdtProduct(false);
                    toast.success("Product updated")
                }
            }).catch((err) => {
                console.log(err);
                toast.error(err.message)
            })

    }

    //handling the Delete Request of Product 

    const handleDeleteProduct = (e, id) => {
        e.preventDefault();
        setEdtProductId(id)
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`http://localhost:3200/api/product/${id}`,
                {
                    headers: { "token": "Bearer " + localStorage.getItem("token") }
                }).then((res) => {
                    if (res) {
                        console.log("product Deleted");
                        toast.success("Product Deleted")
                    }
                }).catch((err) => {
                    console.log(err);
                    toast.error(err.message)
                })
        } else {
            return
        }


    }

    //Setting the default value of product while Editing the Form
    useEffect(() => {
        if (prodDetail) {
            setProductData({
                title: prodDetail.title,
                disc: prodDetail.disc,
                inStock: prodDetail.inStock,
                feturedProduct: prodDetail.feturedProduct,
                flipDeal: prodDetail.flipDeal,
                price: prodDetail.price
            });
        }
    }, [prodDetail, edtProductId]);

    return (
        <>
            <Helmet>
                <title>Manage Ptoducts</title>
            </Helmet>
            <h3 className='fw-bold text-center mt-3'>Manage Products</h3>

            <div className='d-flex justify-content-center'>
                <NavLink to={"/admin"}>
                    <button className='btn btn-secondary'>Back</button>
                </NavLink>
            </div>

            <div className='d-flex flex-wrap justify-content-center text-center  '>
                {
                    loading ? (
                        <LoaderBox />
                    ) : error ? (
                        <ErrorMsg className="alert alert-warning" role="alert">
                            {error}
                        </ErrorMsg>
                    ) : (
                        <>
                            <div className='row table-responsive'>
                                <div className='col-12 '>
                                    <table className="table ">
                                        <thead>
                                            <tr >
                                                <th>Product No.</th>
                                                <th>Product</th>
                                                <th>Title</th>
                                                <th>Product_Discription</th>
                                                <th>Stock</th>
                                                <th>Category</th>
                                                <th>Featured</th>
                                                <th>Flip_Deal</th>
                                                <th>Price</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {MngProduct.map((product) => {
                                                count++
                                                return (
                                                    <tr key={product._id}>
                                                        <td>{count}</td>
                                                        <td><img src={product.img} alt="" width={"50%"} height={"40px"} /></td>
                                                        <td>{product.title}</td>
                                                        <td>{product.disc.slice(0, 20)}</td>
                                                        <td>{product.inStock}</td>
                                                        <td>{product.category.join(",")}</td>
                                                        <td>{product.feturedProduct === true ? "YES" : "NO"}</td>
                                                        <td>{product.flipDeal === true ? "YES" : "NO"}</td>
                                                        <td>{product.price}$</td>
                                                        <td>
                                                            <button className='btn btn-secondary'
                                                                style={{ width: "4rem", padding: "2px" }}
                                                                onClick={() => setEdtProductId(product._id, setEdtProduct(true))} >
                                                                Edit
                                                            </button>
                                                            {" "}
                                                            <button className='btn btn-secondary'
                                                                style={{ width: "4rem", padding: "2px" }}
                                                                onClick={(e) => handleDeleteProduct(e, product._id)} >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }


                                        </tbody>
                                    </table>
                                </div>
                            </div>


                        </>

                    )}
                {
                    // Edit Form when Admin try to modify the product details then onClick of Edit this form will Appear
                    edtProduct && (
                        <div className='card position-relative'>
                            <div className='card-body'>

                                <div >
                                    <form className='' onSubmit={(e) => handleEdtProduct(e, edtProductId)}>
                                        <span className='fw-bold mt-2'>{edtProductId}</span>
                                        <div className="mb-1">
                                            <label htmlFor="exampleInputTitle" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="exampleInputTitle"
                                                value={productData.title} onChange={(e) => setProductData({ ...productData, title: e.target.value })} />
                                        </div>
                                        <div className="mb-1">
                                            <label htmlFor="exampleInputDisc" className="form-label">Discription</label>
                                            <input type="text" className="form-control" id="exampleInputDisc"
                                                value={productData.disc} onChange={(e) => setProductData({ ...productData, disc: e.target.value })} />
                                        </div>
                                        <div className="mb-1">
                                            <label htmlFor="exampleInputStock" className="form-label">Stock</label>
                                            <input type="number" className="form-control" id="exampleInputStock"
                                                value={productData.inStock} onChange={(e) => setProductData({ ...productData, inStock: e.target.value })} />
                                        </div>
                                        <div className='mb-1'>
                                            <label htmlFor="exampleInputFeatured" className="form-label">Featured</label>
                                            <select defaultValue={productData.feturedProduct} id='exampleInputFeatured'
                                                onChange={(e) => setProductData({ ...productData, feturedProduct: e.target.value })} >
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                        <div className='mb-1'>
                                            <label htmlFor="exampleInputFlipDeal" className="form-label">Flip_Deal</label>
                                            <select defaultValue={productData.flipDeal} id='exampleInputFlipDeal'
                                                onChange={(e) => setProductData({ ...productData, flipDeal: e.target.value })} >
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                        <div className='mb-1'>
                                            <label htmlFor="exampleInputPrice" className="form-label">Price</label>
                                            <input type="number" className="form-control" id="exampleInputprice"
                                                value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
                                        </div>

                                        <button type="submit" className="btn btn-primary">Update</button>
                                        <button type="submit" className="btn btn-primary" onClick={() => setEdtProduct(false, setProductData(""))}>Cancel</button>
                                    </form>
                                </div>


                            </div>

                        </div>

                    )
                }
            </div>
        </>
    )
}

export default ManageProduct