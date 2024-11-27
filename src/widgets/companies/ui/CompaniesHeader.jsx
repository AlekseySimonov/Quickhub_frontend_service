import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'

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

    const [isInviteEmployeePopUpVisible, setIsInvitePopUpVisible] = useState(false);
    const [isCompanySettingsPopUpVisible, setIsSettingsPopUpVisible] = useState(false);
    const [isCreateCompanyPopUpVisible, setIsCreateCompanyPopUpVisible] = useState(false);
    const [isCreateDepartmentPopUpVisible, setIsCreateDepartmentPopUpVisible] = useState(false);

    const handleOpenInviteEmployeePopUp = () => {
    setIsInvitePopUpVisible(true);
    };

    const handleCloseInviteEmployeePopUp = () => {
    setIsInvitePopUpVisible(false);
    };

    const handleOpenCompanySettingsPopUp = () => {
    setIsSettingsPopUpVisible(true);
    };

    const handleCloseCompanySettingsPopUp = () => {
    setIsSettingsPopUpVisible(false);
    };

    const handleOpenCreateCompanyPopUp = () => {
    setIsCreateCompanyPopUpVisible(true);
    };

    const handleCloseCreateCompanyPopUp = () => {
    setIsCreateCompanyPopUpVisible(false);
    };

    const handleOpenCreateDepartmentPopUp = () => {
    setIsCreateDepartmentPopUpVisible(true);
    };

    const handleCloseCreateDepartmentPopUp = () => {
    setIsCreateDepartmentPopUpVisible(false);
    };

    return (
        <div>
            <div className={styles.selecting}>
                <div className={styles.selecting__title}>
                        Выбрать компанию
                    </div>
                    <CompanyChoose 
                        testid="company_selector"
                        styles={styles}
                        onAddCompany={handleOpenCreateCompanyPopUp} 
                    />
                    <div id="company_settings-btn" className={styles.selecting__settings} onClick={handleOpenCompanySettingsPopUp}>
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
                                    placeholder = {'Поиск подразделения'}
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
                            <div className = {styles.management__btn} onClick={handleOpenCreateDepartmentPopUp}>
                                <img src={icons.plus} alt="" />
                                Добавить отдел
                            </div>
                        ) : (
                            <div className = {styles.management__btn} onClick={handleOpenInviteEmployeePopUp}>
                                <img src={icons.plus} alt="" />
                                Пригласить сотрудника
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.popups}>
            {isInviteEmployeePopUpVisible && <CompanyInvite onClose={handleCloseInviteEmployeePopUp} />}
            {isCompanySettingsPopUpVisible && <CompanySettings onClose={handleCloseCompanySettingsPopUp} />}
            {isCreateCompanyPopUpVisible && <CompanyCreate onClose={handleCloseCreateCompanyPopUp} />}
            {isCreateDepartmentPopUpVisible && <CreateDepartment onClose={handleCloseCreateDepartmentPopUp} />}
            </div>
        </div>
    )
}
