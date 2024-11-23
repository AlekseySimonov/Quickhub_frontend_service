import useOnclickOutside from "react-cool-onclickoutside";
import styles from "./styles.module.css"
import { icons } from '../../shared/ui/icons/companies';

export const CreateDepartment = ({ onClose }) => {

    const ref = useOnclickOutside(() => {
    onClose()
    });
    
    return (
    <div className={styles['outer']}>
        <div ref = {ref} className={styles['pop-up']}>
        <div className={styles['header']}>
            <div className={styles.container}>
            <div className={styles['title']}>Добавить подразделение</div>
            <div className={styles['closeBtn']} onClick={onClose}>
                <img src={icons.popupX} />
            </div>
            </div>
        </div>
        <div className={styles['content']}>
            <div className={styles.container}>
            <div className={styles['form']}>
                <div className={styles['row']}>
                <div className={styles['label']}>Название подразделения</div>
                <input placeholder="Введите название подразделения" type="text" className={styles['input']} />
                </div>
                <div className={styles['row']}>
                <div className={styles['label']}>Вышестоящее подразделение</div>
                <div className={styles['select']}>Выберите подразделение</div>
                </div>
                <div className={styles['row']}>
                <div className={styles['label']}>Руководитель</div>
                <div className={styles['select']}>Выберите руководителя</div>
                </div>
                <div className={styles['row']}>
                <div className={styles['label']}>Сотрудники</div>
                <div className={styles['added-list']}>
                    {["Якушев Илья", "Михайлов Максим", "Куцев Алексей", "Куцев Алексей", "Куцев Алексей"].map((employee, index) => (
                    <div key={index} className={`${styles['added-item']} ${styles.employee}`}>
                        <div className={styles.employee__avatar}></div>
                        <div className={styles.employee__name}>{employee}</div>
                        <div className={styles.employee__delete}>×</div>
                    </div>
                    ))}
                </div>
                <div className={styles['add']} id="add-employee_btn">
                    <span className={styles['add-toggle']}>Добавить сотрудника</span>
                    <div className={styles['add-inner']}>
                    <form method="GET">
                        <input
                            className={styles['input']}
                            name="employee_email"
                            placeholder="Укажите почту сотрудника"
                            type="email"
                            required
                        />
                        <button type="submit" className={styles['btn']}>Добавить</button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            <div className={styles['actions']}>
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
    </div>
);
}