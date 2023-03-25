//import axios from "axios";


const initialState = {
    cart: JSON.parse(localStorage.getItem("cartKey")) || [],
    isLoggedIn: false,
};

export const cartReducer = (state = initialState, action) => {
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
                return { ...state, cart: updatedCart };
            }


            // IF THE ITEM DOESN'T EXIST,ADD IT TO THE CART WITH QUANTITY 1
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }]
            };

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


        default:
            return state;
    }
};
console.log({ "cartReducer state": initialState });

// const initialState = {
//     cart: []
// }
// export const cartReducer = (state = initialState, action) => {

//     switch (action.type) {
//         case "ADD_TO_CART":
//             return {
//                 ...state,
//                 cart: [...state.cart, action.payload],
//             };
//         case 'REMOVE_FROM_CART':
//             return {
//                 ...state,
//                 cart: state.cart.filter(item => item._id !== action.payload.id)
//             };
//         case "CLEAR_CART":
//             return {
//                 ...state,
//                 cart: []
//             };

//         default:
//             return state;

//     }
// }