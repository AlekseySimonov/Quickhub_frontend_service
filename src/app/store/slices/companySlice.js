import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {companiesService} from "../../../shared/api/index"
import { createApi } from "@reduxjs/toolkit/query/react";
import {apiBaseQuery} from "../../../shared/config";
import { URLS } from "../../../shared/api";

const initialState ={
    companiesList: undefined,
    companyID: localStorage.getItem('CompanyId') || sessionStorage.getItem('CompanyId') || null,
    companyTitle: null,
    companyDescription: null,
    companyUsers: [],
    status: '',
    error: null,
}

export const companyApiSlice = createApi({
    reducerPath: 'companyApi',
    baseQuery: apiBaseQuery(),
    endpoints: (builder) => ({
        getCompanies: builder.query({
            query: () => ({
                url: `${URLS.COMPANIES}`,
                method: 'get'
            }),
        }),
        postCompany: builder.mutation({
            query: (body) => ({
                url: `${URLS.COMPANIES}`,
                method: 'POST',
                body: body,
            }),
        }),
        getUsersCompany: builder.query({
            query: (companyPk) => ({ 
                url: `${URLS.COMPANY_USERS}/${companyPk}`, 
                method: 'get' 
            }),
        }),
    })
})
export const {
    useGetUsersCompanyQuery, 
    useGetCompaniesQuery, 
    usePostCompanyMutation,
    } = companyApiSlice

export const departmentsApiSlice = createApi({
    reducerPath: 'departments',
    baseQuery: apiBaseQuery(),
    tagTypes: ['Departments'],
    endpoints: (builder) => ({
        getDepartments: builder.query({
            query: (companyPk) => ({ 
                url: URLS.DEPARTMENTS_USERS_DATA.replace('{company_pk}', companyPk), 
                method: 'get' 
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({id}) => ({type: 'Departments', id})),
                    {type: 'Departments', id: 'LIST'},
                ]
                : [{type: 'Departments', id: 'LIST'}],
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
                url:`${URLS.DEPARTMENTS.replace('{company_pk}', companyPk)}/${id}/`,
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
    useGetDepartmentsQuery, 
    useDeleteDepartmentMutation,
    usePostDepartmentMutation, 
    usePatchDepartmentMutation,
} = departmentsApiSlice

export const postCompanyAPI = createAsyncThunk(
    'company/createCompanyAPI',
    async ({title, email}, {rejectWithValue}) => {
        try {
            const response = await companiesService.postCompany(title, email);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response)
        }
    }
)

export const deleteCompanyAPI = createAsyncThunk(
    'company/deleteCompanyAPI',
    async ({ id }, { rejectWithValue }) => {
        try {
            event.preventDefault();
            await companiesService.deleteCompany(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response || err);
        }
    }
);

export const renameCompanyAPI = createAsyncThunk(
    'company/renameCompanyAPI',
    async ({ id, title }, { rejectWithValue }) => {
        try {
            await companiesService.renameCompany(id, title);
            return { id, title };
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getCompanyUsersAPI = createAsyncThunk(
    'company/getCompanyUserAPI',
    async (_, {rejectWithValue, getState}) => {
        try {
            const state = getState().company
            const response = await companiesService.getCompanyUsers(state.companyID)
            return response.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

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

            .addCase(postCompanyAPI.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(postCompanyAPI.fulfilled, (state, action) => {
                state.status = 'succeeded'
                            if (!Array.isArray(state.companiesList)) {
                    state.companiesList = [];
                }
                state.companiesList.push(action.payload);
                state.companyID = action.payload.id
            })

            .addCase(postCompanyAPI.rejected, (state) => {
                state.status = 'failed'
            })

            .addCase(deleteCompanyAPI.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(deleteCompanyAPI.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const idToDelete = action.payload;

                if (Array.isArray(state.companiesList)) {
                    state.companiesList = state.companiesList.filter(company => company.id !== idToDelete);
                }

                if (state.companiesList && Array.isArray(state.companiesList) && state.companiesList.length === 0) {
                    state.companiesList = undefined;
                    state.companyID = null;
                }
            })

            .addCase(deleteCompanyAPI.rejected, (state) => {
                state.status = 'failed'
                state.error = 'deleteError'
            })
            .addCase(renameCompanyAPI.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(renameCompanyAPI.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { id, title } = action.payload;
                const company = state.companiesList.find(company => company.id === id);
                if (company) {
                    company.title = title;
                }
                state.companyTitle = title;
            })
            .addCase(renameCompanyAPI.rejected, (state) => {
                state.status = 'failed'
            })

            .addCase(getCompanyUsersAPI.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getCompanyUsersAPI.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.companyUsers = action.payload
            })
            .addCase(getCompanyUsersAPI.rejected, (state) => {
                state.status = 'failed'
            })

            .addMatcher(
                companyApiSlice.endpoints.getCompanies.matchFulfilled,
                (state, action) => {
                    state.companiesList = action.payload;
                }
            )
            .addMatcher(
                companyApiSlice.endpoints.postCompany.matchFulfilled, 
                (state, action) => {
                    console.log('hello', action.payload)
                    state.companyID = action.payload.id
            })
        }
    })

export const { setCompanyID, checkCompanyID, changeCompany } = companySlice.actions
export default companySlice.reducer