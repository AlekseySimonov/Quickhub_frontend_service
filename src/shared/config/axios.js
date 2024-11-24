import axios from "axios";
import {API} from "../api/urls";
// import { Navigate } from "react-router-dom";
// import { appRouter } from "../../pages/routing";
// import { refreshTokenAPI } from "../../app/store/slices/authSlice";
// import store from './../../app/store/index';

export const api = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json',
    },
})

// api.interceptors.response.use((config) =>{
//     return config
// }, async (error) =>{
//     const originalRequest = error.config
//     if (error.response.status == 401 && !originalRequest._retry){
//         try{
//             await api.post(REFRESH)
//             return api.request(originalRequest)
//         }catch (err) {  
//             localStorage.removeItem('isAuth')
//             sessionStorage.removeItem('isAuth')
//             window.location.reload()
//             console.error("Ошибка при обновлении токена:", err)
//         }
//     }else{
//         console.error("Ошибка API:", error)
//     }
// }
// )
