import styles from "./styles.module.css"
import { useSelector } from "react-redux";
import { Selector } from "../../../shared/ui/components/selector/index";
import { useState } from "react";
import { useGetDepartmentsQuery, useGetUsersCompanyQuery, usePatchDepartmentMutation } from "../../../app/store/slices/companySlice";
import { GenericPopup } from "../../../shared/ui/components";
import { AddEmployee, EmployeesList } from "../../../shared/ui/components/employees_list";

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
        (usersList.filter(item => item.email !== departmentData.owner) &&
            usersList.filter(user => departmentData.users.some(employee => employee.email === user.email))) ||
        []);

    const handlePatchDepartment = async () => {
        if (departmentName === departmentData.title &&
            owner === departmentData.owner &&
            employees === departmentData.users
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
            alert("Ошибка изменения отдела:", error);
        }
    };

    return (
        <>
            <GenericPopup
                onClose={onClose}
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

                <EmployeesList employees={employees} onRemove={index => setEmployees(employees.filter((_, i) => i !== index))} />
                <AddEmployee
                    usersList={usersList}
                    employees={employees}
                    ownerEmail={departmentData.owner}
                    onAdd={newEmployee => setEmployees([...employees, newEmployee])}
                />
                <div className={styles.actions}>
                    <button type="button" className={`${styles['btn']} ${styles['btn-submit']}`} onClick={handlePatchDepartment}>
                        Сохранить
                    </button>
                    <button type="button" className={`${styles['btn']} ${styles['btn-cancel']}`} onClick={onClose}>
                        Отменить
                    </button>
                </div>
            </GenericPopup>

        </>

    )
}