import { useState} from "react"
import styles from './styles.module.css'
import { Checklist } from "../../../shared/ui/components/autorize/PasswordChecklist"

const RegistrationForm = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const [passwordAgain, setPasswordAgain] = useState("")

    const [checked, setChecked] = useState(false)
    
    return (
        <>
        <div className={styles.name}>
            <div className ={styles.account}>
                <input  
                placeholder = 'Имя' 
                onChange={e => setFirstName(e.target.value)}
                />
            </div>

            <div className ={styles.account}>
                <input  
                placeholder = 'Фамилия' 
                onChange={e => setLastName(e.target.value)}
                />
            </div>
        </div>
            
            <div className ={styles.account}>
                <input  
                placeholder = 'Почта' 
                onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className ={styles.password}>
                <input 
                type='password'  
                placeholder = 'Пароль' 
                onChange={e => setPassword(e.target.value)}
                /> 
            </div>

            <div className ={styles.password}>
                <input 
                type='password'  
                placeholder = 'Повторите пароль' 
                onChange={e => setPasswordAgain(e.target.value)}
                /> 
            </div>

            <div className ={styles.password_requirements}>
                <Checklist password={password} passwordAgain={passwordAgain}/>
            </div>

            <div className ={styles.login}>
                <button 
                disabled = {!checked}
                className = {styles.btn}
                // onClick={}
                >
                Зарегистрироваться
                </button>
            </div>

            <div className={styles.agreement}>
                <input 
                type="checkbox" 
                checked={checked}
                onChange={() => setChecked(!checked)}
                name="myCheckbox" /> 

                <p>
                    Регистрируясь, вы подтверждаете, что принимаете <a href="#">Пользовательское соглашение</a> и <a
                    href="#">Согласие</a> на обработку персональных данных.
                </p>
            </div>
        </>
        
    )
}

export { RegistrationForm }