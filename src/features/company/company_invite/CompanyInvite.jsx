import { useState } from 'react';
import styles from './CompanyInvite.module.css';
import { socials } from '../../../shared/ui/icons/companies/popup/invite_employee';
import { icons } from '../../../shared/ui/icons/companies';
import useOnclickOutside from "react-cool-onclickoutside";

export const CompanyInvite = ({ onClose }) => {
  const [activeForm, setActiveForm] = useState('byLink');
  const [rows, setRows] = useState([{}]);

  const handleNavClick = (formType) => {
    setActiveForm(formType);
  };

  const handleAddRow = () => {
    if (rows.length < 10) {
      setRows([...rows, {}]);
    } else {
      console.log('Нельзя добавить больше 10 сотрудников за 1 раз');
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
    onClose();
  });

  return (
    <div data-testid="inviteEmployee_popup" className={styles.outer}>
      <div ref={ref} className={styles.popup}>
        <div className={styles.header}>
          <div className={styles.container}>
            <div data-testid="popup_title" className={styles.title}>Приглашение в компанию</div>
            <div data-testid="popup_close" className={styles.closeBtn} onClick={onClose}>
              <img src={icons.popupX} alt="Закрыть" />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.nav}>
              <div 
                className={`${styles.nav_item} ${activeForm === 'byLink' ? styles.current : ''}`} 
                onClick={() => handleNavClick('byLink')}
              >
                Приглашение по ссылке
              </div>
              <div 
                className={`${styles.nav_item} ${activeForm === 'byPersonal' ? styles.current : ''}`} 
                onClick={() => handleNavClick('byPersonal')}
              >
                Приглашение по Email
              </div>
            </div>

            {/* Форма по ссылке */}
            {activeForm === 'byLink' && (
              <form data-testid="form_byLink" onSubmit={handleSubmit} className={`${styles.form} ${styles.byLink}`}>
                <div className={styles.row}>
                  <label className={styles.label}>Ссылка для приглашения</label>
                  <div className={styles.row_container}>
                    <input type="text" className={styles.input} />
                    <button type="button" className={`${styles.btn} ${styles.copy}`}>Скопировать ссылку</button>
                  </div>
                </div>
                <div className={styles.row}>
                  <label className={styles.label}>Отправить ссылку</label>
                  <div className={styles.sendTo}>
                    {Object.entries(socials).map(([key, src]) => (
                      <div key={key} className={styles.sendTo_item}>
                        <img src={src} alt={`Отправить через ${key}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            )}

            {/* Форма по Email */}
            {activeForm === 'byPersonal' && (
              <form data-testid="form_byPersonal" onSubmit={handleSubmit} className={`${styles.form} ${styles.byPersonal}`}>
                <div className={styles.labels}>
                  {['Email', 'Имя', 'Фамилия'].map(label => (
                    <label key={label} className={styles.label}>{label}</label>
                  ))}
                </div>
                <div className={styles.rows}>
                  {rows.map((_, index) => (
                    <div key={index} className={styles.row}>
                      <input required placeholder="Введите Email" type="email" className={styles.input} />
                      <input required placeholder="Введите имя" type="text" className={styles.input} />
                      <input required placeholder="Введите фамилию" type="text" className={styles.input} />
                    </div>
                  ))}
                </div>
                <div className={styles.rows_control}>
                  <button type="button" onClick={handleAddRow} className={`${styles.add}`}>
                    Добавить ещё
                  </button>
                  <button type="button" onClick={handleDeleteRow}
                          disabled={rows.length <= 1}
                          className={`${styles.delete} ${rows.length <= 1 ? styles.inactive : ''}`}>
                    Удалить
                  </button>            
                </div>
                <div className={styles.actions}>
                  <button type="submit" className={`${styles.btn} ${styles['btn-submit']}`}>Пригласить</button>
                  <button type="button" className={`${styles.btn} ${styles['btn-cancel']}`} onClick={onClose}>Отмена</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>    
    </div>
  );
};