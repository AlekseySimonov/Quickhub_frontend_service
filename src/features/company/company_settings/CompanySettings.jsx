import { useState, useEffect } from 'react';
import useOnclickOutside from "react-cool-onclickoutside";
import { useDispatch, useSelector } from 'react-redux';
import styles from './CompanySettings.module.css';
import { icons } from '../../../shared/ui/icons/companies';
import { deleteCompanyAPI, renameCompanyAPI } from '../../../app/store/slices/companySlice';
import { GenericPopup } from '../../../shared/ui/components/GenericPopup/GenericPopup';

export const CompanySettings = ({ onClose }) => { 
  const ref = useOnclickOutside(() => {
    onClose();
  });

  const dispatch = useDispatch();
  const id = useSelector(state => state.company.companyID);
  const companyTitle = useSelector(state => state.company.companyTitle);

  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    setCompanyName(companyTitle);
  }, [companyTitle]);

  const handleInputChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!companyName.trim()) {
      alert('Название компании не может быть пустым');
      return;
    }
    if (companyName === companyTitle) {
      alert('Новое название компании должно отличаться от предыдущего');
      return;
    }
    dispatch(renameCompanyAPI({ id, title: companyName }));
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteCompanyAPI({ id }));
    onClose();
  };

  return (
    <GenericPopup
      onClose = {onClose}
      title = {'Настройки компании'}
      styles = {styles}
      >
          <div className={styles.container}>
            <form data-testid="form_company-settings" className={styles.form} onSubmit={handleSave}>
              <div className={styles.row}>
                <label className={styles.label}>Изменить название компании</label>
                <input
                  required
                  placeholder="Введите название компании"
                  type="text"
                  className={styles.input}
                  value={companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.actions}>
                <button type="submit" className={`${styles.btn} ${styles['btn-submit']}`}>
                  Сохранить
                </button>
                <button type="button" className={`${styles.btn} ${styles['btn-delete']}`} onClick={handleDelete}>
                  Удалить компанию
                </button>
              </div>
            </form>
        </div>
      </GenericPopup>  
  );
};