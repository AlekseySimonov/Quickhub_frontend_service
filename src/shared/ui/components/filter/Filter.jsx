import React, { useState } from 'react';
import {icons} from '../../../../shared/ui/icons/companies'
import useOnClickOutside from "react-cool-onclickoutside";

export const Filter = ({ testid, styles, menuItems, submenuItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubmenuIndex, setActiveSubmenuIndex] = useState(null);

    const ref = useOnClickOutside(() => {
      setIsOpen(false);
    });


    const handleClickBtn = () => {
        setIsOpen(true);
    };
  
    const handleItemClick = (index) => {
      if (activeSubmenuIndex === index) {
        setActiveSubmenuIndex(null);
      } else {
        setActiveSubmenuIndex(index);
      }
      setIsOpen(false);
    };
  
    return (
      <div data-testid={testid} className={styles.filter}>
        <button className={styles.filter__toggle} onClick={handleClickBtn}>
            <img src={icons.filter}/>
          Фильтр
        </button>
        <div ref={ref} className={`${styles.filter__menu} ${isOpen ? styles.active : ''}`}>
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
                  <div ref={ref} className={`${styles.filter__submenu} ${activeSubmenuIndex === index ? styles.active : ''}`}>
                    {submenuItems.map((subitem, subIndex) => (
                      <div 
                        key={subIndex} 
                        className={styles.filter__submenu_item} 
                        onClick={() => setIsOpen(false)}
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