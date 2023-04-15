import React, { useContext } from 'react'
import "./footer.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { Store } from '../../StateManager/store';

const Footer = () => {

    const navigate = useNavigate()

    const { state, dispatch: contextDispatch } = useContext(Store);
    const { userInfo } = state;

    const handleLogout = () => {
        contextDispatch({ type: "USER_LOGOUT" })
        localStorage.removeItem("userToken");
        localStorage.removeItem("ShipAddress");
        localStorage.removeItem("paymentType");
        localStorage.removeItem("token");
        navigate("/");
    }

    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer>
                <div className="div1-foot">
                    <div className="container-fluid">
                        <div className="foot-flex">
                            <div>
                                <ul>
                                    <li>
                                        <NavLink to="Mans/man" style={{ fontWeight: "bolder", color: "white", textDecoration: "none" }}>Mens</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <NavLink to="Womans/woman" style={{ fontWeight: "bolder", color: "white", textDecoration: "none" }}>Womens</NavLink>
                                    </li>

                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li><NavLink to="/" className="foot-link">Home</NavLink></li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    {userInfo
                                        ?
                                        <li>
                                            <button className="foot-link" style={{ backgroundColor: "transparent", border: "none" }} onClick={handleLogout}>Logout</button>
                                        </li>
                                        :
                                        <li>
                                            <NavLink to="/SignIn" className="foot-link">Login</NavLink>
                                        </li>
                                    }

                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <NavLink to="/contact" className="foot-link">Contact</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <NavLink to="/about" className="foot-link">About</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <hr style={{ color: "white" }}></hr>
                        <h5 className="text-center text-light pb-3"><em>All Right Reserved By The H3rmit
                            Corp. pvt. Ltd </em>
                            &copy; {currentYear}
                        </h5>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer