import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './CompanyCreate.module.css'
import { usePostCompanyMutation } from '../../../app/store/slices/companySlice';
import { GenericPopup } from '../../../shared/ui/components/GenericPopup/GenericPopup';

export const CompanyCreate = ({ onClose }) => {
  const email = useSelector(state => state.user.email);
  const [companyName, setCompanyName] = useState('');
  const [postCompany, { isLoading, isSuccess, error }] = usePostCompanyMutation();

  const handleInputChange = (event) => {
    setCompanyName(event.target.value);
  };

  const body = {
  title: companyName,
  users: [{email: email}],
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading){
      return
    }
    if (!companyName.trim()) {
      alert('Название компании не может быть пустым');
      return;
    }
    try {
        await postCompany({body: body}).unwrap();
        if (isSuccess){
          onClose()
        }
    } catch (err) {
        alert('Failed to create company: ', error)
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