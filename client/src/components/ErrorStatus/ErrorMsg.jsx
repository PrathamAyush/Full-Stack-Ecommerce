import React from 'react'

const ErrorMsg = (props) => {
    return (
        <div className={props.className || "alert"}>
            {props.children}
        </div>
    )
}

export default ErrorMsg