import { Outlet, useLocation } from 'react-router-dom'
import BackgroundImg from './background.svg'
import styles from  './style.module.css'
import { useEffect } from 'react'
import { authTitles } from '../../routing'

const AutorizePage = () => {
    const location = useLocation()
    useEffect(() => {  
        document.title = authTitles[location.pathname] ?? 'Ошибка';  
    }, [location]);

    return(
        <div className={styles.container}>
            <div className={styles.backgroundImg}>
                <img src={BackgroundImg} alt="#"/>
            </div>

            <div className={styles.content}>
                <div className = {styles.form}>
                    <Outlet/>
                </div>
            </div>

        </div>
    )
}



export { AutorizePage }

