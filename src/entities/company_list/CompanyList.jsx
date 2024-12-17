import { useState } from 'react';
import styles from './CompanyList.module.css';
import { icons } from '../../shared/ui/icons/companies';
import { useSelector } from 'react-redux';
import { CompanyFeatures } from '../../features/company';
export const CompanyList = () => {
  const {companyUsers} = useSelector(state => state.company);
  const employees = companyUsers ? companyUsers : [];

  const employeesPerPage = 8;
  const totalEmployees = employees.length;
  const totalPages = Math.ceil(totalEmployees / employeesPerPage);
  
  const [currentPage, setCurrentPage] = useState(1);

  const defaultSettings = {
    photo: true,
    fullName: true,
    patronymic: false,
    city: false,
    gender: false,
    birthDate: false,
    position: true,
    department: true,
    email: true,
    workPhone: true,
    personalPhone: false,
    tg: false,
    vk: false,
    regDate: false,
  };

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('companyListSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  };

  const [showColumns, setShowColumns] = useState(loadSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handleSaveSettings = (settings) => {
    setShowColumns(settings);
    localStorage.setItem('companyListSettings', JSON.stringify(settings));
    setIsSettingsOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
      <div className={styles.main}>
          <div className={styles.employees}>
            <div className={styles.employees__inner}>
              <div className={styles.employees__header}>
                  <div className={styles.employees__settings} onClick={() => setIsSettingsOpen(true)}>
                      <img src={icons.settingsGrey} alt="Настройки"/>
                  </div>
                  <div className={`${styles.employees__labels} ${styles.container}`}>
                      {showColumns.photo && <div className={`${styles.employees__label} ${styles['label-photo']}`}>Фото</div>}
                      {showColumns.fullName && <div className={`${styles.employees__label} ${styles['label-fsname']}`}>Имя и фамилия</div>}
                      {showColumns.patronymic && <div className={`${styles.employees__label} ${styles['label-lname']}`}>Отчество</div>}
                      {showColumns.city && <div className={`${styles.employees__label} ${styles['label-city']}`}>Город</div>}
                      {showColumns.gender && <div className={`${styles.employees__label} ${styles['label-gender']}`}>Пол</div>}
                      {showColumns.birthDate && <div className={`${styles.employees__label} ${styles['label-birthDate']}`}>Дата рождения</div>}
                      {showColumns.position && <div className={`${styles.employees__label} ${styles['label-position']}`}>Должность</div>}
                      {showColumns.department && <div className={`${styles.employees__label} ${styles['label-department']}`}>Подразделение</div>}
                      {showColumns.email && <div className={`${styles.employees__label} ${styles['label-email']}`}>Email</div>}
                      {showColumns.workPhone && <div className={`${styles.employees__label} ${styles['label-workPhone']}`}>Рабочий телефон</div>}
                      {showColumns.personalPhone && <div className={`${styles.employees__label} ${styles['label-personalPhone']}`}>Мобильный телефон</div>}
                      {showColumns.tg && <div className={`${styles.employees__label} ${styles['label-tg']}`}>Telegram</div>}
                      {showColumns.vk && <div className={`${styles.employees__label} ${styles['label-vk']}`}>VK</div>}
                      {showColumns.regDate && <div className={`${styles.employees__label} ${styles['label-regDate']}`}>Дата регистрации</div>}         
                  </div>
              </div>
              <div className={styles.employees__list}>
                  <div className={styles['employees__list-inner']}>
                      {totalEmployees === 0 && 
                        <div className={styles.container_empty}>
                          На данный момент в компании нет сотрудников.
                        </div>
                      }
                      {currentEmployees.map((employee) => (
    <div key={employee.id} className={styles.employees__item}>
        <div className={`${styles.container} ${styles.employee}`}>
            {showColumns.photo && (
                <div className={`${styles.employee__column} ${styles.employee__photo}`}>
                    <div className={styles['employee__photo-inner']}></div>
                </div>
            )}
            {showColumns.fullName && (
                <div className={`${styles.employee__column} ${styles.employee__info}`}>
                    <div className={styles.employee__fsname}>
                        {employee.last_name || 'Фамилия'} {employee.first_name || 'Имя'}
                    </div>
                    {/* Отображаем только первую позицию */}
                    <div className={styles.employee__type}>
                        {employee.positions?.[0]?.title || 'Позиция не указана'}
                        {/* Скрываем остальные позиции */}
                        <span style={{ display: employee.positions?.length > 1 ? 'none' : 'inline' }}>
                            {employee.positions?.slice(1).map((position, index) => (
                                <span key={index} style={{ display: 'none' }}>{position.title}</span>
                            ))}
                        </span>
                    </div>
                </div>
            )}
            {showColumns.patronymic && (
                <div className={`${styles.employee__column} ${styles.employee__lname}`}>
                    {employee.otchestwo || '-'}
                </div>
            )}
            {showColumns.city && (
                <div className={`${styles.employee__column} ${styles.employee__city}`}>
                    {employee.city || '-'}
                </div>
            )}
            {showColumns.gender && (
                <div className={`${styles.employee__column} ${styles.employee__gender}`}>
                    {employee.gender || '-'}
                </div>
            )}
            {showColumns.birthDate && (
                <div className={`${styles.employee__column} ${styles.employee__birthDate}`}>
                    {employee.birthDate || '-'}
                </div>
            )}
            {showColumns.position && employee.positions && employee.positions.length > 0 && (
                <div className={`${styles.employee__column} ${styles.employee__position}`}>
                    {/* Отображаем только первую позицию */}
                    {employee.positions?.[0]?.title || '-'}
                    {/* Скрываем остальные позиции */}
                    <span style={{ display: employee.positions?.length > 1 ? 'none' : 'inline' }}>
                        {employee.positions?.slice(1).map((position, index) => (
                            <span key={index} style={{ display: 'none' }}>{position.title}</span>
                        ))}
                    </span>
                </div>
            )}
            {showColumns.department && employee.departments && employee.departments.length > 0 && (
                <div className={`${styles.employee__column} ${styles.employee__department}`}>
                    {/* Отображаем только первое подразделение */}
                    {employee.departments?.[0]?.title || '-'}
                    {/* Скрываем остальные подразделения */}
                    <span style={{ display: employee.departments?.length > 1 ? 'none' : 'inline' }}>
                        {employee.departments?.slice(1).map((department, index) => (
                            <span key={index} style={{ display: 'none' }}>{department.title}</span>
                        ))}
                    </span>
                </div>
            )}
            {showColumns.email && (
                <div className={`${styles.employee__column} ${styles.employee__email}`}>
                    {employee.email || '-'}
                </div>
            )}
            {showColumns.workPhone && (
                <div className={`${styles.employee__column} ${styles.employee__workPhone}`}>
                    {employee.business_phone || '-'}
                </div>
            )}
            {showColumns.personalPhone && (
                <div className={`${styles.employee__column} ${styles.employee__personalPhone}`}>
                    {employee.phone || '-'}
                </div>
            )}
            {/* Вывод ссылок на социальные сети */}
            {showColumns.tg && (
                <div className={`${styles.employee__column} ${styles.employee__tg}`}>
                    <a href={employee.links?.find(link => link.title === 'tg')?.link ?? '#'}>
                      {employee.links?.find(link => link.title === 'tg')?.link ?? ''}
                    </a>                    
                </div>
            )}

            {showColumns.vk && (
                <div className={`${styles.employee__column} ${styles.employee__vk}`}>
                  <a href={employee.links?.find(link => link.title === 'vk')?.link ?? '#'}>
                    {employee.links?.find(link => link.title === 'vk')?.link ?? ''}
                  </a>                    
                </div>
            )}
            {showColumns.regDate && (
                <div className={`${styles.employee__column} ${styles.employee__regDate}`}>
                    {formatDate(employee.date_joined) || '-'}
                </div>
            )}
        </div>
    </div>
))}
                  </ div >
              </ div >
            </ div >
            {totalPages >= 1 && (
                  <Pagination 
                      totalEmployees={totalEmployees}
                      totalPages={totalPages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                  />
              )}
        </div>
        
        {isSettingsOpen && (
        <CompanyFeatures.CompanyListSettings 
          onSave={handleSaveSettings}
          onClose={() => setIsSettingsOpen(false)} 
          initialSettings={showColumns}
        />
      )}
      </ div >
  );
};

const Pagination = ({ totalEmployees, totalPages, currentPage, setCurrentPage }) => {
  return (
    <div className={styles.pagination}>
      <div className={`${styles.container}`}>
        {currentPage > 1 && (
          <div onClick={() => setCurrentPage(currentPage - 1)} className={`${styles.pagination__arrow} ${styles.prev}`}>
            {/* <img src={icons.arrowPrev} alt="previous page"/> */}
          </div>
        )}

        <div className={styles.pagination__list}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`${styles.pagination__item} ${currentPage === index + 1 ? styles['current-page'] : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentPage < totalPages && (
          <div onClick={() => setCurrentPage(currentPage + 1)} className={`${styles.pagination__arrow} ${styles.next}`}>
            {/* <img src={icons.arrowNext} alt="next page"/>             */}
          </div>
        )}
      </div>
      <div className={styles.employees__countEmployee}>
          Сотрудников:
          <span className={styles.value}> {totalEmployees}</span>
        </div>
        <div className={styles.employees__countPages}>
          Страниц:
          <span className={styles.value}> {totalPages}</span>
        </div>
    </div>
  );
};
