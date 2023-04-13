import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';


const defaultProduct = { title: "", img: "", disc: "", price: "", category: [], inStock: 0, rating: 0, numOfReview: 0, feturedProduct: false, flipDeal: false }

const CreateProduct = () => {

    const [crtProd, setCrtProd] = useState(defaultProduct);

    const handleCrtProd = (e) => {

        e.preventDefault();
        const { title, disc, img, category, price, inStock, rating, numOfReview, feturedProduct, flipDeal } = crtProd;
        // const img = crtProd.img
        //creating imgFile URL to Store Image data In DATABASE
        // const file = crtProd.img;
        // const imageUrl = URL.createObjectURL(file);

        // Create a new FormData instance
        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('disc', disc);
        // formData.append('category', category);
        // formData.append('price', price);
        // formData.append('inStock', inStock);
        // formData.append('rating', rating);
        // formData.append('numOfReview', numOfReview);
        // formData.append('feturedProduct', feturedProduct);
        // formData.append('flipDeal', flipDeal);
        // formData.append('img', img);

        // console.log(uplodData.get('img'));


        axios.post("http://localhost:3200/api/product/",
            {
                title, img, disc, category, price, inStock, rating, numOfReview, feturedProduct, flipDeal
            },

            {
                headers: {
                    "token": "Bearer " + localStorage.getItem("token")
                }
            }
        ).then((res) => {
            if (res.status === 201) {
                console.log(res)
                toast.success(res.status + "Product Created")

            }
        }).catch((err) => {
            console.log(err);
            console.log(img)
            toast.error(err.message)
        })

    }


    return (
        <>
            <div className='d-flex justify-content-center'>
                <form action="" onSubmit={handleCrtProd}>
                    <div className="mb-3">
                        <label htmlFor='input1' className="form-label">Product title</label>
                        <input type="text" className="form-control" id="input1" placeholder="Product Title" required
                            value={crtProd.title} onChange={(e) => setCrtProd({ ...crtProd, title: e.target.value })} />

                        <label htmlFor='input2' className="form-label">Product Image</label>
                        <input type="text" className="form-control" id="input2" placeholder="Product Image" required
                            value={crtProd.img} onChange={(e) => setCrtProd({ ...crtProd, img: e.target.value })} />

                        <label htmlFor='input3' className="form-label">Product Discription</label>
                        <input type="text" className="form-control" id="input3" placeholder="Product discription" required
                            value={crtProd.disc} onChange={(e) => setCrtProd({ ...crtProd, disc: e.target.value })} />

                        <div className='mt-2'>

                            <label htmlFor='input4' className="form-label mx-2">Product Category 1</label>
                            <select placeholder='Category 1' required
                                defaultValue={crtProd.category[0] || ''} onChange={(e) => setCrtProd({ ...crtProd, category: [e.target.value, crtProd.category[1]] })} >
                                <option disabled value=''>Category 1</option>
                                <option value="man">Man</option>
                                <option value="woman">Woman</option>
                                <option value="kids">Kids</option>
                            </select>

                            <label htmlFor='input5' className="form-label mx-2">Product Category 2</label>
                            <select placeholder='Category 2' required
                                defaultValue={crtProd.category[1] || ''} onChange={(e) => setCrtProd({ ...crtProd, category: [crtProd.category[0], e.target.value] })}  >
                                <option disabled value=''>Category 2</option>
                                <option value="shirt">Shirt</option>
                                <option value="paint">Paint</option>
                                <option value="casual">Casual</option>
                                <option value="skirt">Skirt</option>
                                <option value="tops">Tops</option>
                                <option value="kurti">Kurti</option>
                            </select>

                        </div>

                        <label htmlFor='input6' className="form-label">Product Price</label>
                        <input type="text" className="form-control" id="input5" placeholder="Product Price" required
                            value={crtProd.price} onChange={(e) => setCrtProd({ ...crtProd, price: e.target.value })} />

                        <label htmlFor='input7' className="form-label">Product Stock</label>
                        <input type="number" className="form-control" id="input6" placeholder="Product Stock" required
                            value={crtProd.inStock} onChange={(e) => setCrtProd({ ...crtProd, inStock: e.target.value })} />

                        <label htmlFor='input8' className="form-label">Product Rating</label>
                        <input type="number" className="form-control" id="input7" placeholder="Product Rating"
                            value={crtProd.rating} onChange={(e) => setCrtProd({ ...crtProd, rating: e.target.value })} />

                        <label htmlFor='input9' className="form-label">Product No.Of Review</label>
                        <input type="number" className="form-control" id="input8" placeholder="Num of Review"
                            value={crtProd.numOfReview} onChange={(e) => setCrtProd({ ...crtProd, numOfReview: e.target.value })} />

                        <div className=' mt-2'>
                            <label className="form-label mx-2" htmlFor="flexCheckIndeterminate1">Featured Product</label>
                            <input className="form-check-input" type="checkbox" id="flexCheckIndeterminate1"
                                value={crtProd.feturedProduct} onChange={(e) => setCrtProd({ ...crtProd, feturedProduct: !crtProd.feturedProduct })} />

                            <label className="form-label mx-2" htmlFor="flexCheckIndeterminate2">Deal Product</label>
                            <input className="form-check-input" type="checkbox" id="flexCheckIndeterminate2"
                                value={crtProd.flipDeal} onChange={(e) => setCrtProd({ ...crtProd, flipDeal: !crtProd.flipDeal })} />
                        </div>

                    </div>
                    <button className='btn btn-secondary mb-2' type='submit'>Create</button>
                </form >

            </div >
        </>
    )
}

export default CreateProduct