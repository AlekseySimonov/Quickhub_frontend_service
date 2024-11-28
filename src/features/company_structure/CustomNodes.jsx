import { Handle, Position } from '@xyflow/react';
import styles from './nodes.module.css'
import { useState } from 'react';
import { icons } from '../../shared/ui/icons/companies';
import { useDispatch } from 'react-redux';
import { deleteDepartmentAPI } from '../../app/store/slices/companySlice';

export const DepartmentNode = ({ data }) => {
    const dispatch = useDispatch()
    const [openEmployeeIds, setOpenEmployeeIds] = useState(new Set())

    const toggleEmployees = (id) => {
        const newOpenEmployeeIds = new Set(openEmployeeIds)
        if (newOpenEmployeeIds.has(id)) {
            newOpenEmployeeIds.delete(id)
        } else {
            newOpenEmployeeIds.add(id)
        }
        setOpenEmployeeIds(newOpenEmployeeIds)
    };

    const handleAddEmployee = (id) =>{
        console.log(id)
    }

    const deleteClick = (id) =>{
        dispatch(deleteDepartmentAPI(id))
    }

    return (
        <div className={styles.node}>
            <div className={styles.department}>
                <Handle type="source" position={Position.Bottom} id="source" style={{ opacity: 0 }} />
                {data.title && (
                    <div className={styles.label} style={{ backgroundColor: data.color }}>
                        <div className={styles.name}>
                            {data.title}
                        </div>
                        <button className={styles.deleteBtn} onClick={() => deleteClick(data.id)}>
                            <img src={icons.deleteBtn} />
                        </button>
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

                {data.title && data.users.length > 1 && (
                        <button
                        className={`${styles.dropdown} ${openEmployeeIds.has(data.id) ? styles.active : ''}`}
                        onClick={() => toggleEmployees(data.id)}
                        style={{ backgroundColor: data.color }}> 
                        Сотрудники
                        <div className={styles.arrow}></div>
                        </button> 
                )}
                {data.users && data.users.length > 1 && openEmployeeIds.has(data.id) &&(
                    <div className={styles.employees}>
                        <img 
                        src={icons.popupX} 
                        className={styles.closeBtn} 
                        onClick={() => toggleEmployees(data.id)}
                        />
                            {data.users.map(user => (
                                <div key={user.id} className={styles.employee} style={{ backgroundColor: data.color }}>
                                    <img className={styles.photo} src={data.photo} alt={user.fullName} />
                                    <div className={styles.label__employee}>
                                        <div className={styles.name}>
                                            {user.fullName}
                                        </div>
                                        <div className={styles.position}>
                                            {user.position}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        <button className = {styles.addEmployee} onClick={() => handleAddEmployee(data.id)}>
                            <span className={styles.plus}>+</span>
                            Добавить сотрудника
                        </button>
                    </div>
                )}
                <Handle type="target" position={Position.Top} id="target" style={{ opacity: 0 }} />
            </div>
        </div>
        
    )
}