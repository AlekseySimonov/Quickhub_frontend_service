import {useState, React} from 'react';
import styles from './CompanySettings.module.css'; // Импортируем стили из CSS модуля
import { Select } from '../../../index';
import useOnclickOutside from "react-cool-onclickoutside";

export const Company_Settings = ({ onClose, companyTitle }) => { 
  const settingsOptions = [
    { label: 'Изменить название компании' },
  ];

  const ref = useOnclickOutside(() => {
    console.log('Ты кликнул вне формы')
    onClose()
  });

  const [companyName, setCompanyName] = useState('');

  const handleInputChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Изменить название компании на:', companyName);
    // Здесь можно добавить логику для отправки данных на сервер
    onClose();
  };

  return (
    <div data-testid='companySettings_popup' className={styles['pop-up__outer']}>
    <div ref={ref} className={styles['pop-up']}>
      <div className={styles['pop-up__header']}>
        <div className={styles.container}>
          <div className={styles['pop-up__title']}>Настройки компании</div>
          <div data-testid='popup_close' className={styles['pop-up__closeBtn']} onClick={onClose}>
            <div className={styles['pop-up__closeBtn-component']}></div>
            <div className={styles['pop-up__closeBtn-component']}></div>
          </div>
        </div>
      </div>
      <div className={styles['pop-up__content']}>
        <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles['pop-up__form']}>
          <div className={styles['pop-up__form']}>
            {settingsOptions.map((setting, index) => (
              <div key={index} className={styles['pop-up__row']}>
                <div className={styles['pop-up__label']}>{setting.label}</div>
                <input
                  required
                  placeholder='Введите название компании'
                  type="text"
                  className={styles['pop-up__input']}
                  defaultValue={companyTitle}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
          <div className={styles['pop-up__actions']}>
            <button className={`${styles['pop-up__btn']} ${styles['pop-up__btn-submit']}`}>
              Сохранить
            </button>
            <button className={`${styles['pop-up__btn']} ${styles['pop-up__btn-delete']}`}>
              Удалить компанию
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};