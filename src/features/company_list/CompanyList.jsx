import React from 'react';
import styles from './CompanyList.module.css';
import { icons } from '../../shared/ui/icons/companies';
import { useSelector } from 'react-redux';

export const CompanyList = () => {
    const companiesList = useSelector(state => state.company.companiesList);

    console.log(companiesList);

    const employees = [
    { id: 1, fullName:'Рождественский Август', email:'aleksey.simonov@mail.ru', phone:'+7 (999)99-99-99', position:'Руководитель', job:'Дизайнер', department:'Отдел дизайна' },
    { id: 2, fullName:'Симонов Алексей-Венедиктов', email:'aleksey.simonov@mail.ru', phone:'+7(999)8884422', position:'Руководитель', job:'Дизайнер', department:'Отдел дизайна' },
    { id: 3, fullName :'Симонов Алексей-Венедиктов', email :'aleksey.simonov@mail.ru', phone :'+7(999)8884422', position :'Наблюдатель', job :'-', department :'-' },
    { id: 4, fullName:'Рождественский Август', email:'aleksey.simonov@mail.ru', phone:'+7 (999)99-99-99', position:'Руководитель', job:'Дизайнер', department:'Отдел дизайна' },
    { id: 5, fullName:'Симонов Алексей-Венедиктов', email:'aleksey.simonov@mail.ru', phone:'+7(999)8884422', position:'Руководитель', job:'Дизайнер', department:'Отдел дизайна' },
    { id:6 , fullName :'Симонов Алексей-Венедиктов', email :'aleksey.simonov@mail.ru', phone :'+7(999)8884422', position :'Наблюдатель', job :'-', department :'-' },
    { id: 7, fullName:'Рождественский Август', email:'aleksey.simonov@mail.ru', phone:'+7 (999)99-99-99', position:'Руководитель', job:'Дизайнер', department:'Отдел дизайна' },
    { id:8, fullName:'Симонов Алексей-Венедиктов', email:'aleksey.simonov@mail.ru', phone:'+7(999)8884422', position:'Руководитель', job:'Дизайнер', department:'Отдел дизайна' },
    { id: 9, fullName :'Симонов Алексей-Венедиктов', email :'aleksey.simonov@mail.ru', phone :'+7(999)8884422', position :'Наблюдатель', job :'-', department :'-' },
    { id: 10, fullName:'Рождественский Август', email:'aleksey.simonov@mail.ru', phone:'+7 (999)99-99-99', position:'Руководитель', job:'Дизайнер', department:'Отдел дизайна' },
    { id: 11, fullName:'Симонов Алексей-Венедиктов', email:'aleksey.simonov@mail.ru', phone:'+7(999)8884422', position:'Руководитель', job:'Дизайнер', department:'Отдел дизайна' },
    { id: 12, fullName :'Симонов Алексей-Венедиктов', email :'aleksey.simonov@mail.ru', phone :'+7(999)8884422', position :'Наблюдатель', job :'-', department :'-' },
    { id: 13, fullName:'Рождественский Август', email:'aleksey.simonov@mail.ru', phone:'+7 (999)99-99-99', position:'Руководитель', job:'Дизайнер', department:'Отдел дизайна' },
    { id: 14, fullName:'Симонов Алексей-Венедиктов', email:'aleksey.simonov@mail.ru', phone:'+7(999)8884422', position:'Руководитель', job:'Дизайнер', department:'Отдел дизайна' },
    { id: 15, fullName :'Симонов Алексей-Венедиктов', email :'aleksey.simonov@mail.ru', phone :'+7(999)8884422', position :'Наблюдатель', job :'-', department :'-' },
    ];

    // Параметры пагинации
    const employeesPerPage = 10;
    const totalEmployees = employees.length ;
    const totalPages = Math.ceil(totalEmployees / employeesPerPage);
    
    const [currentPage, setCurrentPage] = React.useState(1);

    // Вычисляем индекс начала и конца текущей страницы
    const indexOfLastEmployee = currentPage * employeesPerPage ;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage ;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    return (
      <div className={styles.main}>
        <div className={styles.employees}>
            <div className={styles.employees__header}>
                <div className={styles.employees__settings}>
                    <img src={icons.settingsGrey}/>
                </div>
                <div className={`${styles.employees__labels} ${styles.container}`}>
                    <div className={styles.employees__label}>Фото</div>
                    <div className={styles.employees__label}>Имя и фамилия</div>
                    <div className={styles.employees__label}>Email</div>
                    <div className={styles.employees__label}>Рабочий телефон</div>
                    <div className={styles.employees__label}>Должность</div>
                    <div className={styles.employees__label}>Подразделение</div>          
                </div>
            </div>
            
            <div className={styles.employees__list}>
            <div className={styles['employees__list-inner']}>
                {currentEmployees.map((employee) => (
                    <div key={employee.id} className={styles.employees__item}>
                        <div className={`${styles.container} ${styles.employee}`}>
                            <div className={`${styles.employee__column} ${styles.employee__photo}`}>
                                <div className={styles[
                                  'employee__photo-inner']}>
                                  {employee.photo || ' '}
                                </div>
                            </div>
                            <div className={`${styles.employee__column} ${styles.employee__info}`}>
                                <div className={styles.employee__name}>{employee.fullName || ' '}</div>
                                <div className={styles.employee__type}>{employee.position || ' '}</div>
                            </div>
                            <div className={`${styles.employee__column} ${styles.employee__email}`}>{employee.email || ' '}</div>
                            <div className={`${styles.employee__column} ${styles.employee__phone}`}>{employee.phone || ' '}</div>
                            <div className={`${styles.employee__column} ${styles.employee__job}`}>{employee.job || '-'}</div>
                            <div className={`${styles.employee__column} ${styles.employee__department}`}>{employee.department || '-'}</div>
                        </div>
                    </div>
                ))}
            </div>
            </div>

            
            <Pagination 
                totalEmployees={totalEmployees} 
                totalPages={totalPages} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />
        </div>
        </div>
    );
};

const Pagination = ({ totalEmployees, totalPages, currentPage, setCurrentPage }) => {
  return (
    <div className={styles.pagination}>
      <div className={`${styles.container}`}>
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)} className={`${styles.pagination__arrow} ${styles.prev}`}>
            
          </button>
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
          <button onClick={() => setCurrentPage(currentPage + 1)} className={`${styles.pagination__arrow} ${styles.next}`}>
            
          </button>
        )}

        <div className={styles.employees__countEmployee}>
          Всего:
          <span className={styles.value}> {totalEmployees}</span>
        </div>
        <div className={styles.employees__countPages}>
          Страниц:
          <span className={styles.value}> {totalPages}</span>
        </div>
      </div>
    </div>
  );
};
