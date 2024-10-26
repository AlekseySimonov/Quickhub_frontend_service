import { Outlet, useLocation } from 'react-router-dom'
import BackgroundImg from './background.svg'
import styles from  './style.module.css'
import { useEffect } from 'react'
import { authTitles } from '../../routing'
import { useSelector } from 'react-redux'

const AutorizePage = () => {
    const location = useLocation()
    useEffect(() => {  
        document.title = authTitles[location.pathname] ?? 'Ошибка';  
    }, [location]);

    const {status,error} = useSelector(state => state.auth)

    return(
        <div className={styles.container}>
            <div className={styles.backgroundImg}>
                <img src={BackgroundImg} alt="#"/>
            </div>

            <div className={styles.content}>
                <div className = {styles.form}>
                    {status === 'loading' && <h2>Loading...</h2>}
                    {error  && <h2>Error</h2>}
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}



export { AutorizePage }

