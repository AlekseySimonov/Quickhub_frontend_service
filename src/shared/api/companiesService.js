// import axios from 'axios';
import {api} from '../config/axios'
import * as URL from './urls'

export const getCompanies = ()=>{
    return api.get(URL.COMPANIES)
}