import { Handle, Position } from '@xyflow/react';
import styles from './nodes.module.css'
import { useState } from 'react';

export const DepartmentNode = ({ data }) => {
    const [openEmployeeIds, setOpenEmployeeIds] = useState(new Set())

    const toggleEmployees = (id) => {
        const newOpenEmployeeIds = new Set(openEmployeeIds);
        if (newOpenEmployeeIds.has(id)) {
            newOpenEmployeeIds.delete(id)
        } else {
            newOpenEmployeeIds.add(id)
        }
        setOpenEmployeeIds(newOpenEmployeeIds)
    };

    return (
        <div className={styles.node}>
            <div className={styles.department}>
                <Handle type="source" position={Position.Bottom} id="source" style={{ opacity: 0 }} />
                {data.title && (
                    <div className={styles.label}>
                        <div className={styles.name}>
                            {data.title}
                        </div>
                    </div>
                )}

                {data.users && data.users.length > 0 && (
                    <div className={styles.head}>
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

                {data.title && data.users.length > 0 && (
                        <button
                        className={styles.dropdown}
                        onClick={() => toggleEmployees(data.id)}> 
                        Сотрудники
                        </button> 
                )}
                
                {data.users && data.users.length > 0 && openEmployeeIds.has(data.id) &&(
                    <div className={styles.employees}>
                        {data.users.map(user => (
                            <div key={user.id} className={styles.employee}>
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
                    </div>
                )}
                <Handle type="target" position={Position.Top} id="target" style={{ opacity: 0 }} />
            </div>
        </div>
        
    )
}