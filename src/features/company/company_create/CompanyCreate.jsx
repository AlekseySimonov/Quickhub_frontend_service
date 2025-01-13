import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CompanyCreate.module.css'
import { postCompanyAPI, usePostCompanyMutation } from '../../../app/store/slices/companySlice';
import { GenericPopup } from '../../../shared/ui/components/GenericPopup/GenericPopup';

export const CompanyCreate = ({ onClose }) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);
  const [companyName, setCompanyName] = useState('');
  const [postCompany, { isLoading, error }] = usePostCompanyMutation();

  const handleInputChange = (event) => {
    setCompanyName(event.target.value);
  };

  const body = {
  title: companyName,
  users: [
      {
        email: email,
      }
    ],
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    if (!companyName.trim()) {
      alert('Название компании не может быть пустым');
      return;
    }
    try {
      console.log(body)
        await postCompany(body).unwrap();
    } catch (err) {
        alert('Failed to create company: ', err)
    }
    onClose();
  };

  return (
      <GenericPopup
        onClose = {onClose}
        title = {'Создать компанию'}
        >
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
      </GenericPopup>
  );
};