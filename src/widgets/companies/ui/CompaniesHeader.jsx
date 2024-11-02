import {DropDown} from '../../../shared/ui/components/index'
import {Search} from '../../../shared/ui/components/index'
import {Filter} from '../../../shared/ui/components/index'
import {icons} from '../../../shared/ui/icons/companies'
import styles from './styles.module.css'
export const CompaniesHeader = () => {
    const dropDownOptions = ['Nike', 'Adidas', 'Добавить компанию'];
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

    return (
        <div>
            <div className={styles.selecting}>
                <div className={styles.selecting__title}>
                        Выбрать компанию
                    </div> 
                    <DropDown
                        styles = {styles}
                        title = {<>
                                    QuickHub
                                    <div className={styles.arrow}> 
                                    </div>
                                </>
                                }
                        options = {dropDownOptions}
                    />
                    <div className={styles.selecting__settings}>
                        <img src={icons.settings} />
                    </div>
            </div>
            <div className={styles.toolbar}>
                <div className={styles.navigation}>
                    <div className={styles.tabs}>
                        <div className={styles.tabs__item}>
                            Структура компании
                        </div>
                        <div className={`${styles.tabs__item} ${styles.active}`}>
                            Сотрудники
                        </div>
                    </div>
                    <div className="button"></div>
                </div>
                <div className={styles.employee_management}>
                    <div className={styles.employee_management__search}>
                        <Search
                                    styles = {styles}
                                    placeholder = {'Поиск подразделения'}
                        />
                    </div>
                    <div className={styles.employee_management__filter}>
                        <Filter 
                                    styles = {styles}
                                    menuItems={menuItems} 
                                    submenuItems={submenuItems} 
                        />
                    </div>
                    <div className={styles.employee_management__btn}>
                        <img src={icons.plus}/>
                        Пригласить сотрудника
                    </div>
                </div>
            </div>
        </div>
    )
}
