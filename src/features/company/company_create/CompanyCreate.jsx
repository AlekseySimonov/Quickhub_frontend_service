import { useState } from 'react';
import styles from './CompanyCreate.module.css';
import { icons } from '../../../shared/ui/icons/companies';
import useOnclickOutside from "react-cool-onclickoutside";
import { useSelector, useDispatch } from 'react-redux';
import { postCompanyAPI } from '../../../app/store/slices/companySlice';


export const CompanyCreate = ({ onClose }) => {
  const ref = useOnclickOutside(() => {
    onClose()
  });
  
  const dispatch = useDispatch()
  const email = useSelector(state => state.user.email)

  const [companyName, setCompanyName] = useState('');

  const handleInputChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!companyName.trim()) {
      alert('Название компании не может быть пустым')
      return;
    }
    dispatch(postCompanyAPI({title: companyName, email}))
    onClose();
  };
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