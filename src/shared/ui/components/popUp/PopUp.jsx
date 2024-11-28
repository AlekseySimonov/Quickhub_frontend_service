import useOnclickOutside from "react-cool-onclickoutside";
import styles from "./styles.module.css"
import { icons } from '../../shared/ui/icons/companies';
import { useState } from "react";

export const CreateDepartment = ({ onClose, data }) => {

    const ref = useOnclickOutside(() => {
        onClose()
    });

    const [visible, setvisible] = useState(false)

    const handleClosePopUp = () => {
    setvisible(false);
    };
    
    return (
    <div className={styles.outer}>
        <div ref = {ref} className={styles.popUp}>
        <div className={styles.header}>
            <div className={styles.container}>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.closeBtn} onClick={onClose}>
                <img src={icons.popupX} />
            </div>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.actions}>
                <button type="button" className={`${styles['btn']} ${styles['btn-submit']}`}>
                    Сохранить
                </button>
                <button type="button" className={`${styles['btn']} ${styles['btn-cancel']}`} onClick={onClose}>
                    Отменить
                </button>
            </div>
            </div>
        </div>
    </div>
);
}