import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authService } from "../../../shared/api";

const initialState ={
    isAuth: true,
    email: null,
    token: null,
    id: null,
    status: null,
    error: null
}

export const loginAPI = createAsyncThunk(
    'user/loginAPI',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await authService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            return { email, token: response.data.accessToken }
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeUser(state) {
            state.isAuth = false;
            state.email = null;
            state.token = null;
            state.id = null;
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAPI.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginAPI.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginAPI.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; 
            })
        }
    })

export const { removeUser} = userSlice.actions

export default userSlice.reducer