import styles from './styles.module.css'
import { icons } from '../../../shared/ui/icons/header';
import {DropDown} from '../../../shared/ui/components/index'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAPI } from '../../../app/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery } from '../../../app/store/slices/userSlice';

export const Header = ({burgerClick}) => {
        const navigate = useNavigate();
        const dispatch = useDispatch()

        const userId = useSelector((state) => state.user.userId)
        console.log(userId)
        const { data: userInfo} = useGetUserInfoQuery(userId, {
            skip: !userId,
            enabled: userId != null,
        });

        const dropDownOptions = [
        { label: 'Профиль', action: () => navigate('/profile')  },
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
                        titleIcon ={icons.profile} 
                        titleName = {userInfo ? `${userInfo.last_name}   ${userInfo.first_name}` : 'Loading...'}
                        options = {dropDownOptions}
                    />
                </div>
        </div>
    </>
    )
}