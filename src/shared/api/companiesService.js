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

export const patchDepartments =(companyId, id, data) => {
    const url =`${URL.DEPARTMENTS.replace('{company_pk}', companyId)}/${id}`
    return api.patch(url, data);
}

export const deleteDepartment = (companyId, id) => {
    const url =`${URL.DEPARTMENTS.replace('{company_pk}', companyId)}/${id}`
    return api.delete(url)
}

export const deleteCompany = (id) => {
    const url = `${URL.COMPANIES}/${id}`;
    return api.delete(url);
};

export const renameCompany = (id, newCompanyName) => {
    const url = `${URL.COMPANIES}/${id}`;
    return api.patch(url, {
        title: newCompanyName
    });
};

export const getCompanyUsers = (id) => {
    const url = `${URL.COMPANY_USERS}/${id}`
    return api.get(url, {
        id: id
    });
};