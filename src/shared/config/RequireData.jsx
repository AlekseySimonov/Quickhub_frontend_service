import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const CheckCompanyID = ({children}) => {
    const companyID = useSelector(state => state.company.companyID)
    if (companyID === null){
        return <Navigate to='companies' />
    }
    return children
}
