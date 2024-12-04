import { useState } from 'react';
import styles from './CompanyCreate.module.css';
import { icons } from '../../../shared/ui/icons/companies';
import useOnclickOutside from "react-cool-onclickoutside";
import { useSelector, useDispatch } from 'react-redux';
import { postCompanyAPI } from '../../../app/store/slices/companySlice';

export const CompanyCreate = ({ onClose }) => {
  const ref = useOnclickOutside(() => {
    onClose();
  });
  
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);
  const [companyName, setCompanyName] = useState('');

  const handleInputChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!companyName.trim()) {
      alert('Название компании не может быть пустым');
      return;
    }
    dispatch(postCompanyAPI({ title: companyName, email }));
    onClose();
  };

  return (
    <div data-testid="createCompany_popup" className={styles.outer}>
      <div ref={ref} className={styles.popup}>
        <div className={styles.header}>
          <div className={styles.container}>
            <div data-testid="popup_title" className={styles.title}>Создать компанию</div>
            <div data-testid="popup_close" className={styles.closeBtn} onClick={onClose}>
              <img src={icons.popupX} alt="Закрыть" />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form} aria-label="Create Company Form">
              <div className={styles.row}>
                <label className={styles.label}>Название компании</label>
                <input
                  placeholder="Введите название компании"
                  type="text"
                  className={styles.input}
                  value={companyName}
                  onChange={handleInputChange}
                />
                <div className={styles.sublabel}>
                  <span>Примечание.</span> Компании никак не будут связаны между собой. Проекты, задачи, настройки и т.д. необходимо будет создавать заново.
                </div>
              </div>
              <div className={styles.actions}>
                <button type="submit" className={`${styles.btn} ${styles['btn-submit']}`}>
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