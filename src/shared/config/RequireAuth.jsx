import { Navigate } from 'react-router-dom'

export const CheckAuth = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    
    if (!accessToken) {
        return <Navigate to='/auth/login' replace />;
    }
    
    return children;
}

export const IsAuth = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    
    if (accessToken) {
        return <Navigate to='/tasks' replace />;
    }
    
    return children;
}

