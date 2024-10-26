import axios from "axios";
import {API, REFRESH} from "../api/urls";

const api = axios.create({
    withCredentials: true, 
    baseURL: API,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((request) =>{
        request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return request
})

api.interceptors.response.use((config) =>{
    return config
}, async (error) =>{
    const originalRequest = error.config
    if (error.response.status == 401 || error.response.status == 403)
        var response = await axios.post(API + REFRESH, {withCredentials:true})
        localStorage.setItem('access', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)
        return api.request(originalRequest)
    }
)

export {api}

