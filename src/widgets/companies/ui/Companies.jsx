import { CompaniesHeader } from "./CompaniesHeader"
import { CompaniesMain } from "./CompaniesMain"
import styles from './styles.module.css'

const Companies = () =>{
    return(
        <>
        <div className={styles.content}>
            <CompaniesHeader/>
            <CompaniesMain/>
        </div>
        </>
    )
}

export {Companies}