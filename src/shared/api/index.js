import { register,login,refreshToken,logout } from './authService';

export * as URLS from "./urls"

export const authService = {
    register,
    login,
    refreshToken,
    logout,
}