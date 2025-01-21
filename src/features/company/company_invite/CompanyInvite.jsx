import { useState } from 'react';
import styles from './CompanyInvite.module.css';
import { socials } from '../../../shared/ui/icons/companies/popup/invite_employee';
import { GenericPopup } from '../../../shared/ui/components/GenericPopup/GenericPopup';
import { usePatchCompanyMutation } from '../../../app/store/slices/companySlice';
import { useSelector } from 'react-redux';

export const CompanyInvite = ({ onClose }) => {
  const companyID = useSelector(state => state.company.companyID)

  const [activeForm, setActiveForm] = useState('byPersonal');
  const [rows, setRows] = useState([{email: '',}]);

  const [patchCompany, {error}] = usePatchCompanyMutation()

  const handleNavClick = (formType) => {
    setActiveForm(formType);
  };

  const handleAddRow = () => {
    if (rows.length < 10) {
      setRows([...rows, { email: ''}]);
    } else {
      alert('Нельзя добавить больше 10 сотрудников за 1 раз');
    }
  };

  const handleDeleteRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSubmit = async () => {
    try{
      await patchCompany({id: companyID, body: {users: rows}})
    } catch (err){
      alert('Ошибка при приглашении в компанию:', error)
    }
    console.log(rows);
  };


return (
    <GenericPopup onClose={onClose} title={'Приглашение в компанию'}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <div
            className={`${styles.nav_item} ${activeForm === 'byPersonal' ? styles.current : ''}`}
            onClick={() => handleNavClick('byPersonal')}
          >
            Приглашение по Email
          </div>
          <div
            className={`${styles.nav_item} ${activeForm === 'byLink' ? styles.current : ''}`}
            onClick={() => handleNavClick('byLink')}
          >
            Приглашение по ссылке
          </div>
        </div>

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

        {activeForm === 'byPersonal' && (
          <form data-testid="form_byPersonal" onSubmit={handleSubmit} className={`${styles.form} ${styles.byPersonal}`}>
            <div className={styles.labels}>
              Введите почту нового сотрудника(-ов)
            </div>
            <div className={styles.rows}>
              {rows.map((row, index) => (
                <div key={index} className={styles.row}>
                  <input
                    required
                    placeholder="Введите Email"
                    type="email"
                    className={styles.input}
                    value={row.email}
                    onChange={(e) => handleChange(index, 'email', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteRow(index)}
                    className={`${styles.delete}`}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
              <div className={styles.rows_control}>
                <button type="button" onClick={handleAddRow} className={`${styles.add}`}>
                  Добавить ещё
                </button>
              </div>
            <div className={styles.actions}>
              <button type="submit" className={`${styles.btn} ${styles['btn-submit']}`}>Пригласить</button>
              <button type="button" className={`${styles.btn} ${styles['btn-cancel']}`} onClick={onClose}>Отмена</button>
            </div>
          </form>
        )}
      </div>
    </GenericPopup>
  );
};