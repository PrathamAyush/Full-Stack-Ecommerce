import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../../StateManager/store';
const ProtectedRoute = () => {
    //const userInfo = localStorage.getItem("userToken");
    const { state, } = useContext(Store);
    const { userInfo } = state;

    console.log(userInfo)

    useEffect(() => {
        if (userInfo && userInfo.user.Admin !== true) {
            toast.error("You are not authorized to access this page!");
        }
    }, [userInfo]);

    return userInfo && userInfo.user.Admin === true ? <Outlet /> : <Navigate to="/SignIn" />;
};

// return (
//     userInfo && userInfo.user.Admin === true ? (<Outlet />) : (<Navigate to="/SignIn" />)

// );



export default ProtectedRoute