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
    <div className={styles['pop-up__outer']}>
      <div ref={ref} className={styles['pop-up']}>
        <div className={styles['pop-up__header']}>
          <div className={styles.container}>
            <div className={styles['pop-up__title']}>Настройки списка "Сотрудники"</div>
            <div className={styles['pop-up__closeBtn']} onClick={handleCancel}>
              <img src={icons.popupX} alt=""/>
            </div>
          </div>
        </div>
        <div className={styles['pop-up__content']}>
          <div className={styles.container}>
            <div className={styles['pop-up__form']}>
              <div className={styles['pop-up__column']}>
                {Object.keys(checkboxes).slice(0, 7).map((key) => (
                  <div key={key} className={`${styles['pop-up__checkbox']} ${styles.checkbox}`} onClick={() => handleCheckboxChange(key)}>
                    <div className={`${styles.checkbox__box} ${checkboxes[key] ? styles.checked : ''}`}>
                      {checkboxes[key] && (
                        <img src={icons.isChecked} className={styles.checkboxIcon} />
                      )}
                    </div>
                    <div className={styles.checkbox__label}>{checkboxLabels[key]}</div>
                  </div>
                ))}
              </div>
              <div className={styles['pop-up__column']}>
                {Object.keys(checkboxes).slice(7).map((key) => (
                  <div key={key} className={`${styles['pop-up__checkbox']} ${styles.checkbox}`} onClick={() => handleCheckboxChange(key)}>
                    <div className={`${styles.checkbox__box} ${checkboxes[key] ? styles.checked : ''}`}>
                      {checkboxes[key] && (
                        <img src={icons.isChecked} className={styles.checkboxIcon} />
                      )}
                    </div>
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