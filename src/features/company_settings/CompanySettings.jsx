import {useState, useEffect} from 'react';
import useOnclickOutside from "react-cool-onclickoutside";
import { useDispatch, useSelector } from 'react-redux';

import styles from './CompanySettings.module.css';
import { icons } from '../../shared/ui/icons/companies';

import { deleteCompanyAPI, renameCompanyAPI } from '../../app/store/slices/companySlice';

export const CompanySettings = ({ onClose }) => { 
  const ref = useOnclickOutside(() => {
    onClose()
  });

  const dispatch = useDispatch();
  const id = useSelector(state => state.company.companyID);
  const companyTitle = useSelector(state => state.company.companyTitle)

  const settingsOptions = [
    { label: 'Изменить название компании' },
  ];

  useEffect(() => {
    setCompanyName(companyTitle);
  }, [companyTitle]);


  const [companyName, setCompanyName] = useState('');


  const handleInputChange = (event) => {
    setCompanyName(event.target.value);

  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!companyName.trim()) {
      alert('Название компании не может быть пустым')
      return
    }
    if (companyName === companyTitle) {
      alert('Новое название компании должно отличаться от предыдущего')
      return
    }
    dispatch(renameCompanyAPI({id: id, title: companyName}))
    onClose()
  };

  const handleDelete = () => {
    dispatch(deleteCompanyAPI({id: id}))
    onClose()
  };

  return (
    <div data-testid='companySettings_popup' className={styles['pop-up__outer']}>
    <div ref={ref} className={styles['pop-up']}>
      <div className={styles['pop-up__header']}>
        <div className={styles.container}>
          <div className={styles['pop-up__title']}>Настройки компании</div>
          <div data-testid='popup_close' className={styles['pop-up__closeBtn']} onClick={onClose}>
            <img src={icons.popupX}/>
          </div>
        </div>
      </div>
      <div className={styles['pop-up__content']}>
        <div className={styles.container}>
        <form data-testid="form_company-settings" className={styles['pop-up__form']}>
          <div className={styles['pop-up__form']}>
            {settingsOptions.map((setting, index) => (
              <div key={index} className={styles['pop-up__row']}>
                <div className={styles['pop-up__label']}>{setting.label}</div>
                <input
                  required
                  placeholder='Введите название компании'
                  type="text"
                  className={styles['pop-up__input']}
                  defaultValue={companyTitle}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
          <div className={styles['pop-up__actions']}>
            <button type="submit" className={`${styles['pop-up__btn']} ${styles['pop-up__btn-submit']}`} onClick={handleSave}>
              Сохранить
            </button>
            <button className={`${styles['pop-up__btn']} ${styles['pop-up__btn-delete']}`} onClick={handleDelete}>
              Удалить компанию
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};