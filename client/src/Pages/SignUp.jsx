import React, { useState } from 'react'
import axios from 'axios';
// import { NavLink } from "react-router-dom"
import "./signin_signup.css"

const defaultSignUp = { firstName: "", lastName: "", phone: "", email: "", password: "" };

const SignUp = () => {
    const [signUp, setSignUp] = useState(defaultSignUp);

    const HandleSignUp = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = signUp;



        setSignUp(defaultSignUp)
    }
    return (
        <>
            <div>
                <div className='container d-flex justify-content-center mt-3 mb-5'>
                    <div className='card card-signin-signup' style={{ width: "28rem" }}>
                        <div className='card-header header-sin-sout'>
                            <h3 className="b-logo font-effect-emboss sign-head mb-0">Ecommerce</h3>
                            <h4 className='mb-0'>SignUp</h4>
                        </div>
                        <div className='card-body'>
                            <form className='d-flex flex-column' onSubmit={HandleSignUp}>

                                <label className='mt-1' htmlFor='firstName' >First Name</label>
                                <input type="text" name='firstName' placeholder='eg:Jhon' required
                                    value={signUp.firstName} onChange={(e) => setSignUp({ ...signUp, firstName: e.target.value })} />

                                <label className='mt-2' htmlFor='lastName' >Last Name</label>
                                <input type="text" name='lastName' placeholder='eg:Doe' required
                                    value={signUp.lastName} onChange={(e) => setSignUp({ ...signUp, lastName: e.target.value })} />

                                <label className='mt-2' htmlFor='phone' >Phone</label>
                                <input type="phone" name='phone' placeholder='eg:91xxxxxx00' required
                                    maxLength={10}
                                    value={signUp.phone} onChange={(e) => setSignUp({ ...signUp, phone: e.target.value })} />

                                <label className='mt-2' htmlFor='email' >Email</label>
                                <input type="email" name='email' placeholder='email@example.com' required
                                    value={signUp.email} onChange={(e) => setSignUp({ ...signUp, email: e.target.value })} />

                                <label className='mt-2' htmlFor="password">Password</label>
                                <input type="password" name='password' placeholder='password' required
                                    value={signUp.password} onChange={(e) => setSignUp({ ...signUp, password: e.target.value })} />

                                <input className='mt-3' type="submit" value="SignUp" />
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SignUp