import { NavLink, useLocation } from 'react-router-dom'
import { usePopup } from '../../../shared/hooks/index';

import {icons} from '../../../shared/ui/icons/companies'
import styles from './styles.module.css'

import {Search} from '../../../shared/ui/components/index'
import {Filter} from '../../../shared/ui/components/index'

import {CompanyInvite} from '../../../features/company_invite/index'
import {CompanyChoose} from '../../../features/company_choose/index'
import {CompanySettings} from '../../../features/company_settings/index'
import {CompanyCreate} from '../../../features/company_create/index'
import {CreateDepartment} from '../../../features/company_create_department/index';

export const CompaniesHeader = () => {

    const location = useLocation()
    const isStructurePage = location.pathname.includes('/structure')

    const menuItems = [
        { label: 'Все'},
        { label: 'Непрочитанные' },
        { label: 'С меткой' },
        { label: 'С вложениями' },
        { label: 'Сортировка', submenu: true },
    ]

    const submenuItems = [
        'По умолчанию',
        'ФИО: от А до Я',
        'ФИО: от Я до А',
        'По должностям',
    ];

    const inviteEmployeePopup = usePopup();
    const companySettingsPopup = usePopup();
    const createCompanyPopup = usePopup();
    const createDepartmentPopup = usePopup();

    return (
        <div>
            <div className={styles.selecting}>
                <div className={styles.selecting__title}>
                        Выбрать компанию
                    </div>
                    <CompanyChoose 
                        testid="company_selector"
                        styles={styles}
                        onAddCompany={createCompanyPopup.openPopup} 
                    />
                    <div id="company_settings-btn" className={styles.selecting__settings} onClick={companySettingsPopup.openPopup}>
                        <img src={icons.settings} alt="company_settings-btn" />
                    </div>
            </div>
            <div className={styles.toolbar}>
                <div className={styles.navigation}>
                    <div className={styles.tabs}>
                        <NavLink to = 'structure' className={({ isActive }) =>   
                            isActive ? `${styles.tabs__item} ${styles.active}` : styles.tabs__item}>
                            Структура компании
                        </NavLink>
                        <NavLink to = 'list' className={({ isActive }) =>   
                            isActive ? `${styles.tabs__item} ${styles.active}` : styles.tabs__item}>
                            Сотрудники
                        </NavLink>
                    </div>
                    <div className="button"></div>
                </div>
                <div className={styles.employee_management}>
                    <div className={styles.employee_management__search}>
                        <Search
                                    testid = {'search'}
                                    placeholder = {'Поиск отдела'}
                        />
                    </div>
                    <div className={styles.employee_management__filter}>
                        <Filter 
                                    testid = {'filter'}
                                    menuItems={menuItems} 
                                    submenuItems={submenuItems} 
                        />
                    </div>
                    <div className={styles.employee_management__btn}>
                        {isStructurePage ? (
                            <div className = {styles.management__btn} onClick={createDepartmentPopup.openPopup}>
                                <img src={icons.plus} alt="" />
                                Добавить отдел
                            </div>
                        ) : (
                            <div className = {styles.management__btn} onClick={inviteEmployeePopup.openPopup}>
                                <img src={icons.plus} alt="" />
                                Пригласить сотрудника
                            </div>
                        )}
                    </div>
                </div>
            </div>
                {inviteEmployeePopup.isVisible && <CompanyInvite onClose={inviteEmployeePopup.closePopup} />}
                {companySettingsPopup.isVisible && <CompanySettings onClose={companySettingsPopup.closePopup} />}
                {createCompanyPopup.isVisible && <CompanyCreate onClose={createCompanyPopup.closePopup} />}
                {createDepartmentPopup.isVisible && <CreateDepartment onClose={createDepartmentPopup.closePopup} />}
            </div>
    )
}
