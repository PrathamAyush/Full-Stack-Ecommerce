import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const SearchProduct = () => {
    const { key } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3200/api/product/search/${key}`)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [key]);

    return (
        <div>
            <h2>Search Results for "{key}"</h2>
            {/* <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.title}</h3>
                        <p>{product.disc}</p>
                    </li>
                ))}
            </ul> */}

            <div className='d-flex flex-wrap justify-content-center text-center'>

                {
                    products.map((product) => {
                        return (
                            <div className=''>
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

        </div>
    );
};

export default SearchProduct;