import styles from "./styles.module.css";
import { Selector } from "../../../shared/ui/components/selector";
import { icons } from "../../../shared/ui/icons/companies";
import { useState } from "react";
import { useGetUsersCompanyQuery, usePatchDepartmentMutation } from "../../../app/store/slices/companySlice";
import { useSelector } from "react-redux";

export const AddDepartmentEmployee = ({ isOpen, onClose, data }) => {

    const companyID = useSelector(state => state.company.companyID)

    const {data: users = []} = useGetUsersCompanyQuery(companyID)
    const [patchEmployee] = usePatchDepartmentMutation()
    
    const handleAddEmployee = async (newEmail) =>{
        const updatedUsers = data.users.map(user => ({ email: user.email }))
        updatedUsers.push({ email: newEmail })
            console.log(updatedUsers)

            try {
                await patchEmployee({ companyPk: companyID, id: data.id, body: { users: updatedUsers  }  }).unwrap();
                console.log('Employee added successfully.');
                console.log({ users: updatedUsers  })
            } catch (error) {
                console.error('Failed to add employee:', error);
            }
    }

    const [addEmployee, setAddEmployee] = useState('')

    if (!isOpen) return null;
    return (
        <div className={styles.addEmployee}>
            <div className={styles.addEmployeeTitle}>
                Добавить сотрудника
                <img 
                    src={icons.popupX} 
                    className={styles.closeBtn} 
                    onClick={onClose}
                    alt={'CloseBtn'}
                />
            </div>
            <Selector
                list={users.map((item) => ({
                    id: item.email,
                    title: item.first_name + " " + item.last_name,
                    email: item.email
                }))}
                inputLabel={'Выберите сотрудника'}
                width={'400px'}
                onSelect={selectedUser => setAddEmployee(selectedUser)}
            />
            <div className={styles.actions}>
                <button onClick={() => handleAddEmployee(addEmployee.email)} className={`${styles.btn} ${styles.btnSubmit}`}>Добавить</button>
                <button onClick={onClose} className={`${styles.btn} ${styles.btnCancel}`}>Отмена</button>
            </div>
        </div>
    );
};
