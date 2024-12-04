import { useState, useEffect } from 'react';
import styles from './CompanyListSettings.module.css';
import { icons } from '../../../shared/ui/icons/companies';
import useOnclickOutside from "react-cool-onclickoutside";

export const CompanyListSettings = ({ onSave, onClose }) => { 
  const ref = useOnclickOutside(() => {
    onClose();
  });

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

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('companyListSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  };

  const [checkboxes, setCheckboxes] = useState(loadSettings());

  useEffect(() => {
    localStorage.setItem('companyListSettings', JSON.stringify(checkboxes));
  }, [checkboxes]);



  
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

  return (
    <div className={styles.outer}>
      <div ref={ref} className={styles.popup}>
        <div className={styles.header}>
          <div className={styles.container}>
            <div className={styles.title}>Настройки списка "Сотрудники"</div>
            <div className={styles.closeBtn} onClick={handleCancel}>
              <img src={icons.popupX} alt="Закрыть" />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.form}>
              <div className={styles.column}>
                {Object.keys(checkboxes).slice(0, 7).map((key) => (
                  <div key={key} className={`${styles.checkbox}`} onClick={() => handleCheckboxChange(key)}>
                    <div className={`${styles.checkbox__box} ${checkboxes[key] ? styles.checked : ''}`}>
                      {checkboxes[key] && (
                        <img src={icons.isChecked} className={styles.checkboxIcon} alt="Выбран" />
                      )}
                    </div>
                    <div className={styles.checkbox__label}>{checkboxLabels[key]}</div>
                  </div>
                ))}
              </div>
              <div className={styles.column}>
                {Object.keys(checkboxes).slice(7).map((key) => (
                  <div key={key} className={`${styles.checkbox}`} onClick={() => handleCheckboxChange(key)}>
                    <div className={`${styles.checkbox__box} ${checkboxes[key] ? styles.checked : ''}`}>
                      {checkboxes[key] && (
                        <img src={icons.isChecked} className={styles.checkboxIcon} alt="Выбран" />
                      )}
                    </div>
                    <div className={styles.checkbox__label}>{checkboxLabels[key]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.actions}>
              <button type="button" className={`${styles.btn} ${styles['btn-default']}`} onClick={handleResetToDefault}>
                По умолчанию
              </button>
              <button type="button" className={`${styles.btn} ${styles['btn-submit']}`} onClick={handleSubmit}>
                Сохранить
              </button>
              <button type="button" className={`${styles.btn} ${styles['btn-cancel']}`} onClick={handleCancel}>
                Отменить
              </button>
            </div>
          </div>
        </div>
      </div>
   </div>
  );
};