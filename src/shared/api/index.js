export * as authService from './authService'
import {getCompanies, postCompany} from './companiesService';

export const companiesService = {
    getCompanies,
    postCompany,
}
