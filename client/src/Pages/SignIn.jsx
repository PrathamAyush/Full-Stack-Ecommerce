import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useLocation, useNavigate, } from "react-router-dom"
import "./signin_signup.css"
import { Store } from '../StateManager/store'
import ErrorResp from '../components/ErrorStatus/ErrorResp'
import { toast } from 'react-toastify'

const defaultInput = { email: "", password: "" }

const SignIn = () => {

    //const dispatch = useDispatch()
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectUrl ? redirectUrl : "/";


    const [singIn, setSignIn] = useState(defaultInput);
    //const [data, setData] = useState({})
    const [loading, setLoading] = useState(false);

    const { state, dispatch: contextDispatch } = useContext(Store);
    const { userInfo } = state;


    const HandleSignIn = async (e) => {
        e.preventDefault();
        const { email, password } = singIn;

        setLoading(true)

        await axios.post("http://localhost:3200/api/auths/login", { email, password })
            .then((res) => {
                if (res) {

                    console.log(res.data.result);
                    contextDispatch({ type: "USER_LOGGDIN", payload: res.data.result })
                    localStorage.setItem("token", res.data.result.token)
                    // localStorage.setItem("user", JSON.stringify(res.data.result.user))
                    localStorage.setItem("userToken", JSON.stringify(res.data.result))
                    navigate(redirect || "/")
                    setLoading(false)

                }

            }).catch((error) => {
                console.error(error.messege)
                toast.error(ErrorResp(error))
                setLoading(false)
            })
        setSignIn(defaultInput)
    }


    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])

    return (
        <>
            <div className='container d-flex justify-content-center mt-3 mb-5'>
                <div className='card card-signin-signup' style={{ width: "28rem" }}>
                    <div className='card-header header-sin-sout'>
                        <h3 className="b-logo font-effect-emboss sign-head mb-0">Ecommerce</h3>
                        <h4 className='mb-0'>SignIn</h4>
                    </div>
                    <div className='card-body'>
                        <form className='d-flex flex-column' onSubmit={HandleSignIn}>

                            <label htmlFor='email' >Email</label>
                            <input className='mt-2' type="email" name='email' placeholder='email@example.com' required
                                value={singIn.email} onChange={(e) => setSignIn({ ...singIn, email: e.target.value })} />

                            <label htmlFor="password" className='mt-2'>Password</label>
                            <input className='mt-2' type="password" name='password' placeholder='password' required
                                value={singIn.password} onChange={(e) => setSignIn({ ...singIn, password: e.target.value })} />


                            {loading ? "Loading..." : <input className='mt-3' type="submit" value="SignIn" />}
                        </form>
                        <p className='mt-2 text-center text-muted'>Don't Have an account?<NavLink to={`/SignUp?redirect=${redirect}`}>SignUp</NavLink></p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SignIn