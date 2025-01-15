import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './CompanySettings.module.css';
import {  useDeleteCompanyMutation, useGetCompaniesQuery, usePatchCompanyMutation } from '../../../app/store/slices/companySlice';
import { GenericPopup } from '../../../shared/ui/components/GenericPopup/GenericPopup';

export const CompanySettings = ({ onClose }) => { 

  const companyID = useSelector(state => state.company.companyID);

  const {data} = useGetCompaniesQuery()
  const [deleteCompany, {deleteError}] = useDeleteCompanyMutation()
  const [patchCompany, {patchError}] = usePatchCompanyMutation()

  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    if (Array.isArray(data)) {
      setCompanyName(data.find(company => company.id === companyID).title)
    }
  }, [data, companyID]);

  const handleInputChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!companyName.trim()) {
      alert('Название компании не может быть пустым');
      return;
    }
    if (companyName === data.find(company => company.id === companyID).title) {
      alert('Новое название компании должно отличаться от предыдущего');
      return;
    }

    try{
      await patchCompany({id: companyID, body: {title: companyName}})
    } catch (err){
      alert('Произошла ошибка:', patchError )
    }
    onClose();
  };

  const handleDelete = async() => {
    try{
      await deleteCompany(companyID).unwrap()
    }
    catch (err){
      alert('Произошла ошибка:', deleteError )
    }
    onClose();
  };

  return (
    <GenericPopup
      onClose = {onClose}
      title = {'Настройки компании'}
      >
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
      </GenericPopup>  
  );
};