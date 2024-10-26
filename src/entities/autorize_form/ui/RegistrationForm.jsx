import { useState} from "react"
import styles from './styles.module.css'
import { Checklist } from "../../../shared/ui/components/autorize/PasswordChecklist"
import { useDispatch } from "react-redux"
import { registerAPI } from "../../../app/store/slices/authSlice"

const RegistrationForm = () => {

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const [password2, setPassword2] = useState("")

    const [checked, setChecked] = useState(false)

    const dispatch = useDispatch()
    const handleSubmit = () =>  dispatch(registerAPI({first_name,  last_name, email, password, password2}))

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
                onChange={e => setPassword2(e.target.value)}
                /> 
            </div>

            <div className ={styles.password_requirements}>
                <Checklist password={password} passwordAgain={password2}/>
            </div>

            <div className ={styles.login}>
                <button 
                disabled = {!checked}
                className = {styles.btn}
                onClick={handleSubmit}
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