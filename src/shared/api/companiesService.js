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