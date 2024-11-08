import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import {Select} from '../../../shared/ui/components/index'
import {Search} from '../../../shared/ui/components/index'
import {Filter} from '../../../shared/ui/components/index'
import {TabsNavigation} from '../../../shared/ui/components/index'
// popups
import {Invite_Employee} from '../../../shared/ui/components/index'
import {Company_Settings} from '../../../shared/ui/components/index'
import {Create_Company} from '../../../shared/ui/components/index'


import {icons} from '../../../shared/ui/icons/companies'
import styles from './styles.module.css'

import { useSelector } from 'react-redux'

export const CompaniesHeader = () => {

    const {companiesList} = useSelector(state => state.company)

    const selectOptions = [...companiesList.map(company => company.title), '+ Добавить компанию'];
    const companyTitle = useSelector(state => state.company.companyTitle)

    const menuItems = [
        { label: 'Все'},
        { label: 'Непрочитанные' },
        { label: 'С меткой' },
        { label: 'С вложениями' },
        { label: 'Сортировка', submenu: true },
    ];
    
    const submenuItems = [
        'По умолчанию',
        'ФИО: от А до Я',
        'ФИО: от Я до А',
        'По должностям',
    ];

    const tabs_navItems = [
        { id: 'structure_company', label: 'Структура компании', active: false },
        { id: 'company_employees', label: 'Сотрудники', active: true },
    ];


    const [isInviteEmployeePopUpVisible, setIsInvitePopUpVisible] = useState(false);
    const [isCompanySettingsPopUpVisible, setIsSettingsPopUpVisible] = useState(false);
    const [isCreateCompanyPopUpVisible, setIsCreateCompanyPopUpVisible] = useState(false);

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

    return (
        <div>
            <div className={styles.selecting}>
                <div className={styles.selecting__title}>
                        Выбрать компанию
                    </div> 
                    <Select
                        testid = {'select'}
                        styles = {styles}
                        title = {companyTitle}
                        options = {selectOptions}
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
                                    styles = {styles}
                                    placeholder = {'Поиск подразделения'}
                        />
                    </div>
                    <div className={styles.employee_management__filter}>
                        <Filter 
                                    testid = {'filter'}
                                    styles = {styles}
                                    menuItems={menuItems} 
                                    submenuItems={submenuItems} 
                        />
                    </div>
                    <div id="invite_employee-btn" className={styles.employee_management__btn} onClick={handleOpenInviteEmployeePopUp}>
                        <img src={icons.plus}/>
                        Пригласить сотрудника
                    </div>
                </div>
            </div>
            <div className={styles.popups}>
            {isInviteEmployeePopUpVisible && <Invite_Employee onClose={handleCloseInviteEmployeePopUp} />}
            {isCompanySettingsPopUpVisible && <Company_Settings onClose={handleCloseCompanySettingsPopUp} />}
            {isCreateCompanyPopUpVisible && <Create_Company onClose={handleCloseCreateCompanyPopUp} />}
            </div>
        </div>
    )
}
