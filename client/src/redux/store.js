import { legacy_createStore as createStore } from "redux";
import { combineReducer } from "./combineReducers";

export const store = createStore(
    combineReducer
)