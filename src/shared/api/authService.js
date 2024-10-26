import axios from 'axios';
import {api} from '../config/axios'
import * as URL from './urls';

const login = (email, password)=>{
    return axios.post(URL.API + URL.LOGIN, {email, password})
}

const register =  (first_name,  last_name, email, password,password2)=>{
    return axios.post(URL.API + URL.REGISTRATION, {first_name,  last_name, email, password, password2})
}

const refreshToken = (refresh) =>{
    return api.post(URL.REFRESH_TOKEN, {refresh});
}

const logout = (refresh) => {
    return api.post(URL.LOGOUT, {refresh});
}

export {login, register, refreshToken, logout }