import React from 'react'
import "./rating.css"

export const Rating = (props) => {
    const { Rating, numofReview } = props
    return (
        <>
            <div className='rating' >
                <span>
                    <i className={
                        Rating >= 1
                            ? "fa-solid fa-star fa-beat"
                            : Rating >= 0.5
                                ? "fa-solid fa-star-half fa-beat"
                                :
                                "fa-regular fa-star"
                    } />
                </span>
                <span>
                    <i className={
                        Rating >= 2
                            ? "fa-solid fa-star fa-beat"
                            : Rating >= 1.5
                                ? "fa-solid fa-star-half fa-beat"
                                :
                                "fa-regular fa-star"
                    } />
                </span>
                <span>
                    <i className={
                        Rating >= 3
                            ? "fa-solid fa-star fa-beat"
                            : Rating >= 2.5
                                ? "fa-solid fa-star-half fa-beat"
                                :
                                "fa-regular fa-star"
                    } />
                </span>
                <span>
                    <i className={
                        Rating >= 4
                            ? "fa-solid fa-star fa-beat"
                            : Rating >= 3.5
                                ? "fa-solid fa-star-half fa-beat"
                                :
                                "fa-regular fa-star"
                    } />
                </span>
                <span>
                    <i className={
                        Rating >= 5
                            ? "fa-solid fa-star fa-beat"
                            : Rating >= 4.5
                                ? "fa-solid fa-star-half fa-beat"
                                :
                                "fa-regular fa-star"
                    } />
                </span>
                <br />
                <span style={{ color: "black", fontWeight: "bold" }}> {numofReview}(Reviews)</span>
            </div>
        </>
    )
}

export default Rating