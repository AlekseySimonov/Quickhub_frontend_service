import { Outlet, useLocation } from 'react-router-dom'
import BackgroundImg from './background.svg'
import styles from  './style.module.css'
import { useEffect } from 'react'
import { authTitles } from '../../routing'
import { useSelector } from 'react-redux'
import { Loader } from '../../../shared/ui/components'

const AutorizePage = () => {
    const location = useLocation()
    useEffect(() => {  
        document.title = authTitles[location.pathname] ?? 'Ошибка';  
    }, [location]);

    const {status} = useSelector(state => state.auth)

    return(
        <div className={styles.container}>
            <div className={styles.backgroundImg}>
                <img src={BackgroundImg} alt="#"/>
            </div>

            <div className={`${styles.content} ${status === 'loading' ? styles.loading : ''}`}> 
                <div className = {styles.form}>
                    {status === 'loading' && <Loader style = {styles.loader}/>}
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}



export { AutorizePage }

