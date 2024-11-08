import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {companiesService} from "../../../shared/api/"

const initialState ={
    companiesList: [],
    companyID: null,
    id: '1',
    status: null,
    companyTitle: null,
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

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanyID(state) {
            if (state.companiesList.length > 0) {
                state.companyID = state.companiesList[0].id
            } else {
                console.log('companiesList is empty, cannot set companyID');
                state.companyID = null
            }
        },
        checkCompanyID(state) {
            const exists = state.companiesList.some(company => company.id === state.companyID)
            if (!exists) {
                state.companyID = state.companiesList[0].id
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompaniesAPI.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(getCompaniesAPI.fulfilled, (state,action) => {
                state.status = 'succeeded'
                state.companiesList = action.payload
                state.error = null
            })
            .addCase(getCompaniesAPI.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })

        }
    })

export const { setCompanyID, checkCompanyID } = companySlice.actions
export default companySlice.reducer