import React from 'react';
import styles from './company_settings.module.css'; // Импортируем стили из CSS модуля
import { Select } from '../../../index';

export const Company_Settings = ({ onClose }) => { 
  const settingsOptions = [
    { label: 'Кто может видеть страницу "Отчёты"', options: ['Все пользователи', 'Только руководитель', 'Никто'], defaultOption: 'Все пользователи' },
    { label: 'Кто может видеть страницу "Лицензия и оплаты"', options: ['Все пользователи', 'Только руководитель', 'Никто'], defaultOption: 'Все пользователи' },
    { label: 'Кто может изменять контактную информацию сотрудников', options: ['Все пользователи', 'Только руководитель', 'Никто'], defaultOption: 'Все пользователи' },
  ];

  return (
    <div data-testid='companySettings_popup' className={styles['pop-up__outer']}>
    <div className={styles['pop-up']}>
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
          <div className={styles['pop-up__form']}>
            {settingsOptions.map((setting, index) => (
              <div key={index} className={styles['pop-up__row']}>
                <div className={styles['pop-up__label']}>{setting.label}</div>
                <Select styles={styles} options={setting.options} defaultOption={setting.defaultOption} />
              </div>
            ))}
          </div>
          <div className={styles['pop-up__actions']}>
            <button className={`${styles['pop-up__btn']} ${styles['pop-up__btn-submit']}`}>
              Сохранить
            </button>
            <button data-testid='popup_cancel' className={`${styles['pop-up__btn']} ${styles['pop-up__btn-cancel']}`} onClick={onClose}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};