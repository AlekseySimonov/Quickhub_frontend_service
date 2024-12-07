import styles from "./header.module.css"
import { NavLink, useLocation } from 'react-router-dom'

import {Search} from '../../../shared/ui/components'
import {Filter} from '../../../shared/ui/components'
import {icons} from '../../../shared/ui/icons/companies'

export const ProjectsHeader = () => {

    const location = useLocation()
    const isEventsPage = location.pathname.includes('/events')
    const isListPage = location.pathname.includes('/list')

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

    return (
        <div className={styles.header}>
        <div className={styles.title}>Проекты</div>
        <div className={styles.toolbar}>
            <div className={styles.navigation}>
                <div className={styles.tabs}>
                    <NavLink to = 'list' className={({ isActive }) =>   
                        isActive ? `${styles.tabs__item} ${styles.active}` : styles.tabs__item}>
                        Список
                    </NavLink>
                    <NavLink to = 'tree' className={({ isActive }) =>   
                        isActive ? `${styles.tabs__item} ${styles.active}` : styles.tabs__item}>
                        Дерево
                    </NavLink>
                    <NavLink to = 'events' className={({ isActive }) =>   
                        isActive ? `${styles.tabs__item} ${styles.active}` : styles.tabs__item}>
                        События
                    </NavLink>
                </div>
                <div className="button"></div>
            </div>
            <div className={styles.interactions}>

                <Search
                    testid = {'search'}
                    placeholder = {'Поиск проекта'}
                />
                
                {isListPage ? (
                    <Filter 
                        testid = {'filter'}
                        menuItems={menuItems} 
                        submenuItems={submenuItems} 
                    />
                ):(null)}
                
                <div className={styles.interactions__btn}>
                    {isEventsPage ? (
                        <div className = {styles.interactions_popup__btn} >
                            <img src={icons.plus} alt="" />
                            Добавить событие
                        </div>
                    ) : (
                        <div className = {styles.interactions_popup__btn}>
                            <img src={icons.plus} alt="" />
                            Добавить проект
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    )
}

