import { Outlet } from "react-router-dom"
import { CompaniesHeader } from "./CompaniesHeader"
import styles from './styles.module.css'
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { getCompaniesAPI, setCompanyID, checkCompanyID, getCompanyUsersAPI} from "../../../app/store/slices/companySlice"
import { Loader } from "../../../shared/ui/components"

export const Companies = () =>{
    const dispatch = useDispatch()
    const {companyID, status} = useSelector(state => state.company)

    useEffect(() => {
        if (status === 'succeeded' && companyID === null) {
            dispatch(setCompanyID());
        }else if (status === 'succeeded' && companyID !== null) {
            dispatch(checkCompanyID())
        }
    }, [status, companyID, dispatch]);

    useEffect(() => {
        dispatch(getCompaniesAPI())
    }, [dispatch])

    useEffect(() => {
        if (companyID !== null) {
            dispatch(getCompanyUsersAPI())
        }
    }, [dispatch, companyID])

    return(
        <>
        <div className={`${styles.content} ${status === 'loading' ? styles.loading : ''}`}>
            {status === 'loading' && (<Loader style = {styles.loader}/>)}
            <CompaniesHeader/>
            <div className={styles.main}>
                <Outlet/>
            </div>
        </div>
        </>
    )
}