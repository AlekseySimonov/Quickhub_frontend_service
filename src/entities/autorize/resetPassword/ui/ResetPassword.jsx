import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';

export const ResetPassword = () =>{
    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Некорректный Email')
            .required('Email обязателен'),
    })

    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        // dispatch(loginAPI({ email: values.email}));
    }

    return(
        
        <>
        <div className={styles.h1}>Восстановление пароля</div>
        <div className= {styles.back}>
            <Link to="/auth/login" >Вернуться обратно</Link>
        </div> 
        <div className ={styles.reset}>
            <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
            >
            {({ isValid, dirty}) => (
                <Form className={styles.form}>
                    <div>
                        <div className={styles.account}>
                            <Field
                                name="email"
                                placeholder="Введите Email"
                            />
                        </div>
                        <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                    </div>
                    <button 
                        type="submit" 
                        className={`${styles.btn} ${(!isValid || !dirty) ? styles.disabled : ''}`}
                        disabled={!isValid || !dirty}
                        >
                        Восстановить
                    </button>
                </Form>
            )}
            </Formik>
        </div>
        </>
    )
}