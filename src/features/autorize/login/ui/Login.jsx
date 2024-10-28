import styles from './styles.module.css'
import { LoginForm } from '../../../../entities/autorize_form/index'
import {  Link } from 'react-router-dom'

const Login = () =>{
    
    return(
        <>
        <div className={styles.h1}>Авторизация</div>
        <div className= {styles.create_account}>
            <p>У вас нет аккаунта?</p>
            <Link to="/auth/registration">Создайте аккаунт</Link>
        </div> 
        <LoginForm />
        <a href="" className = {styles.forgot_password}>Забыли пароль?</a>
        </>
    )
}

export {Login}