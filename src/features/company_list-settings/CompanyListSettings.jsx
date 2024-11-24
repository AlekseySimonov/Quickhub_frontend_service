import React, { useState } from 'react';
import styles from './CompanyListSettings.module.css'; // Импортируем стили

export const CompanyListSettings = ({ onSave, onClose }) => {
  const defaultSettings = {
    photo: true,
    fullName: true,
    patronymic: false,
    city: false,
    gender: false,
    birthDate: false,
    position: true,
    department: true,
    email: true,
    workPhone: true,
    personalPhone: false,
    tg: false,
    vk: false,
    regDate: false,
  };

  const [checkboxes, setCheckboxes] = useState(defaultSettings);

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

  const handleCancel = () => {
    onClose();
  };

  const handleResetToDefault = () => {
    setCheckboxes(defaultSettings);
  };

  const checkboxLabels = {
    fullName: "Имя и фамилия",
    patronymic: "Отчество",
    email: "E-mail",
    workPhone: "Рабочий телефон",
    position: "Должность",
    department: "Подразделение",
    city: "Город",
    vk: "Vk",
    gender: "Пол",
    personalPhone: "Мобильный телефон",
    photo: "Фото",
    birthDate: "Дата рождения",
    skype: "Skype",
    regDate: "Дата регистрации",
    tg: "Telegram",
  };

  return (
    <div className={styles['pop-up__outer']}>
      <div className={styles['pop-up']}>
        <div className={styles['pop-up__header']}>
          <div className={styles.container}>
            <div className={styles['pop-up__title']}>Настройки списка "Сотрудники"</div>
            <div className={styles['pop-up__closeBtn']} onClick={handleCancel}>
              <div className={styles['pop-up__closeBtn-component']}></div>
              <div className={styles['pop-up__closeBtn-component']}></div>
            </div>
          </div>
        </div>
        <div className={styles['pop-up__content']}>
          <div className={styles.container}>
            <div className={styles['pop-up__form']}>
              <div className={styles['pop-up__column']}>
                {Object.keys(checkboxes).slice(0, 7).map((key) => (
                  <div key={key} className={`${styles['pop-up__checkbox']} ${styles.checkbox}`} onClick={() => handleCheckboxChange(key)}>
                    <div className={`${styles.checkbox__box} ${checkboxes[key] ? styles.checked : ''}`}></div>
                    <div className={styles.checkbox__label}>{checkboxLabels[key]}</div>
                  </div>
                ))}
              </div>
              <div className={styles['pop-up__column']}>
                {Object.keys(checkboxes).slice(7).map((key) => (
                  <div key={key} className={`${styles['pop-up__checkbox']} ${styles.checkbox}`} onClick={() => handleCheckboxChange(key)}>
                    <div className={`${styles.checkbox__box} ${checkboxes[key] ? styles.checked : ''}`}></div>
                    <div className={styles.checkbox__label}>{checkboxLabels[key]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles['pop-up__actions']}>
              <button type="button" className={`${styles['pop-up__btn']} ${styles['pop-up__btn-default']}`} onClick={handleResetToDefault}>
                По умолчанию
              </button>
              <button type="button" className={`${styles['pop-up__btn']} ${styles['pop-up__btn-submit']}`} onClick={handleSubmit}>
                Сохранить
              </button>
              <button type="button" className={`${styles['pop-up__btn']} ${styles['pop-up__btn-cancel']}`} onClick={handleCancel}>
                Отменить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};