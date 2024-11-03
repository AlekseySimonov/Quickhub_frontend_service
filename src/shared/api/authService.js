// import axios from 'axios';
import {api} from '../config/axios'
import * as URL from './urls';

const login = (email, password)=>{
    return api.post(URL.LOGIN, {email, password})
}

const register =  (first_name,  last_name, email, password,password2)=>{
    return api.post(URL.REGISTRATION, {first_name,  last_name, email, password, password2})
}

const refreshToken = () =>{
    return api.post(URL.REFRESH)
}

const logout = () => {
    return api.post(URL.LOGOUT)
}

export {login, register, refreshToken, logout}
