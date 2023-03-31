import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, } from "react";
import "./header.css";
import { Store } from "../../StateManager/store";


const Header = () => {

    const navigate = useNavigate();

    // const { cart } = useSelector((state) => state.cartReducer)


    const { state, dispatch: contextDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    console.log(userInfo)
    //const users = useSelector((state) => state.userReducer.user)

    //const userInfo = JSON.parse(localStorage.getItem("user"))
    //Hook for Serch input
    const [searchKey, setSearchKey] = useState("");

    const handleLogout = () => {
        contextDispatch({ type: "USER_LOGOUT" })
        localStorage.removeItem("userToken");
        localStorage.removeItem("ShipAddress");
        localStorage.removeItem("paymentType");
        localStorage.removeItem("token");
        navigate("/");
    }


    return (
        <header className="navbar-sticky">

            {/* Top Nav Bar for Branding and informations */}

            <nav className="navbar navbar-expand-lg navbar-light "
                style={{ backgroundImage: "linear-gradient(315deg,rgba(41, 41, 212,0.8),rgb(230, 62, 90))" }}>

                <div className="container-fluid ">

                    <NavLink to="/" style={{ textDecoration: "none" }}><h3 className="b-logo font-effect-emboss">Ecommerce</h3></NavLink>

                    <form>
                        <div className="nav-sbox ">
                            <input className="input1" type="text" placeholder="style,fashion,winter,shose,casuals,etc."
                                value={searchKey} onChange={(e) => setSearchKey(e.target.value)}
                            />
                            <div>

                                <NavLink to={`/search/${searchKey}`} >
                                    <button type="submit" className="btn1" style={{ backgroundColor: "coral" }}>
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </form>

                    <div className="nav-log-cart mt-2">
                        {
                            userInfo
                                ?
                                <button className="btn2" onClick={handleLogout}>Logout</button>
                                :
                                <NavLink to="/SignIn"><button className="btn2">Login</button></NavLink>
                        }
                        <div>
                            <NavLink to="/Cart"><i className="fa-solid fa-cart-shopping fa-2x m-1" style={{ color: "whitesmoke" }}></i>
                                <span className="badge">{cart.reduce((acc, item) => acc + (item.quantity), 0)}</span>
                            </NavLink>
                        </div>
                        <div className="mt-0  ">

                            <div className="mt-0 d-flex flex-column">

                                {
                                    userInfo && userInfo.user.Admin === true
                                        ? <div className="dropdown me-1 mt-0 d-flex flex-column">
                                            <span className="mt-1 text-center">Admin</span>
                                            <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                {userInfo.user.fullName}
                                            </button>

                                            <ul className="dropdown-menu">
                                                <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="/myOrder">My Order</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="/admin">DashBoard</NavLink></li>

                                            </ul>
                                        </div>
                                        : userInfo ?

                                            <div className="dropdown me-1">
                                                <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {userInfo.user.fullName}
                                                </button>

                                                <ul className="dropdown-menu">
                                                    <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                                                    <li><NavLink className="dropdown-item" to="/myOrder">My Order</NavLink></li>

                                                </ul>
                                            </div>
                                            : <i className="fa-solid fa-user fs-3 px-2 pt-1 i-1"></i>
                                }

                                {/* <span className="i-1 m-0 p-0">
                                    {
                                        userInfo ? (
                                            <div className="dropdown me-1">
                                                <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {userInfo.user.fullName}
                                                </button>

                                                <ul className="dropdown-menu">
                                                    <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                                                    <li><NavLink className="dropdown-item" to="/myOrder">My Order</NavLink></li>

                                                </ul>
                                            </div>
                                        ) : (
                                            <i className="fa-solid fa-user fs-3 px-2 pt-1 "></i>)
                                    }
                                </span> */}
                            </div>
                        </div>
                    </div>

                </div>

                <button className="navbar-toggler nab-tuggler-btn mt-2 ms-3" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02" aria-expanded="false"
                    aria-label="Toggle navigation">

                    <span className="navbar-toggler-icon"></span>

                </button>

            </nav>

            {/* Second Nav bar for Product related NAvigation */}

            <div className="navbar navbar-expand-lg bg-light ">

                <div className="collapse navbar-collapse m-auto" id="navbarTogglerDemo02">

                    <div className="m-auto">

                        <ul className="nav">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link1" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link1" to="/Products">All Products</NavLink>
                            </li>
                            <li className="dropdown">
                                <a role="button" className="nav-link1 dropdown-toggle" data-bs-toggle="dropdown" href="/">Mens</a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink className="dropdown-items nav-link1" to="/Mans/man">All</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-items nav-link1" to="/Mans/shirt">Shirts</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-items nav-link1" to="/Mans/paint">Paints</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-items nav-link1 text-muted" style={{ cursor: "not-allowed" }} to="#" >Winter Collection</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a role="button" className="nav-link1 dropdown-toggle" data-bs-toggle="dropdown" href="/">Womans</a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink className="dropdown-items nav-link1" to="/Womans/women">All</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-items nav-link1" to="/Womans/tops">Tops/Kurtis</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-items nav-link1" to="/Womans/skirt">Skirt</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-items nav-link1 text-muted" to="#" style={{ cursor: "not-allowed" }}>Winter Collection</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link1" href="/">Kids</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link1" href="/">Contact</a>
                            </li>
                        </ul>

                    </div>

                </div>

            </div>

        </header>
    );
}
export default Header;