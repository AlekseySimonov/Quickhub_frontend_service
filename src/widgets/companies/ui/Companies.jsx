import { Outlet } from "react-router-dom"
import { CompaniesHeader } from "./CompaniesHeader"
import styles from './styles.module.css'
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import {setCompanyID, checkCompanyID,useGetCompaniesQuery, useGetUsersCompanyQuery} from "../../../app/store/slices/companySlice"
import { Loader } from "../../../shared/ui/components"
import { useGlobalLoading } from "../../../shared/hooks"

export const Companies = () =>{
    const dispatch = useDispatch()
    const {companyID} = useSelector(state => state.company)

    const { isSuccess, error: companiesError } = useGetCompaniesQuery();

    const isLoading = useGlobalLoading();

    useEffect(() => {
        if (isSuccess) {
            if (companyID === null) {
                dispatch(setCompanyID());
            } else {
                dispatch(checkCompanyID());
            }
        }
    }, [isSuccess, companyID, dispatch]);

    const { error: usersError } = useGetUsersCompanyQuery(companyID, {
        skip: companyID == null,
        enabled: isSuccess && companyID !== null
    });

    if (companiesError) {
        alert('Произошла ошибка при загрузке компаний: ' + companiesError.message);
    }

    if (usersError) {
        alert('Произошла ошибка при загрузке пользователей: ' + usersError.message);
    }

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