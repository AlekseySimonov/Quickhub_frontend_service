import styles from './styles.module.css'
import { LoginForm } from '../../../../features/autorize_form/index'
import { NavLink } from 'react-router-dom'

const Login = () =>{
    return(
        <>
        <div className={styles.h1}>Восстановление пароля</div>
        <div className= {styles.create_account}>
            <p>У вас нет аккаунта?</p>
            <NavLink to="/registration" >Создайте аккаунт</NavLink>
        </div> 
        <LoginForm />
        </>
    )
}

export {Login}