import styles from './styles.module.css'
import { icons } from '../../../shared/ui/icons/header';
import {DropDown} from '../../../shared/ui/components/index'
import { useDispatch } from 'react-redux'
import { logoutAPI } from '../../../app/store/slices/authSlice';

const dropDownOptions = ['Выйти']

export const Header = ({burgerClick}) => {

        const dispatch = useDispatch()
        const handleLogout = () => {  
            dispatch(logoutAPI())
            console.log("Пользователь вышел из приложения.")
        }

    return (
    <>
        <div className={styles.left}>
        
            <button 
                className={styles.burger} 
                onClick={burgerClick} 
                data-testid ='burger-test'
            >
                <img src={icons.burger}/>
            </button>

            <a href="#" className={styles.logo}>
                <img src={icons.logoSVG}/>
                QuickHub
            </a>

            <div className={styles.search}>
                <img src={icons.search}/>
                <input type="text" placeholder="Искать" />
            </div>
        </div>
            


        <div className={styles.right}>

            <a href="" className={styles.notifications}>
                <img src={icons.notifications}/>
            </a>

            <a href="" className={styles.messages}>
                <img src={icons.messages}/>
            </a>

            <div className={styles.account}>
                    <DropDown
                        styles = {styles}
                        title = {<>
                                    <div className={styles.profile_icon}>
                                        <img src={icons.profile}/>
                                    </div>
                                    Симонов Алексей
                                    <div className={styles.arrow_down}>
                                        <img src={icons.arrow_down}/>
                                    </div>
                                </>
                                }
                        options = {dropDownOptions}
                        onLogout={handleLogout}
                    />
                </div>
        </div>
    </>
    )
}