import axios from 'axios';
import {api} from '../config/axios'
import * as URL from './urls';

const login = (email, password)=>{
    console.log(email, ' ,', password)
    console.log(URL.API + URL.LOGIN, {email, password})
    console.log(axios.post(URL.API + URL.LOGIN, {email, password}))
    return api.post(URL.API + URL.LOGIN, {email, password})
}

const register =  (first_name,  last_name, email, password,password2)=>{
    return axios.post(URL.API + URL.REGISTRATION, {first_name,  last_name, email, password, password2})
}

const refreshToken = (refresh) =>{
    return api.post(URL.REFRESH_TOKEN, {refresh});
}

const logout = () => {
    return api.post(URL.LOGOUT);
}


export {login, register, refreshToken, logout }