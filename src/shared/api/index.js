export * as authService from './authService'
import {deleteCompany, getCompanies, postCompany, renameCompany} from './companiesService';

export const companiesService = {
    getCompanies,
    postCompany,
    deleteCompany,
    renameCompany,
}
