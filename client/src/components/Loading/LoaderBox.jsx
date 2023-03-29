import React from 'react'
import loadingSVG from "../../Images/LoaderSVG/editor-1.1s-47px.gif"

const LoaderBox = () => {
    return (
        <div className='d-flex justify-content-center mt-5' >
            <img style={{ height: "70px" }} src={loadingSVG} alt="Loading..." />
        </div>
    )
}

export default LoaderBox