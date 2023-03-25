import React from 'react'
import "./RecentlyAdded.css"

const RecentlyAdded = () => {
    return (

        <>
            <div style={{ textAlign: "center", fontWeight: "bolder" }} className="pt-2">
                <h4>Flip The Deal!</h4>
            </div>

            <div className="container-new-arrive pt-3">
                <div className="flip-card">
                    <div className="flip-card-in">
                        <div className="flip-card-front">
                            <img src="https://www.rogers.com/apple-images/watch/40mm-white-angle.png" alt="" />
                        </div>
                        <div className="flip-card-back">
                            <img src="https://www.rogers.com/apple-images/watch/40mm-white-angle.png" alt="" />
                            <h5>Apple Smart Roger</h5>
                            <h1>$15</h1>
                            <button className="btn btn-primary" style={{ margin: "6px" }}>Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="flip-card">
                    <div className="flip-card-in">
                        <div className="flip-card-front">
                            <img src="https://images.frandroid.com/wp-content/uploads/2020/03/realme-6-pro-frandroid-2020.png" alt="" />
                        </div>
                        <div className="flip-card-back">
                            <img src="https://images.frandroid.com/wp-content/uploads/2020/03/realme-6-pro-frandroid-2020.png" alt="" />
                            <h5>Realme 5G</h5>
                            <h1>$150</h1>
                            <button className="btn btn-primary" style={{ margin: "6px" }}>Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="flip-card">
                    <div className="flip-card-in">
                        <div className="flip-card-front">
                            <img src="https://www.gigabyte.com/FileUpload/Global/KeyFeature/360/images/fullHd.png" alt="" />
                        </div>
                        <div className="flip-card-back">
                            <img src="https://www.gigabyte.com/FileUpload/Global/KeyFeature/360/images/fullHd.png" alt="" />
                            <h5>Gamming Laptop "GIGABYTE"</h5>
                            <h1>$200</h1>
                            <button className="btn btn-primary" style={{ margin: "6px" }}>Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="flip-card">
                    <div className="flip-card-in">
                        <div className="flip-card-front">
                            <img src="http://5.imimg.com/data5/WR/ER/MY-6047929/home-theater-system-500x500.png" alt="" />
                        </div>
                        <div className="flip-card-back">
                            <img src="http://5.imimg.com/data5/WR/ER/MY-6047929/home-theater-system-500x500.png" alt="" />
                            <h5>Music System</h5>
                            <h1>$100</h1>
                            <button className="btn btn-primary" style={{ margin: "6px" }}>Buy Now</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default RecentlyAdded