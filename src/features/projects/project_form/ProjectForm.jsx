import { useState } from 'react';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { useGetUsersCompanyQuery } from '../../../app/store/slices/companySlice';
import { GenericPopup, Selector } from '../../../shared/ui/components';
import { AddEmployee, EmployeesList } from '../../../shared/ui/components/employees_list';

export const ProjectForm = ({
	title,
	onClose,
	onSubmit,
	projectData = {},
}) => {
	const companyID = useSelector((state) => state.company.companyID);
	const { data: users = [] } = useGetUsersCompanyQuery(companyID);

	const [projectTitle, setProjectTitle] = useState(projectData.title || '');
	const [projectDescription, setProjectDescription] = useState(projectData.description || '');
	const [owner, setOwner] = useState(
		users.find((user) => user.email === projectData.owner) || ''
	);
	const [employees, setEmployees] = useState(
		users.filter((user) => projectData.users?.some((emp) => emp.email === user.email)) || []
	);
	const [showDescriptionInput, setShowDescriptionInput] = useState(!!projectData.description);

	const usersList = users.map((user) => ({
		id: user.id,
		title: `${user.last_name} ${user.first_name}`,
		email: user.email,
	}));

	const handleSubmit = async () => {
		const payload = {
			company: companyID,
			title: projectTitle,
			description: projectDescription,
			owner: owner.email,
			users: employees.map((emp) => ({ email: emp.email })),
			is_remove: false,
		};

		try {
			await onSubmit(payload);
			onClose();
		} catch (error) {
			console.error('Ошибка при сохранении проекта:', error);
		}
	};

	return (
		<GenericPopup onClose={onClose} title={title}>
			<div className={styles.row}>
				<div className={styles.label}>Название проекта</div>
				<input
					placeholder="Введите название проекта"
					type="text"
					className={styles.input}
					value={projectTitle}
					onChange={(e) => setProjectTitle(e.target.value)}
				/>
			</div>

			<div className={styles.description}>
				<button
					className={styles.descriptionBtn}
					onClick={() => setShowDescriptionInput((prev) => !prev)}
				>
					{showDescriptionInput ? 'Скрыть описание' : 'Добавить описание'}
				</button>
				{showDescriptionInput && (
					<>
						<div className={styles.label}>Описание проекта</div>
						<textarea
							className={styles.input}
							value={projectDescription}
							onChange={(e) => setProjectDescription(e.target.value)}
						></textarea>
					</>
				)}
			</div>

			<Selector
				list={usersList}
				initialSearchTerm={owner}
				label={'Руководитель'}
				inputLabel={'Выберите руководителя'}
				onSelect={(item) => {
					setOwner(item);
					setEmployees((prevEmployees) =>
						prevEmployees.filter((employee) => employee.email !== item.email)
					);
				}}
			/>

			<EmployeesList
				employees={employees}
				onRemove={(index) =>
					setEmployees((prevEmployees) =>
						prevEmployees.filter((_, i) => i !== index)
					)
				}
			/>

			<AddEmployee
				usersList={usersList}
				employees={employees}
				ownerEmail={owner.email}
				onAdd={(newEmployee) => setEmployees([...employees, newEmployee])}
			/>

			<div className={styles.actions}>
				<button
					type="button"
					className={`${styles.btn} ${styles['btn-submit']}`}
					onClick={handleSubmit}
				>
					Сохранить
				</button>
				<button
					type="button"
					className={`${styles.btn} ${styles['btn-cancel']}`}
					onClick={onClose}
				>
					Отменить
				</button>
			</div>
		</GenericPopup>
	);
};