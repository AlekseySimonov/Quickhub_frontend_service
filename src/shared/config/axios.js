import axios from "axios";
import { API_URL } from "../api";

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((request) =>{
    request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return request
})

api.interceptors.response.use( (response) => {
    response.headers.add()
    return response;
    }, (error) => {
    return Promise.reject(error);
    });


export {api}

