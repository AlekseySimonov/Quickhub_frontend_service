import { createSlice } from "@reduxjs/toolkit"
import { createApi } from "@reduxjs/toolkit/query/react";
import {apiBaseQuery} from "../../../shared/config";
import { URLS } from "../../../shared/api";

const initialState ={
    companiesList: undefined,
    companyID: localStorage.getItem('currentCompanyID') || sessionStorage.getItem('currentCompanyID') || null,
    companyTitle: null,
    companyDescription: null,
    companyUsers: [],
    status: '',
    error: null,
}

export const companyApiSlice = createApi({
    reducerPath: 'companyApi',
    baseQuery: apiBaseQuery(),
    tagTypes: ['Companies'],
    endpoints: (builder) => ({
        getCompanies: builder.query({
            query: () => ({
                url: `${URLS.COMPANIES}`,
                method: 'get'
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({id}) => ({type: 'Companies', id})),
                    {type: 'Companies', id: 'LIST'},
                ]
                : [{type: 'Companies', id: 'LIST'}],
        }),
        postCompany: builder.mutation({
            query: ({body}) => ({
                url: `${URLS.COMPANIES}`,
                method: 'post',
                data: body,
            }),
            invalidatesTags: [{type: 'Companies', id: 'LIST'}]
        }),
        patchCompany: builder.mutation({
            query: ({id, body}) => ({
                url: `${URLS.COMPANIES}${id}`,
                method: 'patch',
                data: body,
            }),
            invalidatesTags: [{type: 'Companies', id: 'LIST'}]
        }),
        deleteCompany: builder.mutation({
            query: (id) => ({
                url: `${URLS.COMPANIES}${id}/`,
                method: 'delete',
            }),
            invalidatesTags: [{type: 'Companies', id: 'LIST'}]
        }),
        getUsersCompany: builder.query({
            query: (companyPk) => ({ 
                url: `${URLS.COMPANY_USERS}${companyPk}/`, 
                method: 'get' 
            }),
        }),
    })
})
export const {
    useGetUsersCompanyQuery, 
    useGetCompaniesQuery, 
    usePostCompanyMutation,
    usePatchCompanyMutation,
    useDeleteCompanyMutation,
    } = companyApiSlice

export const departmentsApiSlice = createApi({
    reducerPath: 'departments',
    baseQuery: apiBaseQuery(),
    tagTypes: ['Departments'],
    endpoints: (builder) => ({
        getDepartments: builder.query({
            query: (companyPk) => ({ 
                url: URLS.DEPARTMENTS.replace('{company_pk}', companyPk), 
                method: 'get' 
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({id}) => ({type: 'Departments', id})),
                    {type: 'Departments', id: 'LIST'},
                ]
                : [{type: 'Departments', id: 'LIST'}],
        }),
        getDepartment: builder.query({
            query: ({ companyPk, id }) => ({
                url: `${URLS.DEPARTMENTS.replace('{company_pk}', companyPk)}${id}/`,
                method: 'get',
            }),
            providesTags: (result, args) => 
                result && args?.id ? [{ type: 'Departments', id: args.id }] : [],
        }),
        postDepartment: builder.mutation({
            query: ({companyPk, body}) => ({
                url:`${URLS.DEPARTMENTS.replace('{company_pk}', companyPk)}`,
                method: 'POST',
                data: body,
            }), 
            invalidatesTags: [{type: 'Departments', id: 'LIST'}]
        }),

        patchDepartment: builder.mutation({
            query: ({companyPk, id, body}) => ({
                url:`${URLS.DEPARTMENTS.replace('{company_pk}', companyPk)}${id}/`,
                method: 'patch',
                data:body,
            }),
            invalidatesTags: [{type: 'Departments', id: 'LIST'}]
        }),

        deleteDepartment: builder.mutation({
            query: ({companyPk, id}) => ({
                url:`${URLS.DEPARTMENTS.replace('{company_pk}', companyPk)}/${id}/`,
                method: 'delete',
            }), 
            invalidatesTags: [{type: 'Departments', id: 'LIST'}]
        })
    })
})
export const {
    useGetDepartmentQuery,
    useGetDepartmentsQuery, 
    useDeleteDepartmentMutation,
    usePostDepartmentMutation, 
    usePatchDepartmentMutation,
} = departmentsApiSlice

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanyID(state) {
            const currentCompanyID = localStorage.getItem('currentCompanyID');

            if (Array.isArray(state.companiesList) && state.companiesList.length > 0) {
                const currentCompany = state.companiesList.find(company => company.id === Number(currentCompanyID));

                if (currentCompany) {
                    state.companyID = currentCompany.id;
                    state.companyTitle = currentCompany.title;
                } else {
                    state.companyTitle = state.companiesList[0].title;
                    state.companyID = state.companiesList[0].id;
                }
            } else {
                state.companyTitle = null;
                state.companyID = null;
            }
        },
        checkCompanyID(state) {
            if (Array.isArray(state.companiesList)) {
                const exists = state.companiesList.some(company => company.id === state.companyID);
                if (!exists && state.companiesList.length > 0) {
                    state.companyID = state.companiesList[0].id;
                    state.companyTitle = state.companiesList[0].title;
                }
            }
        },
        changeCompany(state, action) {
            state.companyTitle = action.payload.title
            state.companyID = action.payload.id
        },
    },
    extraReducers: (builder) => {
        builder

            .addMatcher(
                companyApiSlice.endpoints.getCompanies.matchFulfilled,
                (state, action) => {
                    if(action.payload.length !== 0){
                        state.companiesList = action.payload;
                    } else{
                        state.companiesList = undefined;
                        state.companyID = undefined;
                    }
                }
            )

            .addMatcher(
                companyApiSlice.endpoints.postCompany.matchFulfilled, 
                (state, action) => {
                    state.companyID = action.payload.id
                }
            )

            .addMatcher(
                companyApiSlice.endpoints.getUsersCompany.matchFulfilled,
                (state, action) => {
                    state.companyUsers = action.payload
                }
            )
        }
    })

export const { setCompanyID, checkCompanyID, changeCompany } = companySlice.actions
export default companySlice.reducer