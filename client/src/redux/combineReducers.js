import { combineReducers } from "redux"
import { cartReducer } from "./cartReducer"
import { userReducer } from "./userReducer";

export const combineReducer = combineReducers({ cartReducer: cartReducer, userReducer: userReducer });