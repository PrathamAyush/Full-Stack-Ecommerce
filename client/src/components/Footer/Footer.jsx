import React from 'react'
import "./footer.css"

const Footer = () => {

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
                                        <a href="mens" style={{ fontWeight: "bolder", color: "white", textDecoration: "none" }}>Mens</a>
                                    </li>
                                    <li><a href="/" className="foot-link">All</a></li>
                                    <li><a href="/" className="foot-link">Shirts</a></li>
                                    <li><a href="/" className="foot-link">Paints</a></li>
                                    <li><a href="/" className="foot-link">Winter Collection</a></li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a href="women" style={{ fontWeight: "bolder", color: "white", textDecoration: "none" }}>Womens</a>
                                    </li>
                                    <li><a href="/" className="foot-link">All</a></li>
                                    <li><a href="/" className="foot-link">Tops/Kurtis</a></li>
                                    <li><a href="/" className="foot-link">Skirts</a></li>
                                    <li><a href="/" className="foot-link">Winter Collection</a></li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a href="kids" style={{ fontWeight: " bolder", color: " white", textDecoration: "none" }}>Kids</a>
                                    </li>
                                    <li>All</li>
                                    <li>pants</li>
                                    <li>T-Shirt</li>
                                    <li>winter collection</li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li style={{ fontWeight: "bolder" }}>
                                        Links
                                    </li>
                                    <li><a href="/" className="foot-link">Home</a></li>
                                    <li><a href="/" className="foot-link">Login</a></li>
                                    <li><a href="/" className="foot-link">Contact</a></li>
                                    <li>About</li>
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