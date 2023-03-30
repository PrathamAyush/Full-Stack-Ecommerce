const initialState = {
    user: localStorage.getItem("user") || {},
    token: localStorage.getItem("token") || null
}



export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            }
        case "LOGIN_ERROR":
            return initialState;
        default:
            return state;
    }
}
const dummyAction = { type: "DUMMY_ACTION" };
const state = userReducer(initialState, dummyAction);
console.log({ "userReducer state": state });
