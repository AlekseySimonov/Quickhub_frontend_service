import {createSlice } from "@reduxjs/toolkit"
import { apiBaseQuery } from "../../../shared/config"
import { createApi } from "@reduxjs/toolkit/query/react";
import { URLS } from "../../../shared/api";

const initialState ={
    email: null,
    userId: null,
}

export const userApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: apiBaseQuery(),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: (id) => {
                if (!id) {
                return { url: '', method: 'get' };
            }
            return {
                url: `${URLS.PROFILE}${id}/`,
                method: 'get',
            };
            },
            providesTags: (result) => {
                if (!result) {
                    return [{ type: 'User', id: 'LIST' }];
                }

                return [
                    { type: 'User', id: result.id }, 
                    { type: 'User', id: 'LIST' },  
                ];
            },
        }),
        
    })
})
export const {
    useGetUserInfoQuery,
    } = userApiSlice

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        decodeJWT(state){
            const token = localStorage.getItem('accessToken');
            if (token) {
                const payload = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                state.userId = decodedPayload.user_id
                state.email = decodedPayload.email
            }
        }
    },
    })

export const {decodeJWT} = userSlice.actions
export default userSlice.reducer