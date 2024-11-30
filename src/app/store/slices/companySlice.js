import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {companiesService} from "../../../shared/api/index"

const initialState ={
    companiesList: [],
    companyID: null,
    companyTitle: null,
    departments: [],
    departments: [],
    status: 'loading',
    error: null,
}

export const getCompaniesAPI = createAsyncThunk(
    'company/getCompaniesAPI',
    async (_, { rejectWithValue }) => {
        try {
            const response = await companiesService.getCompanies()
            return response.data
        } catch (err) {
            return rejectWithValue(err.response)
    }}
)

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
            console.log('Ты пытаешься удалить следующий id:', id);
            await companiesService.deleteCompany(id);
            return id;
        } catch (err) {
            console.error('Знакомься, меня зовут ошибка:', err);
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

export const getDepartmentsAPI = createAsyncThunk(
    'company/getDepartmentsAPI',
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState().company
            const response = await companiesService.getDepartments(state.companyID)
            return response.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

export const deleteDepartmentAPI = createAsyncThunk(
    'company/deleteDepartmentAPI',
    async (departmentId, { rejectWithValue, getState }) => {
        try {
            const state = getState().company
            await companiesService.deleteDepartment(state.companyID, departmentId)
            return departmentId
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanyID(state) {
            if (state.companiesList.length > 0) {
                state.companyID = state.companiesList[0].id
                state.companyTitle = state.companiesList[0].title
            } else {
                state.companyTitle = null
                state.companyID = null
            }
        },
        checkCompanyID(state) {
            const exists = state.companiesList.some(company => company.id === state.companyID);
            if (!exists && state.companiesList.length > 0) {
                state.companyID = state.companiesList[0].id;
                state.companyTitle = state.companiesList[0].title;
            }
        },
        changeCompany(state, action) {
            state.companyTitle = action.payload.title
            state.companyID = action.payload.id
            console.log(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompaniesAPI.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getCompaniesAPI.fulfilled, (state,action) => {
                state.status = 'succeeded'
                state.companiesList = action.payload;
            })
            .addCase(getCompaniesAPI.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })

            .addCase(postCompanyAPI.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(postCompanyAPI.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.companiesList.push(action.payload);
            })

            .addCase(postCompanyAPI.rejected, (state) => {
                state.status = 'failed'
                state.error = 'postError'
            })

            .addCase(getDepartmentsAPI.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getDepartmentsAPI.fulfilled, (state,action) => {
                state.status = 'succeeded'
                state.departments = action.payload;
            })
            .addCase(getDepartmentsAPI.rejected, (state) => {
                state.status = 'failed'
            })

            .addCase(deleteDepartmentAPI.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteDepartmentAPI.fulfilled, (state,action) => {
                state.status = 'succeeded'
                const idToDelete = action.payload;
                state.departments = state.departments.filter(department => 
                    department.id !== idToDelete);
            })
            .addCase(deleteDepartmentAPI.rejected, (state) => {
                state.status = 'failed'
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
                console.log('Название компании с id', id, 'изменено на:', title);
            })
            .addCase(renameCompanyAPI.rejected, (state) => {
                state.status = 'failed'
            })
        }
    })

export const { setCompanyID, checkCompanyID, changeCompany } = companySlice.actions
export default companySlice.reducer