// import axios from 'axios';
import {api} from '../config/axios'
import * as URL from './urls'

export const getCompanies = ()=>{
    return api.get(URL.COMPANIES)
}

export const postCompany = (title, email)=>{
    console.log(email)
    return api.post(URL.COMPANIES, { 
        title, 
        users: [{ email }]
    })
}

export const getDepartments = (companyId) => {
    const url = URL.DEPARTMENTS.replace('{company_pk}', companyId)
    return api.get(url)
}
