import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import companyReducer from "./slices/companySlice"
import userReducer from "./slices/userSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        company: companyReducer,
    },
})

export default store;