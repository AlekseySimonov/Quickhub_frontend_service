import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { companiesService } from './../../../shared/api/index';

const initialState ={
    companiesList: [],
    companyID: null,
    companyTitle: null,
    status: null,
    error: null,
}

export const getCompaniesAPI = createAsyncThunk(
    'company/getCompaniesAPI',
    async (_, { rejectWithValue }) => {
        try {
            const response = await companiesService.getCompanies()
            console.log(response)
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
            console.log('Ты пытаешься удалить следующий id:', id);
            await companiesService.deleteCompany(id);
            return id;
        } catch (err) {
            console.error('Знакомься, меня зовут ошибка:', err);
            return rejectWithValue(err.response || err);
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
                console.log('companiesList is empty, cannot set companyID');
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
                state.error = 'createError'
            })

            .addCase(deleteCompanyAPI.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(deleteCompanyAPI.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const idToDelete = action.payload
                state.companiesList = state.companiesList.filter(company => company.id !== idToDelete)
                console.log('Ну, в общем-то, поздравляю! Ты снёс к хуям компанию с айди:', idToDelete)
            })

            .addCase(deleteCompanyAPI.rejected, (state) => {
                state.status = 'failed'
                state.error = 'deleteError'
                console.log('Ну, в общем, удалить не получилось.')
            })

        }
    })

export const { setCompanyID, checkCompanyID, changeCompany } = companySlice.actions
export default companySlice.reducer