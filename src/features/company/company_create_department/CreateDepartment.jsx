import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import { Selector } from "../../../shared/ui/components/selector/index";
import { useState } from "react";
import { GenericPopup } from './../../../shared/ui/components/GenericPopup/';
import { useGetDepartmentsQuery, useGetUsersCompanyQuery, usePostDepartmentMutation } from "../../../app/store/slices/companySlice";

export const CreateDepartment = ({ onClose }) => {
    const companyID = useSelector(state => state.company.companyID)

    const { data: users = [] } = useGetUsersCompanyQuery(companyID)
    const { data: departments = [] } = useGetDepartmentsQuery(companyID)

    const [postDepartment] = usePostDepartmentMutation()

    const [departmentName, setDepartmentName] = useState("")
    const [addedDepartment, setAddedDepartment] = useState(null)
    const [addedSupervisor, setAddedSupervisor] = useState(null)
    const [addedEmployees, setAddedEmployees] = useState([])

    const [newEmployee, setNewEmployee] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleCreateDepartment = async () => {
        if (!departmentName) {
            alert("Введите название отдела");
            return;
        }

        const body = {
            company: companyID,
            title: departmentName,
            parent: addedDepartment?.id || '',
            users: addedEmployees.map(emp => ({ email: emp.email })),
        };

        try {
            await postDepartment({ companyPk: companyID, body }).unwrap();
            onClose();
        } catch (error) {
            console.error("Ошибка создания отдела:", error);
        }
    };

    const handleAddEmployee = () => {
        if (newEmployee && !addedEmployees.includes(newEmployee)) {
            setAddedEmployees([...addedEmployees, newEmployee])
            setNewEmployee('')
            setShowInput(false)
        }
    };

    const departmentSelect = (item) => {
        setAddedDepartment(item);
    };

    const supervisorSelect = (item) => {
        setAddedSupervisor(item);
    };
    
    return (
        <GenericPopup
        onClose ={onClose}
        title = 'Добавить отдел'
        >
                <div className={styles.row}>
                    <div className={styles.label}>Название подразделения</div>
                    <input 
                    placeholder="Введите название отдела" 
                    type="text" 
                    className={styles.input} 
                    onChange={event => setDepartmentName(event.target.value)}
                    />
                </div>
                <Selector
                    list={departments}
                    label={'Вышестоящий отдел'}
                    inputLabel={'Выберите отдел'}
                    onSelect={departmentSelect}
                />
                <Selector
                    list={users.map((item) => ({
                        id: item.id,
                        title: item.first_name + " " + item.last_name,
                        email: item.email
                    }))}
                    label={'Руководитель'}
                    inputLabel={'Выберите руководителя'}
                    onSelect={supervisorSelect}
                />

                    <div className={styles.row}>
                        <div className={styles.label}>Сотрудники</div>
                            {addedEmployees.map((employee, index) => (
                                <div key={index} className={`${styles['added-item']} ${styles.employee}`}>
                                    <div className={styles.employee__avatar}></div>
                                    <div
                                        className={styles.employee__delete}
                                        onClick={() => {
                                            setAddedEmployees(addedEmployees.filter((_, i) => i !== index));
                                        }}
                                    >
                                        ×
                                    </div>
                                    <div className={styles.employee__name}>{employee.title}</div>
                                </div>
                            ))}

                        <div className={styles.addEmployee}>
                            <button className={styles.add} id="add-employee_btn" onClick={() => setShowInput(prev => !prev)}>
                                <span className={styles.plus}>+</span>
                                Добавить сотрудника
                            </button>
                            <div className={styles.showInput}>
                                {showInput ? (
                                <>
                                    <Selector
                                    list={users.map((item) => ({
                                        id: item.email,
                                        title: item.first_name + " " + item.last_name,
                                        email: item.email
                                    }))}
                                    inputLabel={'Введите имя сотрудника'}
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
                    <button type="button" className={`${styles['btn']} ${styles['btn-submit']}`} onClick={handleCreateDepartment}>
                        Сохранить
                    </button>
                    <button type="button" className={`${styles['btn']} ${styles['btn-cancel']}`} onClick={onClose}>
                        Отменить
                    </button>
                </div>
            </div>
        </GenericPopup>

    )
}