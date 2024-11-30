import useOnclickOutside from "react-cool-onclickoutside";
import styles from "./styles.module.css";
import { icons } from '../../icons/companies/index';

export const GenericPopup = ({ onClose, title, children }) => {
    const ref = useOnclickOutside(() => {
        onClose();
    });

    return (
        <div className={styles.outer}>
            <div ref={ref} className={styles.popUp}>
                <div className={styles.header}>
                    <div className={styles.container}>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.closeBtn} onClick={onClose}>
                            <img src={icons.popupX} alt="Закрыть" />
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};