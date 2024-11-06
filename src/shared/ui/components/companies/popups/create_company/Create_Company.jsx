import React, { useState } from 'react';
import styles from './create_company.module.css';

export const Create_Company = ({ onClose }) => {
  const [companyName, setCompanyName] = useState('');

  const handleInputChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Создать компанию:', companyName);
    // Здесь можно добавить логику для отправки данных на сервер
    onClose();
  };

  return (
    <div data-testid={'createCompany_popup'} className={styles['pop-up__outer']}>
    <div className={styles['pop-up']}>
      <div className={styles['pop-up__header']}>
        <div className={styles.container}>
          <div className={styles['pop-up__title']}>Создать компанию</div>
          <div data-testid='popup_close' className={styles['pop-up__closeBtn']} onClick={onClose}>
            <div className={styles['pop-up__closeBtn-component']}></div>
            <div className={styles['pop-up__closeBtn-component']}></div>
          </div>
        </div>
      </div>
      <div className={styles['pop-up__content']}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles['pop-up__form']}>
            <div className={styles['pop-up__row']}>
              <div className={styles['pop-up__label']}>Название компании</div>
              <input
                placeholder="Введите название компании"
                type="text"
                className={styles['pop-up__input']}
                value={companyName}
                onChange={handleInputChange}
              />
              <div className={styles['pop-up__sublabel']}>
                <span>Примечание.</span> Компании никак не будут связаны между собой. Проекты, задачи, настройки и т.д. необходимо будет создавать заново.
              </div>
            </div>
            <div className={styles['pop-up__actions']}>
              <button type="submit" className={`${styles['pop-up__btn']} ${styles['pop-up__btn-submit']}`}>
                Создать компанию
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};