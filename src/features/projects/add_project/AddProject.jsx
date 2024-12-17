
import { GenericPopup } from './../../../shared/ui/components/GenericPopup';
import styles from "./styles.module.css"
import { Selector } from './../../../shared/ui/components/selector';
import { useGetUsersCompanyQuery } from '../../../app/store/slices/companySlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { usePostProjectMutation } from '../../../app/store/slices/projectsSlice';

export const AddProject = ({onClose}) => {
    const companyID = useSelector(state => state.company.companyID)
    const {data: users = []} = useGetUsersCompanyQuery(companyID)
    const [postProject] = usePostProjectMutation()

    const [showDescriptionInput, setShowDescriptionInput] = useState(false);
    const [addedEmployees, setAddedEmployees] = useState([])
    const [newEmployee, setNewEmployee] = useState('');
    const [ShowAddEmployeeInput, setShowAddEmployeeInput] = useState(false);
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('')

    const handleAddEmployee = () => {
        if (newEmployee && !addedEmployees.includes(newEmployee)) {
            setAddedEmployees([...addedEmployees, newEmployee])
            setNewEmployee('')
            setShowAddEmployeeInput(false)
        }
    };

    const handleAddProject = async () =>{
        try {
            const users = addedEmployees.map(user => ({ email: user.email }))
            console.log({
                    company: companyID,
                    title: projectTitle,
                    description: projectDescription,
                    users,
                    is_remove: false
                })
            const response = await postProject({
                companyPk: companyID,
                body: {
                    company: companyID,
                    title: projectTitle,
                    description: projectDescription,
                    users,
                    is_remove: false
                }
            }).unwrap(); 
            console.log('Проект успешно добавлен:', response);
            onClose();
        } catch (error) {
            console.error('Ошибка при добавлении проекта:', error);
        }
    }

    return (
        <GenericPopup
            onClose= {onClose}
            title = {'Добавить проект'}
        >
            <div className={styles.row}>
                <div className={styles.label}>Название проекта</div>
                <input 
                    placeholder="Введите название проекта" 
                    type="text" 
                    className={styles.input} 
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    />
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
                        <textarea 
                            className = {styles.input}
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            ></textarea>
                    </>
                    
            )}
            </div>
            <Selector
                list={users.map((item) => ({
                            id: item.email,
                            title: item.first_name + " " + item.last_name,
                            email: item.email
                        }))}
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
                        list={users.map((item) => ({
                            id: item.email,
                            title: item.first_name + " " + item.last_name,
                            email: item.email
                        }))}
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
                <button type="button" className={`${styles.btn} ${styles['btn-submit']}`} onClick={handleAddProject}>
                    Сохранить
                </button>
                <button type="button" className={`${styles.btn} ${styles['btn-cancel']}`} onClick={onClose}>
                    Отменить
                </button>
            </div>
        </GenericPopup>
    )
}
