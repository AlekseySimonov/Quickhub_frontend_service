import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import { Selector } from "../../../shared/ui/components/selector/index";
import { useState } from "react";
import {useGetDepartmentsQuery, useGetUsersCompanyQuery, usePatchDepartmentMutation } from "../../../app/store/slices/companySlice";
import { GenericPopup } from "../../../shared/ui/components";

export const ChangeDepartment = ({ onClose, departmentData }) => {
    const companyID = useSelector(state => state.company.companyID)

    const { data: users = [] } = useGetUsersCompanyQuery(companyID)
    const { data: departments = [] } = useGetDepartmentsQuery(companyID)
    const [patchDepartment] = usePatchDepartmentMutation()

    const [departmentName, setDepartmentName] = useState(departmentData.title)
    const [addedDepartment, setAddedDepartment] = useState(departmentData.parent)
    const [owner, setOwner] = useState('')

    const usersList = users.map((item) => ({
        id: item.id,
        title: item.last_name + " " + item.first_name,
        email: item.email
    }))

    const [employees, setEmployees] = useState(
        (usersList.filter(item => item.email !== departmentData.owner ) && 
        usersList.filter(user => departmentData.users.some(employee => employee.email === user.email))) ||
        []);
    
    const [showInput, setShowInput] = useState(false);
    const [newEmployee, setNewEmployee] = useState('')

    const handleAddEmployee = () => {
        if (newEmployee && !employees.includes(newEmployee)) {
            setEmployees([...employees, newEmployee])
            setNewEmployee('')
            setShowInput(false)
        }
    };

        const handlePatchDepartment = async () => {
        if (departmentName === departmentData.title && 
            owner === departmentData.owner && 
            employees === departmentData.users && 
            departmentName === departmentData.title
            ) {
                alert("Изменения не были сделаны");
                return;
            }

        const body = {
            company: companyID,
            title: departmentName,
            parent: addedDepartment?.id,
            "is_remove": false,
            users: employees.map(emp => ({ email: emp.email })),
            owner: owner.email,
        };

        try {
            await patchDepartment({ companyPk: companyID, id: departmentData.id, body: body }).unwrap();
            onClose();
        } catch (error) {
            alert("Ошибка создания отдела:", error);
        }
    };
    
    return (
        <>
        <GenericPopup
        onClose = {onClose}
        title={`Изменить ${departmentData.title}`}
        >
            <div className={styles.row}>
                <div className={styles.label}>Название подразделения</div>
                <input 
                placeholder="Введите название отдела" 
                type="text" 
                className={styles.input} 
                value={departmentName}
                onChange={event => setDepartmentName(event.target.value)}
                />
            </div>
            <Selector
                list={departments}
                label={'Вышестоящий отдел'}
                inputLabel={'Выберите отдел'}
                initialSearchTerm={departments.find(item => item.id === departmentData.parent)}
                onSelect={item => setAddedDepartment(item)}
            />
            <Selector
                list={usersList}
                initialSearchTerm={usersList.find(item => item.email === departmentData.owner)}
                label={'Руководитель'}
                inputLabel={'Выберите руководителя'}
                onSelect={item => {
                    setOwner(item)
                    setEmployees(prevEmployees => 
                        prevEmployees.filter(employee => employee.email !== item.email)
                    );
                }}
            />

                <div className={styles.row}>
                    <div className={styles.label}>Сотрудники</div>
                    {Array.isArray(employees) && employees.length > 0 &&(
                        <div className={styles[`added-list`]}>
                            {employees.map((employee, index) => (
                                <div key={index} className={`${styles['added-item']} ${styles.employee}`}>
                                    <div className={styles.employee__avatar}></div>
                                    <div
                                        className={styles.employee__delete}
                                        onClick={() => {
                                            setEmployees(employees.filter((_, i) => i !== index));
                                        }}
                                    >
                                        ×
                                    </div>
                                    <div className={styles.employee__name}>{employee.title}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    

                    <div className={styles.addEmployee}>
                        <button className={styles.add} id="add-employee_btn" onClick={() => setShowInput(prev => !prev)}>
                            <span className={styles.plus}>+</span>
                            Добавить сотрудника
                        </button>
                        <div className={styles.showInput}>
                            {showInput ? (
                            <>
                                <Selector
                                list={
                                    usersList.filter(user => 
                                        !employees.some(employee => employee.id === user.id) && 
                                        user.email !== departmentData.owner 
                                )}
                                inputLabel={'Введите имя сотрудника'}
                                onSelect={value => setNewEmployee(value)}
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
                    <button type="button" className={`${styles['btn']} ${styles['btn-submit']}`} onClick={handlePatchDepartment}>
                        Сохранить
                    </button>
                    <button type="button" className={`${styles['btn']} ${styles['btn-cancel']}`} onClick={onClose}>
                        Отменить
                    </button>
                </div>
            </div>
        </GenericPopup>
            
        </>
        
    )
}