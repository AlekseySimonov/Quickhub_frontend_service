import styles from './styles.module.css'
import loginImg from '../../../shared/ui/icons/autorize/login.svg'
import passwordImg from '../../../shared/ui/icons/autorize/password.svg'
import { useDispatch, useSelector } from 'react-redux'
import { loginAPI } from '../../../app/store/slices/authSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export const  LoginForm = () => {
    
    const {error} = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        dispatch(loginAPI({ email: values.email, password: values.password }));
    }

    const initialValues = {
        email: '',
        password: '',
        remember: false,
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Некорректный email')
            .required('Email обязателен'),
        password: Yup.string()
            .required('Пароль обязателен'),
    })

    return (

    <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
        <Form className={styles.form}>

            <div>
                <div className={styles.account}>
                    <img src={loginImg} alt="#" />
                    <Field
                        name="email"
                        placeholder="Логин"
                    />
                </div>
                <ErrorMessage name="email" component="div" className={styles.errorMessage} />
            </div>
            
            <div>
                <div className={styles.password}>
                    <img src={passwordImg} alt="#" />
                    <Field name="password" type="password" placeholder="Пароль"/>
                </div>
                <ErrorMessage name="password" component="div" className={styles.errorMessage} />
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className ={styles.login}>

                <button className = {styles.btn} type="submit">
                Войти
                </button>

                <label className ={styles.remember_password} >
                    <input type="checkbox"/>
                    Запомнить пароль
                </label>
            </div>
            
        </Form>
        
    </Formik>
    )
}