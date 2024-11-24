import useOnclickOutside from "react-cool-onclickoutside";
import styles from "./styles.module.css"
import { icons } from '../../shared/ui/icons/companies';
import { useSelector } from "react-redux";
import { Selector } from "../../shared/ui/components/selector/index";
import { useState } from "react";

export const CreateDepartment = ({ onClose }) => {
    const departments = useSelector(state => state.company.departments)

    const ref = useOnclickOutside(() => {
        onClose()
    });

    const [newEmployee, setNewEmployee] = useState('');
    const [showInput, setShowInput] = useState(false);
    
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
                <Selector
                    list={departments}
                    label={'Вышестоящее подразделение'}
                    inputLabel={'Выберите подразделение'}
                />
                <Selector
                    list={departments}
                    label={'Руководитель'}
                    inputLabel={'Выберите руководителя'}
                />

                    <div className={styles.row}>
                        <div className={styles.label}>Сотрудники</div>
                        <div className={styles['added-list']}>
                            {["Якушев Илья", "Михайлов Максим", "Куцев Алексей", "Куцев Алексей", "Куцев Алексей"].map((employee, index) => (
                                <div key={index} className={`${styles['added-item']} ${styles.employee}`}>
                                    <div className={styles.employee__avatar}></div>
                                    <div className={styles.employee__name}>{employee}</div>
                                    <div className={styles.employee__delete}>×</div>
                                </div>
                            ))}
                        </div>
                        
                        <div className={styles.addEmployee}>
                            <button className={styles.add} id="add-employee_btn" onClick={() => setShowInput(true)}>
                                <span className={styles.plus}>+</span>
                                Добавить сотрудника
                            </button>
                            {showInput ? (
                                <>
                                    <Selector
                                    list={departments}
                                    inputLabel={'Введите имя сотрудника'}
                                    label={''}
                                    />
                                    <button 
                                        type="button" 
                                        className={styles.btnAdd}
                                    >
                                        Добавить
                                    </button>
                                </>
                                ): ''}
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