import { Outlet } from "react-router-dom"
import { CompaniesHeader } from "./CompaniesHeader"
import styles from './styles.module.css'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCompaniesAPI } from "../../../app/store/slices/companySlice"

export const Companies = () =>{
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCompaniesAPI())
    },[dispatch])

    return(
        <>
        <div className={styles.content}>
            <CompaniesHeader/>
            <div className={styles.main}>
                <Outlet/>
            </div>
        </div>
        </>
    )
}