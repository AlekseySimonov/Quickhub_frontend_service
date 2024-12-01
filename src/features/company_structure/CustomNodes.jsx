import { Handle, Position } from '@xyflow/react';
import styles from './nodes.module.css'
import { useState } from 'react';
import { icons } from '../../shared/ui/icons/companies';
import { useDispatch } from 'react-redux';
import { deleteDepartmentAPI } from '../../app/store/slices/companySlice';
import { Selector } from '../../shared/ui/components/selector';

export const DepartmentNode = ({ data }) => {
    const dispatch = useDispatch()
    const [openEmployeeIds, setOpenEmployeeIds] = useState(new Set())
    const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)

    const toggleEmployees = (id) => {
        const newOpenEmployeeIds = new Set(openEmployeeIds)
        if (newOpenEmployeeIds.has(id)) {
            newOpenEmployeeIds.delete(id)
        } else {
            newOpenEmployeeIds.add(id)
        }
        setOpenEmployeeIds(newOpenEmployeeIds)
    };

    const handleAddEmployee = (id) => {
        console.log(id)
        setIsAddEmployeeOpen(true)
    }

    const deleteEmployeeClick = (id) =>{
        console.log(id)
        // dispatch(deleteEmployeeAPI(id))
    }

    const deleteDepartmentClick = (id) =>{
        dispatch(deleteDepartmentAPI(id))
    }

    const employees = data.companyUsers || [];
    const users = Array.isArray(employees) && employees.length > 0 
    ? employees.map(employee => ({
        id: employee.id,
        title: `${employee.first_name} ${employee.last_name}`
    })) : []

    const [selectedItem, setSelectedItem] = useState({ title: '', id: '' })

    const handleAddEmployeeChange = (newSearchTerm) => {
        setSelectedItem(newSearchTerm);
    };

    return (
        <div className={styles.node}>
            <div className={styles.department}>
                <Handle type="source" position={Position.Bottom} id="source" style={{ opacity: 0 }} />
                {data.title && (
                    <div className={styles.label} style={{ backgroundColor: data.color }}>
                        <div className={styles.name}>
                            {data.title}
                        </div>
                        <img 
                        className={styles.deleteBtn} 
                        onClick={() => deleteDepartmentClick(data.id)} 
                        src={icons.deleteBtn} 
                        alt={'Delete'}
                        />
                    </div>
                )}

                {data.users && data.users.length > 0 && (
                    <div className={styles.head} style={{ backgroundColor: data.color }}>
                        <img className={styles.photo} src={data.photo} alt={data.users[0].fullName} />
                        <div className={styles.label__employee}>
                            <div className={styles.name}>
                                {data.users[0].fullName}
                            </div>
                            <div className={styles.position}>
                                {data.users[0].position}
                            </div>
                        </div>
                    </div>
                )}

                {data.title && Array.isArray(data.users) && data.users.length > 1 && (
                        <button
                        className={`${styles.dropdown} ${openEmployeeIds.has(data.id) ? styles.active : ''}`}
                        onClick={() => toggleEmployees(data.id)}
                        style={{ backgroundColor: data.color }}> 
                        Сотрудники
                        <div className={styles.arrow}></div>
                        </button> 
                )}
                {Array.isArray(data.users) && data.users.length > 1 && openEmployeeIds.has(data.id) &&(
                    <div className={styles.employees}>
                        <img 
                        src={icons.popupX} 
                        className={styles.closeBtn} 
                        alt="Close"
                        onClick={() => toggleEmployees(data.id)}
                        />
                            {data.users.slice(1).map(user => (
                                <div key={user.id} className={styles.employee} style={{ backgroundColor: data.color }}>
                                    <img 
                                    className={styles.photo} 
                                    src={data.photo} 
                                    alt={user.fullName} 
                                    />
                                    <div className={styles.label__employee}>
                                        <div className={styles.name}>
                                            {user.fullName}
                                        </div>
                                        <div className={styles.position}>
                                            {user.position}
                                        </div>
                                    </div>
                                    <img src={icons.deleteBtn} 
                                    className={styles.deleteBtn} 
                                    onClick={() => deleteEmployeeClick(user.id)} 
                                    />
                                </div>
                            ))}
                        <button className = {styles.addEmployeeBtn} onClick={() => handleAddEmployee(data.id)}>
                            <span className={styles.plus}>+</span>
                            Добавить сотрудника
                        </button>
                    </div>
                )}

                {isAddEmployeeOpen && (
                    <div className={styles.addEmployee}>
                        <div className={styles.addEmployeeTitle}>
                            Добавить сотрудника
                            <img 
                                src={icons.popupX} 
                                className={styles.closeBtn} 
                                onClick={() => setIsAddEmployeeOpen(false)}
                                alt ={'CloseBtn'}
                            />
                        </div>
                        <Selector
                            list = {users}
                            inputLabel = {'Выберите сотрудника'}
                            width= {'400px'}
                            onSelect={handleAddEmployeeChange}
                        />
                        <div className={styles.actions}>
                            <button onClick={handleAddEmployee} className={`${styles.btn} ${styles.btnSubmit}`}>Добавить</button>
                            <button onClick={() => setIsAddEmployeeOpen(false)} className={`${styles.btn} ${styles.btnCancel}`}>Отмена</button>
                        </div>
                    </div>
                )}
                <Handle type="target" position={Position.Top} id="target" style={{ opacity: 0 }} />
            </div>
        </div>
    )
}