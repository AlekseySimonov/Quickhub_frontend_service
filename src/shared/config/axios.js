import axios from "axios";
import {API} from "../api/urls";
import { appRouter } from "../../pages/routing";
import { authService } from "../api";

const api = axios.create({
    withCredentials: true, 
    baseURL: API,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((request) =>{
    const storage = sessionStorage.getItem('accessToken') === null  ? localStorage : sessionStorage
    request.headers.Authorization = `Bearer ${storage.getItem('accessToken')}`
    return request
})

api.interceptors.response.use((config) =>{
    return config
}, async (error) =>{
    const originalRequest = error.config
    if (error.response.status == 401){
        const storage = sessionStorage.getItem('accessToken') === null  ? sessionStorage : localStorage
        try{
            console.log(storage)
            var response = await authService.refreshToken(storage.getItem('refreshToken'))
            storage.setItem('accessToken', response.data.access)
            storage.setItem('refreshToken', response.data.refresh)
            return api.request(originalRequest)
        }catch (err) {  
            storage.removeItem('accessToken')
            storage.removeItem('refreshToken')
            appRouter.push('/auth')
            console.log(err)
        }
    }else{
        console.log(error)
    }
        
    }
)

export {api}

