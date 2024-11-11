import { useState } from 'react';
import styles from './create_company.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { postCompanyAPI } from '../../../../../../app/store/slices/companySlice';
import useOnclickOutside from "react-cool-onclickoutside";

export const Create_Company = ({ onClose }) => {
  const {error} = useSelector(state => state.company)
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch()
  const email = useSelector(state => state.user.email)
  
  const handleInputChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postCompanyAPI({title: companyName, email: email}))
    if (error !== 'postError'){
      onClose();
    }
  };

  const ref = useOnclickOutside(() => {
    console.log('Ты кликнул вне формы')
    onClose()
  });

  return (
    <div data-testid={'createCompany_popup'} className={styles['pop-up__outer']}>
    <div ref={ref} className={styles['pop-up']}>
      <div className={styles['pop-up__header']}>
        <div className={styles.container}>
          <div className={styles['pop-up__title']}>Создать компанию</div>
          <div data-testid='popup_close' className={styles['pop-up__closeBtn']} onClick={onClose}>
            <div className={styles['pop-up__closeBtn-component']}></div>
            <div className={styles['pop-up__closeBtn-component']}></div>
          </div>
        </div>
      </div>
      <div className={styles['pop-up__content']}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles['pop-up__form']}>
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

              {error === 'postError' && <div className={styles.errorMessage}>Произошла ошибка. Попробуйте снова или подождите, пока мы исправим проблему.</div>}

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