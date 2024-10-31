import styles from './style.module.css'
import { RegistrationForm } from '../../../../entities/autorize_form/index'
import { NavLink } from 'react-router-dom'

export const Registration = () =>{
    return(
        <>
        <div className={styles.h1}>Регистрация</div>
        <div className={styles.sign_up_account}>
            <p>У Вас уже есть аккаунт?</p>
            <NavLink to="/auth/login">Войти</NavLink>
        </div>
        <RegistrationForm />
        </>
    )
}


