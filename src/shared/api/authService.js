// import axios from 'axios';
import axios from 'axios';
import {api} from '../config/axios'
import * as URL from './urls';
import { API } from './urls';

const login = (email, password)=>{
    return axios.post(API + URL.LOGIN, {email, password})
}

const register =  (first_name,  last_name, email, password,password2)=>{
    return axios.post(API + URL.REGISTRATION, {first_name,  last_name, email, password, password2})
}

const refreshToken = (refresh) =>{
    return api.post(URL.REFRESH, {refresh})
}

const logout = (refresh_token) => {
    return api.post(URL.LOGOUT, {refresh_token})
}

export {login, register, refreshToken, logout}
