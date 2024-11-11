import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as authService from "../../../shared/api/authService"

const initialState ={
    isAuth: localStorage.getItem('isAuth') || sessionStorage.getItem('isAuth') || 'false' ,
    status: 'loading',
    error: null,
    remember: false,
}


export const loginAPI = createAsyncThunk(
    'auth/loginAPI',
    async ({ email, password, remember}, { rejectWithValue }) => {
        try {
            await authService.login(email, password)
            const storage = remember ? localStorage : sessionStorage
            storage.setItem('isAuth', true)
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
            return response
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
            const response = await authService.refreshToken()
            sessionStorage.removeItem('isAuth')
            localStorage.removeItem('isAuth')
            return (response.data)
        } catch (err) {
            return rejectWithValue(err.error)
        }
    }
)

export const refreshTokenAPI = createAsyncThunk(  
    'auth/refreshTokenAPI',  
    async (_, { rejectWithValue }) => {  
        try {  
            await authService.refreshToken();  
        } catch (err) {  
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
                state.status = 'loading'
                state.error = null
            })
            .addCase(loginAPI.fulfilled, (state) => {
                state.status = 'succeeded'
                state.isAuth = 'true'
                state.error = null
            })
            .addCase(loginAPI.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })


            .addCase(registerAPI.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(registerAPI.fulfilled, (state) => {
                state.status = 'succeeded'
                state.error = null
            })
            .addCase(registerAPI.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload 
            })


            .addCase(logoutAPI.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(logoutAPI.fulfilled, (state) => {
                state.status = 'succeeded'
                state.isAuth = 'false'
                state.error = null
            })
            .addCase(logoutAPI.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload || null
            })


            .addCase(refreshTokenAPI.pending, (state) => {  
                state.status = 'loading'
                state.loading = true  
                state.error = null
            })  
            .addCase(refreshTokenAPI.fulfilled, (state) => {  
                state.isAuth = true
                state.status = 'succeeded'
                state.error = null
            })  
            .addCase(refreshTokenAPI.rejected, (state, action) => {  
                state.isAuth = false
                state.status = 'failed'
                state.error = action.payload
            })
        }
    })

export const {removeAuth} = authSlice.actions

export default authSlice.reducer