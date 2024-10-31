import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { icons } from '../../../shared/ui/icons/menu'; 

const Menu = ({isActive}) => {


    return(
        <div data-testid ='nav-test' className={isActive === false ? styles.nav : styles.nav_close}>
            <NavLink to ='/tasks' className={({ isActive }) =>   
                isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }> 
                <img src ={icons.tasks}/>
                <p>Мои задачи </p>
            </NavLink>

            <NavLink to ='/projects' className={({ isActive }) =>   
                isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                <img src ={icons.projects}/> 
                <p>Проекты</p> 
            </NavLink>

            <NavLink to ='/companies' className={({ isActive }) =>   
                isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                <img src ={icons.companies}/> 
                <p>Компании</p>
            </NavLink>

            <NavLink to ='/settings' className={({ isActive }) =>   
                isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                <img src ={icons.settings}/> 
                <p>Настройки </p>
            </NavLink>

            <NavLink to ='/help' className={({ isActive }) =>   
                isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link }>
                <img src ={icons.help}/> 
                <p>Поддержка</p>
            </NavLink>
        </div>
    )
}

export {Menu} 