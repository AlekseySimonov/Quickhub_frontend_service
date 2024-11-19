import axios from "axios";
import {API} from "../api/urls";
import { refreshTokenAPI } from "../../app/store/slices/authSlice";
import store from './../../app/store/index';

export const api = axios.create({
    withCredentials: true, 
    baseURL: API,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((request) =>{
    const remember = localStorage.getItem('remember')
    if  (remember === 'true'){
        request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    }else{
        request.headers.Authorization = `Bearer ${sessionStorage.getItem('accessToken')}`
    }
    return request
})

let isRefreshing = false

api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response && (error.response.status == 401 || error.response.status == 400) && !originalRequest._isRetry) {
            originalRequest._isRetry = true
            if (!isRefreshing) {  
                isRefreshing = true
                originalRequest._isRetry = true

                try {
                    const response = await store.dispatch(refreshTokenAPI())
                    originalRequest.headers['Authorization'] = `Bearer ${response.payload.data.access}`
                    if (originalRequest.data) {  
                        const data = JSON.parse(originalRequest.data)
                        if (data.refresh_token !== undefined) {  
                            data.refresh_token = response.payload.data.refresh
                        }  
                        originalRequest.data = JSON.stringify(data)
                    }
                    return api.request(originalRequest)
                } catch (err) {
                    console.error('Token refresh failed:', err)
                    sessionStorage.removeItem('accessToken')
                    localStorage.removeItem('accessToken')
                    sessionStorage.removeItem('refreshToken')
                    localStorage.removeItem('refreshToken')
                    window.location.reload()
                } finally {
                    isRefreshing = false
                }
            } else {
                console.error("Ошибка API:", error)
            }
        }
    }
)
