import styles from './styles.module.css'
import loginImg from '../../../shared/ui/icons/autorize/login.svg'
import passwordImg from '../../../shared/ui/icons/autorize/password.svg'
import { useState } from 'react'
import { api } from '../../../shared/http/axios'

const LoginForm = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const LOGIN_URL = '/account/api/v1/login/'

    const onSubmit = async () => {
        console.log(email,',', password)
        try{
            const response = await api.post(LOGIN_URL, 
                JSON.stringify({username: email, password:password}))
                console.log(response)
        }catch(error){
            console.log( error);
        }
        
    }

    
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

                <button type="submit" className = {styles.btn} onClick={onSubmit}>Войти</button>

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