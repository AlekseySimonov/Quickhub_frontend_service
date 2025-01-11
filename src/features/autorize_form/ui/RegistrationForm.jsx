import styles from './styles.module.css'
import { useDispatch, useSelector} from "react-redux"
import { registerAPI } from "../../../app/store/slices/authSlice"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useResetErrorState } from '../../../shared/hooks'

export const RegistrationForm = () => {

    useResetErrorState()

    const {error} = useSelector(state => state.auth)
    
    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
        checkbox: false,
    }

    const dispatch = useDispatch()
    const handleSubmit = (values) =>  dispatch(registerAPI(
        {first_name: values.first_name, 
        last_name: values.last_name, 
        email: values.email, 
        password: values.password, 
        password2: values.password2}))
    
    const validationSchema = Yup.object({
        first_name: Yup.string()
            .required('Имя обязательно')
            .matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Имя может содержать только буквы'),
        last_name: Yup.string()
            .required('Фамилия обязательна')
            .matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Фамилия может содержать только буквы'),
        email: Yup.string()
            .email('Некорректный email')
            .required('Email обязателен'),
        password: Yup.string()
            .required('Пароль обязателен')
            .min(6, 'Пароль должен содержать минимум 6 символов'),
        password2: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
            .required('Подтверждение пароля обязательно'),
        checkbox: Yup.boolean()
            .oneOf([true], 'Вы должны согласиться с условиями использования')
            .required('Вы должны согласиться с условиями использования'),
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >

        {({ isValid, dirty, values }) => (
            <Form className={styles.form}>
                <div className={styles.name}>
                    <div>
                        <div className ={styles.account}>
                            <Field placeholder='Имя' name="first_name" />
                        </div>
                        <ErrorMessage name="first_name" component="div" className={styles.errorMessage} />
                    </div>
                    
                    <div>
                        <div className ={styles.account}>
                            <Field placeholder='Фамилия' name="last_name" />
                        </div>
                        <ErrorMessage name="last_name" component="div" className={styles.errorMessage} />
                    </div>
                </div>

                <div>
                    <div className={styles.account}>
                        <Field name="email" placeholder='Почта' />
                    </div>
                    <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                </div>

                <div>
                    <div className={styles.password}>
                        <Field name="password" type="password" placeholder="Пароль" />
                    </div>
                    <ErrorMessage name="password" component="div" className={styles.errorMessage} />
                </div>
                
                <div>
                    <div className={styles.password}>
                        <Field name="password2" type="password" placeholder="Повторите пароль" />
                    </div>
                    <ErrorMessage name="password2" component="div" className={styles.errorMessage} />
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}
                    
                <div className ={styles.login}>
                    <button className={`${styles.btn} ${(!isValid || !dirty || !values.checkbox) ? styles.disabled : ''}`}
                            type="submit"
                            disabled={!isValid || !dirty || !values.checkbox}>
                    Зарегистрироваться
                    </button>
                </div>

                <div>
                    <ErrorMessage name="checkbox" component="div" className={styles.errorMessage} />
                    <div className={styles.agreement}>
                        <Field type="checkbox" name="checkbox"/> 
                        <p>
                            Регистрируясь, вы подтверждаете, что принимаете <a href="#">Пользовательское соглашение</a> и <a
                            href="#">Согласие</a> на обработку персональных данных.
                        </p>
                    </div>
                </div>
                
            </Form>
        )}
        </Formik>
    )
}
