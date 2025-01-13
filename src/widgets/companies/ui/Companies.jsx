import { Outlet } from "react-router-dom"
import { CompaniesHeader } from "./CompaniesHeader"
import styles from './styles.module.css'
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import {setCompanyID, checkCompanyID, getCompanyUsersAPI, useGetCompaniesQuery} from "../../../app/store/slices/companySlice"
import { Loader } from "../../../shared/ui/components"
import { useGlobalLoading } from "../../../shared/hooks"

export const Companies = () =>{
    const dispatch = useDispatch()
    const {companyID} = useSelector(state => state.company)

    const {isSuccess } = useGetCompaniesQuery()
    const isLoading = useGlobalLoading()

    useEffect(() => {
        if (isSuccess && companyID === null) {
            dispatch(setCompanyID());
        }else if (isSuccess && companyID !== null) {
            dispatch(checkCompanyID())
        }
    }, [companyID, dispatch, isSuccess]);

    useEffect(() => {
        useGetCompaniesQuery
    }, [dispatch])

    useEffect(() => {
        if (companyID !== null) {
            dispatch(getCompanyUsersAPI())
        }
    }, [dispatch, companyID])

    return(
        <>
        <div className={`${styles.content} ${ isLoading ? styles.loading : ''}`}>
            {isLoading && (<Loader style = {styles.loader}/>)}
            <CompaniesHeader/>
            <div className={styles.main}>
                <Outlet/>
            </div>
        </div>
        </>
    )
}