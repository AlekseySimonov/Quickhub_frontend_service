import styles from './styles.module.css'
import loginImg from '../../../shared/ui/icons/autorize/login.svg'
import passwordImg from '../../../shared/ui/icons/autorize/password.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAPI } from '../../../app/store/slices/authSlice'

const LoginForm = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    

    const dispatch = useDispatch()
    const handleSubmit = () =>  dispatch(loginAPI({email,password}))

    return (
        <>

            <div className ={styles.account}>
                <img src={loginImg} alt="#"/>
                <input  
                placeholder = 'Логин'
                onChange={e => setEmail(e.target.value)}
                value={email}
                className = ''/>
            </div>

            <div className ={styles.password}>
                <img src={passwordImg} alt="#"/>
                <input 
                type='password'  
                placeholder = 'Пароль' 
                onChange={e => setPassword(e.target.value)}
                value={password}
                className = ''/> 
            </div>

            <div className ={styles.login}>

                <button 
                className = {styles.btn}
                onClick={handleSubmit}
                >Войти</button>

                <label className ={styles.remember_password} >
                    <input type="checkbox" name="myCheckbox" />
                    Запомнить пароль
                </label>
            </div>

        <a href="" className = {styles.forgot_password}>Забыли пароль?</a>
        </>
        
    )
}

export { LoginForm }