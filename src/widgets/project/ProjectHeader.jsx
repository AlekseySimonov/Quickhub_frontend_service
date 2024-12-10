import styles from "./header.module.css"
import { NavLink, useNavigate } from 'react-router-dom'

import {Search} from '../../shared/ui/components'
import { icons } from "../../shared/ui/icons/projects"

export const ProjectHeader = () => {

    const navigate = useNavigate()

    const handleBackBtn = ()=>{
        localStorage.removeItem('lastVisitedProjectId')
        navigate('/projects')
    }

    return (
        <div className={styles.header}>
        <div className={styles.title}>
            <img src = {icons.backBtn} className={styles.arrow} onClick={handleBackBtn}/>
            Проект
        </div>
        <div className={styles.toolbar}>
            <div className={styles.navigation}>
                <div className={styles.tabs}>
                    <NavLink to = 'list' className={({ isActive }) =>   
                        isActive ? `${styles.tabs__item} ${styles.active}` : styles.tabs__item}>
                        Список
                    </NavLink>
                    <NavLink to = 'table' className={({ isActive }) =>   
                        isActive ? `${styles.tabs__item} ${styles.active}` : styles.tabs__item}>
                        Доска
                    </NavLink>
                    <NavLink to = 'calendar' className={({ isActive }) =>   
                        isActive ? `${styles.tabs__item} ${styles.active}` : styles.tabs__item}>
                        Календарь
                    </NavLink>
                    <NavLink to = 'gantt' className={({ isActive }) =>   
                        isActive ? `${styles.tabs__item} ${styles.active}` : styles.tabs__item}>
                        Ганта
                    </NavLink>
                    <NavLink to = 'myplan' className={({ isActive }) =>   
                        isActive ? `${styles.tabs__item} ${styles.active}` : styles.tabs__item}>
                        Мой план
                    </NavLink>
                </div>
                <div className="button"></div>
            </div>
            <div className={styles.interactions}>

                <Search
                    testid = {'search'}
                    placeholder = {'Поиск задачи'}
                />
                
                </div>
            </div>
        </div>
    )
}

