import { combineReducers } from "redux"
import { cartReducer } from "./cartReducer"

export const combineReducer = combineReducers({ cartReducer: cartReducer });