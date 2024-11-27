export * as authService from './authService'
import {deleteCompany, getCompanies, postCompany} from './companiesService';

export const companiesService = {
    getCompanies,
    postCompany,
    deleteCompany,
}
