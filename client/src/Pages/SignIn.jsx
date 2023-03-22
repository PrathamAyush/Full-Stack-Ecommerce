import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import "./signin_signup.css"

const defaultInput = { email: "", password: "" }

const SignIn = () => {
    const [singIn, setSignIn] = useState(defaultInput);

    const HandleSignIn = (e) => {
        e.preventDefault();
        const { email, password } = singIn;
        setSignIn(defaultInput)
    }
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


                            <input className='mt-3' type="submit" value="SignIn" />
                        </form>
                        <p className='mt-2 text-center text-muted'>Don't Have an account?<NavLink to="/SignUp">SignUp</NavLink></p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SignIn