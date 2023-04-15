import React, { useContext, } from 'react'
import { Helmet } from 'react-helmet-async'
import { Store } from '../StateManager/store';
import { NavLink } from 'react-router-dom';


const Admin = () => {

    const { state } = useContext(Store);
    const { userInfo } = state;

    return (
        <>
            <div>
                <Helmet><title>ADMIN PANAL</title></Helmet>
                <div className='text-center'>
                    <h4>Welcome To The Admin Panal</h4>
                    <h5>{userInfo.user.fullName}</h5>
                </div>

                <div className='row mt-4'>
                    <div className='col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center '>
                        <NavLink to={"/admin/productCreate"}>
                            <button className='btn btn-secondary mx-2' style={{ width: "10rem" }}>Create Product</button>
                        </NavLink>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center'>
                        <NavLink to={"/admin/allorder"}>
                            <button className='btn btn-secondary mx-2' style={{ width: "10rem" }}>Manage Orders</button>
                        </NavLink>
                    </div>

                    <div className='col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center'>
                        <NavLink to={"/admin/users"}>
                            <button className='btn btn-secondary mx-2' style={{ width: "10rem" }}>Users Details</button>
                        </NavLink>
                    </div>

                    <div className='col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center'>
                        <NavLink to={"/admin/manageProduct"}>
                            <button className='btn btn-secondary mx-2' style={{ width: "10rem" }}>Manage Products</button>
                        </NavLink>
                    </div>



                </div>
            </div >
        </>
    )
}

export default Admin