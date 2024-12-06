import { NavLink, useMatch } from 'react-router-dom';
import styles from './styles.module.css';
import { icons } from '../../../shared/ui/icons/menu'; 

export const Menu = ({isActive}) => {

    const isCompaniesActive = useMatch('/companies/*')
    const isTasksActive = useMatch('/tasks/*')
    const isProjectsActive = useMatch('/projects/*')
    const isSettingsActive = useMatch('/settings/*')
    const isHelpActive = useMatch('/help/*')


    return(
        <div data-testid ='nav-test' className={isActive === false ? styles.nav : styles.nav_close}>
            <NavLink to ='/tasks' className={() =>   
                isTasksActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }> 
                <img src ={icons.tasks}/>
                <p>Мои задачи </p>
            </NavLink>

            <NavLink to ='/projects' className={() =>   
                isProjectsActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                <img src ={icons.projects}/> 
                <p>Проекты</p> 
            </NavLink>

            <NavLink to ='/companies' className={() =>   
                isCompaniesActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                <img src ={icons.companies}/> 
                <p>Компании</p>
            </NavLink>

            <NavLink to ='/settings' className={() =>   
                isSettingsActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                <img src ={icons.settings}/> 
                <p>Настройки </p>
            </NavLink>

            <NavLink to ='/help' className={() =>   
                isHelpActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                <img src ={icons.help}/> 
                <p>Поддержка</p>
            </NavLink>
        </div>
    )
}