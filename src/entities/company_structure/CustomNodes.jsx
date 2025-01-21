import { Handle, Position } from '@xyflow/react';
import styles from './nodes.module.css'
import { useState } from 'react';
import { icons } from '../../shared/ui/icons/companies';
import { useDeleteDepartmentMutation } from '../../app/store/slices/companySlice';
import { useSelector } from 'react-redux';
import { CompanyFeatures } from '../../features/company';
import { usePopup } from '../../shared/hooks';
import { ChangeDepartment } from '../../features/company/company_change/ChangeDepartment';
import Popup from 'reactjs-popup';

export const DepartmentNode = ({ data }) => {

    const { isVisible, openPopup, closePopup } = usePopup();
    const [openEmployeeIds, setOpenEmployeeIds] = useState(new Set())

    const companyID = useSelector(state => state.company.companyID)
    const [deleteDepartment] = useDeleteDepartmentMutation()

    const ownerUser = data.companyUsers?.find(user => user.email === data.owner)

    const toggleEmployees = (id) => {
        const newOpenEmployeeIds = new Set(openEmployeeIds)
        if (newOpenEmployeeIds.has(id)) {
            newOpenEmployeeIds.delete(id)
        } else {
            newOpenEmployeeIds.add(id)
        }
        setOpenEmployeeIds(newOpenEmployeeIds)
    };

    const handleAddEmployee = () => {
        openPopup()
    }

    const deleteDepartmentClick = async ({companyID, id}) => {
    try {
        await deleteDepartment({ companyPk: companyID, id }).unwrap();
    } catch (error) {
        alert('Failed to delete department:', error);
    }
    };

    return (
        <div className={styles.node}>
            <div className={styles.department}>
                <Handle type="source" position={Position.Bottom} id="source" style={{ opacity: 0 }} />
                {data.title && (
                    <>
                        <div className={styles.label} style={{ backgroundColor: data.color }}>
                            <div className={styles.name}>
                                {data.title}
                            </div>
                            <img 
                            className={styles.changeBtn} 
                            onClick={openPopup} 
                            src={icons.pencil}
                            alt={'Change'}
                            />
                            <img 
                            className={styles.deleteBtn} 
                            onClick={() => deleteDepartmentClick({companyID, id: data.id})} 
                            src={icons.deleteBtn}
                            alt={'Delete'}
                            />
                        </div>
                        <Popup open={isVisible} closeOnDocumentClick onClose={closePopup}>
                            <ChangeDepartment onClose={closePopup} departmentData={data}/>
                        </Popup>
                    </>
                    
                    
                )}

                

                {data.owner && ownerUser && (
                    <div className={styles.head} style={{ backgroundColor: data.color }}>
                        <img className={styles.photo} src={data.photo} alt={'photo'} />
                        <div className={styles.label__employee}>
                            <div className={styles.name}>
                                {ownerUser.last_name + " " + ownerUser.first_name}
                            </div>
                            <div className={styles.position}>
                                {ownerUser.position}
                            </div>
                        </div>
                    </div>
                )}

                {data.title && Array.isArray(data.users) && data.users.length > 0 && (
                        <button
                        className={`${styles.dropdown} ${openEmployeeIds.has(data.id) ? styles.active : ''}`}
                        onClick={() => toggleEmployees(data.id)}
                        style={{ backgroundColor: data.color }}> 
                        Сотрудники
                        <span>
                            (
                            {(data.companyUsers.filter(user =>
                                data.users.some(dataUser => dataUser.email === user.email) && user.email !== data.owner
                            )).length})
                        </span>
                        <div className={styles.arrow}></div>
                        </button> 
                )}

                {Array.isArray(data.users) && data.users.length > 0 && openEmployeeIds.has(data.id) &&(
                    <CompanyFeatures.DepartmentEmployeesList
                        data={data}
                        onToggle={() => toggleEmployees(data.id)}
                        onAdd={() => handleAddEmployee(data.id)}
                        color={data.color}
                        photo = {data.photo}
                    />
                )}

                <Handle type="target" position={Position.Top} id="target" style={{ opacity: 0 }} />
            </div>
        </div>
        
    )
}