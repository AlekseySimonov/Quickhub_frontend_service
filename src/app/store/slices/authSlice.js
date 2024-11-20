import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {authService}from "../../../shared/api/index"

const initialState ={
    status: null,
    error: null,
    remember: localStorage.getItem('remember') || sessionStorage.getItem('remember') || 'false' ,
}

export const loginAPI = createAsyncThunk(
    'auth/loginAPI',
    async ({ email, password, remember}, { rejectWithValue }) => {
        try {
            const response = await authService.login(email, password)
            localStorage.setItem('remember', String(remember))
            const storage = (String(remember) === 'true') ? localStorage : sessionStorage
            storage.setItem('accessToken', response.data.access_token)
            storage.setItem('refreshToken', response.data.refresh_token)
            window.location.reload()
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
                return rejectWithValue(err.response.data.error)
        }
        return rejectWithValue(err.response.data)
    }}
)

export const logoutAPI = createAsyncThunk(
    'auth/logoutAPI',
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState().auth
            const storage = (state.remember === 'true') ? localStorage : sessionStorage
            await authService.logout( storage.getItem('refreshToken'))
            sessionStorage.removeItem('accessToken')
            localStorage.removeItem('accessToken')
            sessionStorage.removeItem('refreshToken')
            localStorage.removeItem('refreshToken')
            window.location.reload()
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const refreshTokenAPI = createAsyncThunk(
    'auth/refreshTokenAPI',
    async (_, {rejectWithValue, getState }) => {
        try {
            const state = getState().auth
            const storage = (state.remember === 'true') ? localStorage : sessionStorage
            const response = await authService.refreshToken( storage.getItem('refreshToken'))

            storage.setItem('accessToken', response.data.access)
            storage.setItem('refreshToken', response.data.refresh)
            return response
        } catch (err) {
            if (err.response.status == 401) { 
                return rejectWithValue(err.response.data)  
            }
            return rejectWithValue(err.response.data);
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
                state.error = null
            })
            .addCase(logoutAPI.rejected, (state) => {
                state.status = 'failed'
            })


            .addCase(refreshTokenAPI.pending, (state) => {  
                state.status = 'loading'
                state.loading = true  
                state.error = null
            })  
            .addCase(refreshTokenAPI.fulfilled, (state) => {  
                state.status = 'succeeded'
                state.loading = false
                state.error = null
            })  
            .addCase(refreshTokenAPI.rejected, (state) => {  
                state.status = 'failed'
                state.loading = false
                state.error = null
            })
        }
    })

export const {removeAuth} = authSlice.actions

export default authSlice.reducer