import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import companyReducer from "./slices/companySlice"
import userReducer from "./slices/userSlice"
import { projectsApiSlice } from "./slices/projectsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        company: companyReducer,
        [projectsApiSlice.reducerPath]: projectsApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(projectsApiSlice.middleware),
})

export default store;