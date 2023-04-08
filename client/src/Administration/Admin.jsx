import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import { Store } from '../StateManager/store';
import logger from 'use-reducer-logger';
import axios from 'axios';
import ErrorResp from '../components/ErrorStatus/ErrorResp';
import { NavLink } from 'react-router-dom';
import LoaderBox from '../components/Loading/LoaderBox';
import ErrorMsg from '../components/ErrorStatus/ErrorMsg';


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

                <div className='d-flex justify-content-evenly mt-4'>
                    <NavLink to={"/admin/productCreate"}>
                        <button className='btn btn-secondary mx-2' style={{ width: "10rem" }}>Create Product</button>
                    </NavLink>

                    <NavLink to={"/admin/allorder"}>
                        <button className='btn btn-secondary mx-2' style={{ width: "10rem" }}>Manage Orders</button>
                    </NavLink>

                    <NavLink to={"/admin/users"}>
                        <button className='btn btn-secondary mx-2' style={{ width: "10rem" }}>Users Details</button>
                    </NavLink>

                    <NavLink to={"/admin/allorder"}>
                        <button className='btn btn-secondary mx-2' style={{ width: "10rem" }}>All Orders</button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Admin