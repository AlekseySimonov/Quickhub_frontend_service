import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import tasks from '../../shared/ui/icons/menu/tasks.svg';
import projects from '../../shared/ui/icons/menu/projects.svg';
import companies from '../../shared/ui/icons/menu/companies.svg';
import settings from '../../shared/ui/icons/menu/settings.svg';
import help from '../../shared/ui/icons/menu/help.svg';

const Menu = ({isActive}) => {


    return(

            <div data-testid ='nav-test' className={isActive === false ? styles.nav : styles.nav_close}>
                <NavLink to ='/tasks' className={({ isActive }) =>   
                    isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }> 
                    <img src ={tasks}/>
                    <p>Мои задачи </p>
                </NavLink>

                <NavLink to ='/projects' className={({ isActive }) =>   
                    isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                    <img src ={projects}/> 
                    <p>Проекты</p> 
                </NavLink>

                <NavLink to ='/companies' className={({ isActive }) =>   
                    isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                    <img src ={companies}/> 
                    <p>Компании</p>
                </NavLink>

                <NavLink to ='/settings' className={({ isActive }) =>   
                    isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                    <img src ={settings}/> 
                    <p>Настройки </p>
                </NavLink>

                <NavLink to ='/help' className={({ isActive }) =>   
                    isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                    <img src ={help}/> 
                    <p>Поддержка</p>
                </NavLink>
            </div>
    )
}

export {Menu} 