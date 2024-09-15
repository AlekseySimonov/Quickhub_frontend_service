/*
* * Настройка axios.
    При отправке запроса на сервер не нужно писать адрес сервера API_URL
    Автоматическое отправление cookie
*/

import axios from "axios";

const API_URL = 'http://localhost:8000/'

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    },
})


/** Интерцептор на запрос */

api.interceptors.request.use((request) =>{
    request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return request
    }, (error) => {
        return Promise.reject(error)
})

// axios.interceptors.response.use( (response) => {
//     response.headers.add()
//     return response;
//     }, function (error) {
//     return Promise.reject(error);
//     });


export {api}

