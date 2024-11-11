import {createSlice } from "@reduxjs/toolkit"

const initialState ={
    email: 'admin@mail.ru',
    firstName: null,
    secondName: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    })

// export const { setCompanyID, checkCompanyID } = companySlice.actions
export default userSlice.reducer