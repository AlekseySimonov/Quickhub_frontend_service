import { useState } from 'react';
import styles from './styles.module.css'
import { Selector } from '../selector';

export const EmployeesList = ({ employees, onRemove }) => (
	<div className={styles.row}>
		<div className={styles.label}>Сотрудники</div>
		{Array.isArray(employees) && employees.length > 0 && (
			<div className={styles[`added-list`]}>
				{employees.map((employee, index) => (
					<div key={index} className={`${styles['added-item']} ${styles.employee}`}>
						<div className={styles.employee__avatar}></div>
						<div
							className={styles.employee__delete}
							onClick={() => onRemove(index)}
						>
							×
						</div>
						<div className={styles.employee__name}>{employee.last_name + ' ' + employee.first_name}</div>
					</div>
				))}
			</div>
		)}
	</div>
);

export const AddEmployee = ({ usersList, employees, ownerEmail, onAdd }) => {
	const [showInput, setShowInput] = useState(false);
	const [newEmployee, setNewEmployee] = useState("");

	const handleAddEmployee = () => {
		if (newEmployee && !employees.includes(newEmployee)) {
			onAdd(newEmployee);
			setNewEmployee("");
			setShowInput(false);
		}
	};

	return (
		<div className={styles.addEmployee}>
			<button className={styles.add} id="add-employee_btn" onClick={() => setShowInput(prev => !prev)}>
				<span className={styles.plus}>+</span>
				Добавить сотрудника
			</button>
			{showInput && (
				<div className={styles.showInput}>
					<Selector
						list={
							usersList.filter(user =>
								!employees.some(employee => employee.id === user.id) &&
								user.email !== ownerEmail
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
				</div>
			)}
		</div>
	);
};
