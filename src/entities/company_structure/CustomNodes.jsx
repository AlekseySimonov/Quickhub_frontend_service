import { Handle, Position } from '@xyflow/react';
import styles from './nodes.module.css'
import { useState } from 'react';
import { icons } from '../../shared/ui/icons/companies';
import { useDeleteDepartmentMutation } from '../../app/store/slices/companySlice';
import { useSelector } from 'react-redux';
import { CompanyFeatures } from '../../features/company';

export const DepartmentNode = ({ data }) => {
    const [openEmployeeIds, setOpenEmployeeIds] = useState(new Set())
    const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)

    const companyID = useSelector(state => state.company.companyID)
    const [deleteDepartment] = useDeleteDepartmentMutation()

    const toggleEmployees = (id) => {
        const newOpenEmployeeIds = new Set(openEmployeeIds)
        if (newOpenEmployeeIds.has(id)) {
            newOpenEmployeeIds.delete(id)
            setIsAddEmployeeOpen(false)
        } else {
            newOpenEmployeeIds.add(id)
        }
        setOpenEmployeeIds(newOpenEmployeeIds)
    };

    const handleAddEmployee = (id) => {
        console.log(id)
        setIsAddEmployeeOpen(true)
    }

    const deleteDepartmentClick = async ({companyID, id}) => {
    try {
        await deleteDepartment({ companyPk: companyID, id }).unwrap();
        console.log('Department deleted successfully.');
    } catch (error) {
        console.error('Failed to delete department:', error);
    }
    };

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
                        onClick={() => deleteDepartmentClick({companyID, id: data.id})} 
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
                                {data.users[0].first_name + ' ' + data.users[0].last_name}
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
                    <CompanyFeatures.DepartmentEmployeesList
                        data={data}
                        onToggle={() => toggleEmployees(data.id)}
                        onAdd={() => handleAddEmployee(data.id)}
                        color={data.color}
                        photo = {data.photo}
                    />
                )}

                {isAddEmployeeOpen && (
                    <CompanyFeatures.AddDepartmentEmployee
                        data={data}
                        isOpen={isAddEmployeeOpen}
                        onClose={() => setIsAddEmployeeOpen(false)}
                        onSelect={handleAddEmployeeChange}
                        onAdd={handleAddEmployee}
                    />
                )}
                <Handle type="target" position={Position.Top} id="target" style={{ opacity: 0 }} />
            </div>
        </div>
    )
}