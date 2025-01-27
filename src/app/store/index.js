import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import companyReducer, { companyApiSlice, departmentsApiSlice } from "./slices/companySlice"
import userReducer, { userApiSlice } from "./slices/userSlice"
import { projectsApiSlice } from "./slices/projectsSlice";
import { tasksApiSlice } from "./slices/tasksSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        company: companyReducer,
        [projectsApiSlice.reducerPath]: projectsApiSlice.reducer,
        [companyApiSlice.reducerPath]: companyApiSlice.reducer,
        [departmentsApiSlice.reducerPath]: departmentsApiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [tasksApiSlice.reducerPath]: tasksApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(projectsApiSlice.middleware)
            .concat(companyApiSlice.middleware)
            .concat(departmentsApiSlice.middleware)
            .concat(userApiSlice.middleware)
            .concat(tasksApiSlice.middleware)
})

export default store;