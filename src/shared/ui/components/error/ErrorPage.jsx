import { useNavigate } from "react-router-dom";
import styles from "./error.module.css"

export const ErrorPage = () => {

    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate('/companies')
    };
    return (
        <div className={styles.oopss}>
            <div className={styles.errorText}>
                <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404" />
                <span>404 PAGE</span>
                <p className={styles.pA}>. The page you were looking for could not be found</p>
                <p className={styles.pB}>... Back home</p>
                <button href="#" onClick = {handleBackClick} className={styles.back}>Back Home</button>
            </div>
        </div>
    );
}
