export const API = '/backend/'

export const LOGIN = 'account/api/v1/login/'
export const REGISTRATION = 'account/api/v1/registration/'
export const LOGOUT = 'account/api/v1/logout/'
export const REFRESH = 'account/api/v1/token/refresh/'
export const EMAIL_VERIFY = '/account/api/v1/email-verify/'

export const COMPANIES = 'company-service/api/v1/company/companies/'
export const COMPANY_USERS = '/profile/api/v1/profile/users-info-by-company/'

export const DEPARTMENTS = 'company-service/api/v1/company/companies/{company_pk}/departments/'
export const DEPARTMENTS_USERS_DATA ='/profile/api/v1/profile/company/{company_pk}/deps/'

export const PROJECTS = '/company-service/api/v1/company/companies/{company_pk}/projects/'

export const PROFILE = '/profile/api/v1/profile/'

export const CUSTOM_COLUMN = '/task-service/api/v1/custom-columns/'
export const SUBTASK = '/task-service/api/v1/subtasks/'
export const TASKS = '/task-service/api/v1/tasks/'