import {useState} from "react"
import styles from './styles.module.css'
import { Checklist } from "../../../shared/ui/components/autorize/PasswordChecklist"

const RegistrationForm = () => {
    const [password, setPassword] = useState("")
	const [passwordAgain, setPasswordAgain] = useState("")

    
    return (
        <>
        <div className={styles.name}>
            <div className ={styles.account}>
                <input  placeholder = 'Имя' className = 'firstName'/>
            </div>

            <div className ={styles.account}>
                <input  placeholder = 'Фамилия' className = 'secondName'/>
            </div>
        </div>
            

            <div className ={styles.account}>
                <input  placeholder = 'Почта' className = 'email'/>
            </div>

            <div className ={styles.password}>
                <input 
                type='password'  
                placeholder = 'Пароль' 
                className = 'password' 
                onChange={e => setPassword(e.target.value)}
                /> 
            </div>

            <div className ={styles.password}>
                <input 
                type='password'  
                placeholder = 'Повторите пароль' 
                className = 'passwordAgain'
                onChange={e => setPasswordAgain(e.target.value)}
                /> 
            </div>

            <div className ={styles.password_requirements}>
                <Checklist password={password} passwordAgain={passwordAgain}/>
            </div>

            

            <div className ={styles.login}>
                <button type="submit" className = {styles.btn}>Зарегестрироваться</button>
            </div>

            <div className={styles.agreement}>
                <input type="checkbox" name="myCheckbox" /> 
                <p>
                    Регистрируясь, вы подтверждаете, что принимаете <a href="#">Пользовательское соглашение</a> и <a
                    href="#">Согласие</a> на обработку персональных данных.
                </p>
            </div>
        </>
        
    )
}

export { RegistrationForm }