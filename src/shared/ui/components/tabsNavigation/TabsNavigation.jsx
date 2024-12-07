import { useState } from 'react';
import styles from './tabsnavigation.module.css';

export const TabsNavigation = ({ testid }) => {
  const initialActiveTab = tabs_navItems.find(item => item.active)?.id || navItems[0].id;
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  

  return (
      <div data-testid={testid} className={styles.tabs}>
        {tabs_navItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.tabs__item} ${activeTab === item.id ? styles.active : ''}`}
            id={`${item.id}-btn`}
            onClick={() => handleTabClick(item.id)}
          >
            {item.label}
          </div>
        ))}
      </div>
  );
};