// import axios from 'axios';
import axios from 'axios';
import {api} from '../config/axios'
import * as URL from './urls';
import { API } from './urls';

export const login = (email, password)=>{
    return axios.post(API + URL.LOGIN, {email, password})
}

export const register =  (first_name,  last_name, email, password,password2)=>{
    return axios.post(API + URL.REGISTRATION, {first_name,  last_name, email, password, password2})
}

export const resetPassword =  (email)=>{
    return axios.post(API + URL.REGISTRATION, {email})
}

export const emailVerify = (refresh_token) => {
    return api.post(URL.LOGOUT, {refresh_token}) //*! in development */
}

export const refreshToken = (refresh) =>{
    return api.post(URL.REFRESH, {refresh})
}

export const logout = (refresh_token) => {
    return api.post(URL.LOGOUT, {refresh_token})
}

