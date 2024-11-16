import React, { useState } from 'react';
import styles from './CompanyInvite.module.css';

import { socials } from '../../shared/ui/icons/companies/popup/invite_employee';
import { icons } from '../../shared/ui/icons/companies';

import useOnclickOutside from "react-cool-onclickoutside";

export const CompanyInvite = ({onClose}) => {
  const [activeForm, setActiveForm] = useState('by-link');
  const [rows, setRows] = useState([{}]); 

  const handleNavClick = (formType) => {
    setActiveForm(formType);
  };


  const handleAddRow = () => {
    if (rows.length < 10) {
        setRows([...rows, {}]);
        }
    else {
        console.log('Нельзя добавить больше 10 сотрудников за 1 раз')
    }
  };


  const handleDeleteRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Форма отправлена:', rows);
  };

  const ref = useOnclickOutside(() => {
    console.log('Ты кликнул вне формы')
    onClose()
  });

  return (
    <div data-testid={'inviteEmployee_popup'} className={styles['pop-up__outer']}>
    <div ref={ref} className={styles['pop-up']}>
    <div className={styles['pop-up__header']}>
        <div className={styles.container}>
          <div className={styles['pop-up__title']}>Приглашение в компанию</div>
          <div data-testid='popup_close' className={styles['pop-up__closeBtn']} onClick={onClose}>
              <img src={icons.popupX} />
          </div>
        </div>
      </div>
      <div className={styles['pop-up__content']}>
        <div className={styles.container}>
          <div className={styles['pop-up__nav']}>
            <div 
              className={`${styles['pop-up__nav-item']} ${activeForm === 'by-link' ? styles.current : ''}`} 
              onClick={() => handleNavClick('by-link')}
            >
              Приглашение по ссылке
            </div>
            <div 
              className={`${styles['pop-up__nav-item']} ${activeForm === 'by-personal' ? styles.current : ''}`} 
              onClick={() => handleNavClick('by-personal')}
            >
              Приглашение по Email
            </div>
          </div>

          {/* По ссылке */}
          {activeForm === 'by-link' && (
            <form onSubmit={handleSubmit} className={`${styles['pop-up__form']} ${styles['by-link']}`}>
              <div className={styles['pop-up__row']}>
                <div className={styles['pop-up__label']}>Ссылка для приглашения</div>
                <div className={styles['pop-up__row-container']}>
                  <input type="text" className={styles['pop-up__input']} />
                  <button type="button" className={`${styles['pop-up__btn']} ${styles.copy}`}>Скопировать ссылку</button>
                </div>
              </div>
              <div className={styles['pop-up__row']}>
                <div className={styles['pop-up__label']}>Отправить ссылку</div>
                <div className={styles['pop-up__sendTo']}>
                    <div className={styles['pop-up__sendTo-item']}>
                        <img src={socials.vk}/>
                    </div>
                    <div className={styles['pop-up__sendTo-item']}>
                        <img src={socials.tg}/>             
                    </div>
                    <div className={styles['pop-up__sendTo-item']}>
                        <img src={socials.whapp}/>   
                    </div>
                </div>
              </div>
            </form>
          )}

          {activeForm === 'by-personal' && (
            <form onSubmit={handleSubmit} className={`${styles['pop-up__form']} ${styles['by-personal']}`}>
              <div className={styles['pop-up__labels']}>
                {['Email', 'Имя', 'Фамилия'].map(label => (
                  <div key={label} className={styles['pop-up__label']}>{label}</div>
                ))}
              </div>
              <div className={styles['pop-up__rows']}>
                {rows.map((_, index) => (
                  <div key={index} className={styles['pop-up__row']}>
                    <input required placeholder="Введите Email" type="email" className={styles['pop-up__input']} />
                    <input required placeholder="Введите имя" type="text" className={styles['pop-up__input']} />
                    <input required placeholder="Введите фамилию" type="text" className={styles['pop-up__input']} />
                  </div>
                ))}
              </div>
              <div className={styles['pop-up__rows-control']}>
                <button type="button" onClick={handleAddRow} className={`${styles['pop-up__add']}`}>
                  Добавить ещё
                </button>
                <button type="button" onClick={handleDeleteRow} 
                        disabled={rows.length <= 1}
                        className={`${styles['pop-up__delete']} ${rows.length <= 1 ? styles.inactive : ''}`}>
                  Удалить
                </button>            
              </div>
              <div className={styles['pop-up__actions']}>
                <button type="submit" className={`${styles['pop-up__btn']} ${styles['pop-up__btn-submit']}`}>Пригласить</button>
                <button type="button" className={`${styles['pop-up__btn']} ${styles['pop-up__btn-cancel']}`} onClick={onClose}>Отмена</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>    
    </div>
  );
};