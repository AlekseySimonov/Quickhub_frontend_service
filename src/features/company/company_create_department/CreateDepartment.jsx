import useOnclickOutside from "react-cool-onclickoutside";
import styles from "./styles.module.css"
import { icons } from '../../../shared/ui/icons/companies';
import { useSelector } from "react-redux";
import { Selector } from "../../../shared/ui/components/selector/index";
import { useState } from "react";

export const CreateDepartment = ({ onClose }) => {
    const departments = useSelector(state => state.company.departments)

    const ref = useOnclickOutside(() => {
        onClose()
    });

    const [addedEmployees, setAddedEmployees] = useState([])

    const [newEmployee, setNewEmployee] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleAddEmployee = () => {
        if (newEmployee && !addedEmployees.includes(newEmployee)) {
            setAddedEmployees([...addedEmployees, newEmployee])
            setNewEmployee('')
            setShowInput(false)
        }
    };
    
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
                                    {addedEmployees.map((employee, index) => (
                                        <div key={index} className={`${styles['added-item']} ${styles.employee}`}>
                                            <div className={styles.employee__avatar}></div>
                                            <div className={styles.employee__delete} onClick={() => {
                                                setAddedEmployees(addedEmployees.filter((_, i) => i !== index))
                                            }}>×</div>
                                            <div className={styles.employee__name}>{employee}</div>
                                        </div>
                                    ))}
                                </div>
                        
                        <div className={styles.addEmployee}>
                            <button className={styles.add} id="add-employee_btn" onClick={() => setShowInput(prev => !prev)}>
                                <span className={styles.plus}>+</span>
                                Добавить сотрудника
                            </button>
                            <div className={styles.showInput}>
                                {showInput ? (
                                <>
                                    <Selector
                                    list={departments}
                                    inputLabel={'Введите имя сотрудника'}
                                    label={''}
                                    onSelect={(value) => setNewEmployee(value)}
                                    />
                                    <button 
                                        type="button" 
                                        className={styles.btnAdd}
                                        onClick={handleAddEmployee}
                                    >
                                        Добавить
                                    </button>
                                </>
                                ): ''}
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