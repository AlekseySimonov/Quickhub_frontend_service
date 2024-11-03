import React, { useState } from 'react';
import {icons} from '../../../../shared/ui/icons/companies'
export const Filter = ({ styles, menuItems, submenuItems }) => {
    const [isActive, setIsActive] = useState(false);
    const [activeSubmenuIndex, setActiveSubmenuIndex] = useState(null);
  
    const toggleMenu = () => {
      setIsActive(!isActive);
    };
  
    const handleItemClick = (index) => {
      if (activeSubmenuIndex === index) {
        setActiveSubmenuIndex(null); // Закрыть подменю, если оно уже открыто
      } else {
        setActiveSubmenuIndex(index); // Открыть новое подменю
      }
      setIsActive(false); // Закрыть основное меню при клике на элемент
    };
  
    return (
      <div className={styles.filter}>
        <div className={styles.filter__toggle} onClick={toggleMenu}>
            <img src={icons.filter}/>
          Фильтр
        </div>
        <div className={`${styles.filter__menu} ${isActive ? styles.active : ''}`}>
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.filter__menu_item} ${item.submenu ? styles.has_child : ''}`} 
              onClick={() => handleItemClick(index)}
            >
              {item.label}
              {item.submenu && (
                <>
                  <div className={styles.arrowFilt}></div>
                  <div className={`${styles.filter__submenu} ${activeSubmenuIndex === index ? styles.active : ''}`}>
                    {submenuItems.map((subitem, subIndex) => (
                      <div 
                        key={subIndex} 
                        className={styles.filter__submenu_item} 
                        onClick={() => setIsActive(false)}
                      >
                        {subitem}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };