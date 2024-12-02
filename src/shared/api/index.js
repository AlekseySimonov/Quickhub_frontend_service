import {deleteCompany, getCompanies, postCompany, getDepartments, deleteDepartment, renameCompany, getCompanyUsers, patchDepartments} from './companiesService';
import { register,login,refreshToken,logout } from './authService';

export const authService = {
    register,
    login,
    refreshToken,
    logout,
}
export const companiesService = {
    getCompanies,
    postCompany,
    getDepartments, 
    deleteDepartment,
    deleteCompany,
    renameCompany,
    getCompanyUsers,
    patchDepartments,
}
