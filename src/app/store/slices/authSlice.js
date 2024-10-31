import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authService } from "../../../shared/api";

const initialState ={
    isAuth: localStorage.getItem('isAuth') || localStorage.getItem('isAuth') || 'false' ,
    status: null,
    error: null
}

export const loginAPI = createAsyncThunk(
    'auth/loginAPI',
    async ({ email, password}, { rejectWithValue }) => {
        try {
            const response = await authService.login(email, password)
            // const storage = remember ? localStorage : sessionStorage
            console.log(response)



            // storage.setItem('isAuth', true)
            // storage.setItem('accessToken', response.data.access)
            // storage.setItem('refreshToken', response.data.refresh)
        } catch (err) {
            if (err.response.status === 400 || err.response.status === 401) {  
                return rejectWithValue('Неверный e-mail или пароль')
            }
            return rejectWithValue(err.response.data)
    }}
)

export const registerAPI = createAsyncThunk(
    'auth/registerAPI',
    async ({ first_name,  last_name, email, password,password2 }, { rejectWithValue }) => {
        try {
            const response = await authService.register(first_name,  last_name, email, password,password2)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
        } catch (err) {
            if (err.response.status === 400) { 
                console.log(err.response)
                return rejectWithValue(err.response.data.error)  
        }
        return rejectWithValue(err.response.data)
    }}
)

export const logoutAPI = createAsyncThunk(
    'auth/logoutAPI',
    async (_, { rejectWithValue }) => {
        try {
            console.log('1')
            const response = await authService.logout()
            console.log('2')
            sessionStorage.removeItem('accessToken')
            sessionStorage.removeItem('refreshToken')
            sessionStorage.removeItem('isAuth')
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
                state.error = action.payload || null; 
            })
        }
    })

export const {removeAuth} = authSlice.actions

export default authSlice.reducer