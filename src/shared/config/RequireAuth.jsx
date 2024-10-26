import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const CheckAuth = ({children}) => {
    let isAuth = useSelector((state) => state.auth.isAuth)
    if (isAuth !== "true"){
        return <Navigate to='/auth/login' replace/>
    }
    return children
}

export const IsAuth = ({children}) => {
    let isAuth = useSelector((state) => state.auth.isAuth)
    if (isAuth === "true"){
        return <Navigate to='/tasks' replace/>
    }
    return children
}

