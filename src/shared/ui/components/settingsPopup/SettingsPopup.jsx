import { useEffect, useState } from "react";
import { GenericPopup } from "../GenericPopup";
import styles from './styles.module.css'
import { icons } from "../../icons/companies";

export const SettingsPopup = ({
	title,
	initialSettings,
	checkboxLabels,
	onSave,
	onClose
}) => {
	const [checkboxes, setCheckboxes] = useState(initialSettings);

	useEffect(() => {
		localStorage.setItem(title, JSON.stringify(checkboxes));
	}, [checkboxes, title]);

	const handleCheckboxChange = (name) => {
		setCheckboxes((prev) => ({
			...prev,
			[name]: !prev[name],
		}));
	};

	const handleSubmit = () => {
		onSave(checkboxes);
		onClose();
	};

	const handleResetToDefault = () => {
		setCheckboxes(initialSettings);
	};

	return (
		<GenericPopup onClose={onClose} title={title}>
			<div className={styles.form}>
					{Object.keys(checkboxes).map((key) => (
						<div
							key={key}
							className={`${styles.checkbox}`}
							onClick={() => handleCheckboxChange(key)}
						>
							<div className={`${styles.checkbox__box} ${checkboxes[key] ? styles.checked : ""}`}>
								{checkboxes[key] && 
								<img src={icons.isChecked} className={styles.checkboxIcon} alt="Выбран" />}
							</div>
							<div className={styles.checkbox__label}>{checkboxLabels[key]}</div>
						</div>
					))}
			</div>
			<div className={styles.actions}>
				<button
					type="button"
					className={`${styles.btn} ${styles["btn-default"]}`}
					onClick={handleResetToDefault}
				>
					По умолчанию
				</button>
				<button
					type="button"
					className={`${styles.btn} ${styles["btn-submit"]}`}
					onClick={handleSubmit}
				>
					Сохранить
				</button>
				<button
					type="button"
					className={`${styles.btn} ${styles["btn-cancel"]}`}
					onClick={onClose}
				>
					Отменить
				</button>
			</div>
		</GenericPopup>
	);
};