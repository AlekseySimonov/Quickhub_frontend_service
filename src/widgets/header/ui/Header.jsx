import styles from './styles.module.css'
import { icons } from '../../../shared/ui/icons/header';
import {DropDown} from '../../../shared/ui/components/index'
import { useDispatch } from 'react-redux'
import { logoutAPI } from '../../../app/store/slices/authSlice';

export const Header = ({burgerClick}) => {

        const dispatch = useDispatch()

        const dropDownOptions = [
        { label: 'Профиль', action: () => console.log('Перейти в профиль') },
        { label: 'Настройки', action: () => console.log('Открыть настройки') },
        { label: 'Выйти', action: () => dispatch(logoutAPI()) },
    ];

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
                        titleIcon={icons.profile} 
                        titleName="Симонов Алексей"
                        options = {dropDownOptions}
                    />
                </div>
        </div>
    </>
    )
}