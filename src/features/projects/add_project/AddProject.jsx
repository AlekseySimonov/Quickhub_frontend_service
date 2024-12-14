
import { GenericPopup } from './../../../shared/ui/components/GenericPopup';
import styles from "./styles.module.css"
import { Selector } from './../../../shared/ui/components/selector';
import { useGetUsersCompanyQuery } from '../../../app/store/slices/companySlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const AddProject = ({onClose}) => {
    const companyID = useSelector(state => state.company.companyID)
    const {data =[]} = useGetUsersCompanyQuery(companyID)

    const [showDescriptionInput, setShowDescriptionInput] = useState(false);
    const [addedEmployees, setAddedEmployees] = useState([])
    const [newEmployee, setNewEmployee] = useState('');
    const [ShowAddEmployeeInput, setShowAddEmployeeInput] = useState(false);

    const handleAddEmployee = () => {
        if (newEmployee && !addedEmployees.includes(newEmployee)) {
            setAddedEmployees([...addedEmployees, newEmployee])
            setNewEmployee('')
            setShowAddEmployeeInput(false)
        }
    };

    return (
        <GenericPopup
            onClose= {onClose}
            title = {'Добавить проект'}
        >
            <div className={styles.row}>
                <div className={styles.label}>Название проекта</div>
                <input placeholder="Введите название проекта" type="text" className={styles.input} />
            </div>
            <div className={styles.description}>
                <button 
                className = {styles.descriptionBtn}  
                onClick={() => setShowDescriptionInput(prev => !prev)}>
                Добавить описание
                </button>
                {showDescriptionInput && (
                    <>
                        <div className={styles.label}>Описание проекта</div>
                        <textarea className = {styles.input}></textarea>
                    </>
                    
            )}
            </div>
            <Selector
                list={data}
                label={'Выбрать руководителя'}
                inputLabel={'Выберите руководителя'}
            />

            <div className={styles.addEmployee}>
                <button className={styles.add} id="add-employee_btn" onClick={() => !setShowAddEmployeeInput(prev => !prev)}>
                    <span className={styles.plus}>+</span>
                    Добавить сотрудника
                </button>
                <div className={styles.showInput}>
                    {ShowAddEmployeeInput ? (
                    <>
                        <Selector
                        list={data}
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

            <div className={styles.actions}>
                <button type="button" className={`${styles.btn} ${styles['btn-submit']}`}>
                    Сохранить
                </button>
                <button type="button" className={`${styles.btn} ${styles['btn-cancel']}`} onClick={onClose}>
                    Отменить
                </button>
            </div>
        </GenericPopup>
    )
}
