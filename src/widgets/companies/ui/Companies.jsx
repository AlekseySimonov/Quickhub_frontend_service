import { Outlet } from "react-router-dom"
import { CompaniesHeader } from "./CompaniesHeader"
import styles from './styles.module.css'

const Companies = () =>{
    return(
        <>
        <div className={styles.content}>
            <CompaniesHeader/>
            <div className="main">
                <Outlet/>
            </div>
        </div>
        </>
    )
}

export {Companies}