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
    const token = remember === 'true' 
        ? localStorage.getItem('accessToken') 
        : sessionStorage.getItem('accessToken')

    if (token) {
        request.headers.Authorization = `Bearer ${token}`
    }
    return request
})

let isRefreshing = false

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response 
            && (error.response.status === 401 || error.response.status === 400) 
            && !originalRequest._isRetry) {
            originalRequest._isRetry = true

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const response = await store.dispatch(refreshTokenAPI());

                    if (response.meta.requestStatus === 'fulfilled') {
                        const newAccessToken = response.payload.data.access;
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        if (originalRequest.data) {
                            const data = JSON.parse(originalRequest.data);
                            if (data.refresh_token !== undefined) {
                                data.refresh_token = response.payload.data.refresh;
                            }
                        originalRequest.data = JSON.stringify(data);
                        }
                    } else {
                            throw new Error('Failed to refresh token');
                        }

                    return api.request(originalRequest);
                } catch (err) {
                    sessionStorage.removeItem('accessToken');
                    localStorage.removeItem('accessToken');
                    sessionStorage.removeItem('refreshToken');
                    localStorage.removeItem('refreshToken');
                    window.location.reload();
                } finally {
                    isRefreshing = false;
                }
            } else {
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
);
