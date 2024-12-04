import useOnclickOutside from "react-cool-onclickoutside";
import { icons } from '../../icons/companies/index';

export const GenericPopup = ({ onClose, title, children, styles }) => {
    const ref = useOnclickOutside(() => {
        onClose();
    });

    return (
        <div data-testid="popup" className={styles.outer}>
            <div ref={ref} className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.container}>
                        <div data-testid="popup_title" className={styles.title}>{title}</div>
                        <div data-testid="popup_close" className={styles.closeBtn} onClick={onClose}>
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