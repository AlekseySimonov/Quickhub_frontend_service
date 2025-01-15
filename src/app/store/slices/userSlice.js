import {createSlice } from "@reduxjs/toolkit"
import { apiBaseQuery } from "../../../shared/config"
import { createApi } from "@reduxjs/toolkit/query"
import { URLS } from "../../../shared/api";

const initialState ={
    email: 'admin@mail.ru',
    firstName: null,
    secondName: null,
}

export const userApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: apiBaseQuery(),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getCompanies: builder.query({
            query: () => ({
                url: `${URLS.COMPANIES}`,
                method: 'get'
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({id}) => ({type: 'User', id})),
                    {type: 'User', id: 'LIST'},
                ]
                : [{type: 'User', id: 'LIST'}],
        }),
        
    })
})
export const {
    useGetUsersCompanyQuery, 
    useGetCompaniesQuery, 
    usePostCompanyMutation,
    useDeleteCompanyMutation,
    } = userApiSlice

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        decodeJWT(state){
            localStorage.getItem('accessToken')
        }
    },
    })

// export const {} = userSlice.actions
export default userSlice.reducer