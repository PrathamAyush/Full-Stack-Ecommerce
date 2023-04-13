import React, { createContext, useReducer } from "react";

export const Store = createContext();


const initialState = {
    userInfo: JSON.parse(localStorage.getItem("userToken")) || null,
    cart: JSON.parse(localStorage.getItem("myCart")) || [],
    shippingInfo: JSON.parse(localStorage.getItem("ShipAddress")) || {},
    paymentType: localStorage.getItem("paymentType") || '',
    orderDetails: JSON.parse(localStorage.getItem("orderInfo")) || ""

};

export const reducer = (state, action) => {
    switch (action.type) {

        case "ADD_TO_CART":

            // CHECK IF THE ITRM ALREADY EXISTS IN THE CART
            const existingCartItemIndex = state.cart.findIndex(
                item => item._id === action.payload._id
            );

            // IF THE ITEM EXIST UPDATE THE CART
            if (existingCartItemIndex !== -1) {
                const updatedCart = [...state.cart];
                updatedCart[existingCartItemIndex].quantity += 1;
                //localStorage.setItem("CartItems", JSON.stringify(updatedCart))
                return { ...state, cart: updatedCart };
            }


            // IF THE ITEM DOESN'T EXIST,ADD IT TO THE CART WITH QUANTITY 1
            const newCart = [...state.cart, { ...action.payload, quantity: 1 }];
            //localStorage.setItem("CartItems", JSON.stringify(newCart));
            return { ...state, cart: newCart };
        // return {
        //     ...state,
        //     cart: [...state.cart, { ...action.payload, quantity: 1 }]
        // };

        //DELETION OF PRODUCT FROM CART

        case 'DEL_FROM_CART':

            return {

                ...state,
                cart: state.cart.filter(item => item._id !== action.payload)

            };

        //DECRIMENT OF PRODUCT FROM CART

        case "DECRIMENT_FROM_CART":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item._id === action.payload._id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            };

        //INCRIMENT OF PRODUCT FROM CART

        case "INCREMENT_FROM_CART":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item._id === action.payload._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };

        case "SET_CART":
            return { ...state, cart: action.payload };

        case "CLEAR_CART":
            return { ...state, cart: [] };

        case "USER_LOGGDIN": {
            return { ...state, userInfo: action.payload }
        }
        case "USER_UPDATED": {
            const updatedUserInfo = { ...state.userInfo, user: action.payload };
            return { ...state, userInfo: updatedUserInfo };
        }
        case "STORE_SHIPPING_ADDRESS": {
            return {
                ...state, shippingInfo: action.payload
            }
        }
        case "SAVE_PAYMENT_METHOD": {
            return { ...state, paymentType: action.payload }
        }
        case "ORDER_DETAIL": {
            return { ...state, orderDetails: action.payload }
        }
        case "CLEAR_ORDER_DETAIL": {
            return { ...state, orderDetails: "" }
        }
        case "USER_LOGOUT": {
            return { ...state, userInfo: null, shippingInfo: {}, cart: [], paymentType: "", orderDetails: "" }
        }
        default:
            return state;
    }
};


export const StoreProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Store.Provider value={value}>{props.children}</Store.Provider>

}