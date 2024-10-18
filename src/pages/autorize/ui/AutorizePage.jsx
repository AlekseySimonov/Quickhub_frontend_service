import { Outlet } from 'react-router-dom'
import BackgroundImg from './background.svg'
import styles from  './style.module.css'

const AutorizePage = () => {

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

