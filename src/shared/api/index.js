import {deleteCompany, getCompanies, postCompany} from './companiesService';
import { register,login,refreshToken,logout } from './authService';

export const authService = {register,login,refreshToken,logout}
export const companiesService = {getCompanies, postCompany,    deleteCompany,
}
