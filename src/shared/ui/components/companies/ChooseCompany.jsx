import styles from './choose_company.module.css'
import arrow from '../../icons/companies/arrow.svg'
import settings from '../../icons/companies/company_settings.svg'

const ChooseCompany = ()=>{
    return(
        <div className={styles.choose_company}>
            <p> Выбрать компанию</p>

            <div className={styles.selector}>
                <p>QuickHub</p>
                <img src= {arrow}/>
            </div>

            <button className={styles.settings}>
                <img src= {settings}/>
            </button>
        </div>
    )
}

export {ChooseCompany}