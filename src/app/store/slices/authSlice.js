import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authService } from "../../../shared/api";

const initialState ={
    isAuth: window.localStorage.getItem('isAuth') || 'false' ,
    status: null,
    error: null
}

export const loginAPI = createAsyncThunk(
    'auth/loginAPI',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await authService.login(email, password)
            localStorage.setItem('isAuth', true)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
        } catch (err) {
            console.log(err.response.data)
            return rejectWithValue(err.message)
        }
    }
)

export const registerAPI = createAsyncThunk(
    'auth/registerAPI',
    async ({ first_name,  last_name, email, password,password2 }, { rejectWithValue }) => {
        try {
            const response = await authService.register(first_name,  last_name, email, password,password2)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            return (response.data)
        } catch (err) {
            console.log(err.response.data)
            return rejectWithValue(err.message)
        }
    }
)

export const logoutAPI = createAsyncThunk(
    'auth/logoutAPI',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authService.logout(localStorage.getItem('refreshToken'))
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('isAuth')
            return (response.data)
        } catch (err) {
            console.log(err.response.data)
            return rejectWithValue(err.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAPI.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginAPI.fulfilled, (state) => {
                state.status = 'succeeded';
                state.isAuth = 'true';
                state.error = null;
            })
            .addCase(loginAPI.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; 
            })


            .addCase(registerAPI.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerAPI.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(registerAPI.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; 
            })


            .addCase(logoutAPI.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logoutAPI.fulfilled, (state) => {
                state.status = 'succeeded';
                state.isAuth = 'false';
                state.error = null;
            })
            .addCase(logoutAPI.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; 
            })
        }
    })

export const {removeAuth} = authSlice.actions

export default authSlice.reducer