import styles from './styles.module.css';
import { icons } from '../../../shared/ui/icons/companies';
import { usePatchDepartmentMutation } from '../../../app/store/slices/companySlice';
import { useSelector } from 'react-redux';

export const DepartmentEmployeesList = ({ data, onToggle,  onAdd, color, photo }) => {

    const companyID = useSelector(state => state.company.companyID)
    const [deleteEmployee] = usePatchDepartmentMutation()

    const deleteEmployeeClick = async (email) =>{
        const updatedUsers = data.users
            .filter(user => user.email !== email)
            .map(user => ({ email: user.email }))
            console.log({ users: updatedUsers, "is_remove": true  })

        try {
            await deleteEmployee({ companyPk: companyID, id: data.id, body: { users: updatedUsers, "is_remove": true  } }).unwrap();
            console.log('Employee deleted successfully.');
        } catch (error) {
            console.error('Failed to delete employee:', error);
        }
    }
    
    if (!Array.isArray(data.users) || data.users.length <= 1) 
        return null;

    return (
        <div className={styles.employees}>
            <img 
                src={icons.popupX} 
                className={styles.closeBtn} 
                alt="Close"
                onClick={onToggle}
            />
            {data.users.slice(1).map((user,index) => (
                <div key={user.id || `employee-${index}`} className={styles.employee} style={{ backgroundColor: color }}>
                    <img 
                        className={styles.photo} 
                        src={photo}
                        alt={user.first_name} 
                    />
                    <div className={styles.label__employee}>
                        <div className={styles.name}>
                            {user.last_name + ' ' + user.first_name}
                        </div>
                        <div className={styles.position}>
                            {user.position}
                        </div>
                    </div>
                    <img 
                        src={icons.deleteBtn} 
                        className={styles.deleteBtn} 
                        onClick={() => deleteEmployeeClick(user.email, )}
                    />
                </div>
            ))}
            <button className={styles.addEmployeeBtn} onClick={onAdd}>
                <span className={styles.plus}>+</span>
                Добавить сотрудника
            </button>
        </div>
    );
};