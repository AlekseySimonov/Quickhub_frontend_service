import React, { useState } from 'react';

import styles from './CompanyCreate.module.css';
import { icons } from '../../shared/ui/icons/companies';

import useOnclickOutside from "react-cool-onclickoutside";

export const CompanyCreate = ({ onClose }) => {
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

  const ref = useOnclickOutside(() => {
    console.log('Ты кликнул вне формы')
    onClose()
  });

  return (
    <div data-testid={'createCompany_popup'} className={styles['pop-up__outer']}>
    <div ref={ref} className={styles['pop-up']}>
      <div className={styles['pop-up__header']}>
        <div className={styles.container}>
          <div data-testid="popup_title" className={styles['pop-up__title']}>Создать компанию</div>
          <div data-testid='popup_close' className={styles['pop-up__closeBtn']} onClick={onClose}>
            <img src={icons.popupX}/>
          </div>
        </div>
      </div>
      <div className={styles['pop-up__content']}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles['pop-up__form']} aria-label="Create Company Form">
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