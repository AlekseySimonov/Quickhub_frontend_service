import { Outlet } from "react-router-dom"
import { CompaniesHeader } from "./CompaniesHeader"
import styles from './styles.module.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { getCompaniesAPI, setCompanyID, checkCompanyID} from "../../../app/store/slices/companySlice"

export const Companies = () =>{
    const dispatch = useDispatch()
    const {companyID, status} = useSelector(state => state.company)
    useEffect(() => {
        dispatch(getCompaniesAPI())
    }, [dispatch])

    useEffect(() => {
        if (status === 'succeeded' && companyID === null) {
            dispatch(setCompanyID());
        }else if (status === 'succeeded' && companyID !== null) {
            dispatch(checkCompanyID())
        }
    }, [status, companyID, dispatch]);

    
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

    return(
        <>
        <div className={styles.content}>
            <CompaniesHeader
                selectedCompanyId={selectedCompanyId} 
                setSelectedCompanyId={setSelectedCompanyId}
            />
            <div className={styles.main}>
                <Outlet context={{ selectedCompanyId }} />
            </div>
        </div>
        </>
    )
}