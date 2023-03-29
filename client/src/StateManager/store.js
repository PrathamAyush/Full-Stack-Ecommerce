import React, { createContext, useReducer } from "react";

export const Store = createContext();


const initialState = {
    userInfo: JSON.parse(localStorage.getItem("userToken")) || null,
    cart: JSON.parse(localStorage.getItem("myCart")) || [],

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
        case "USER_LOGOUT": {
            return { ...state, userInfo: null }
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