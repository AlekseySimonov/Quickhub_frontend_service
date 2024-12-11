import { useState } from 'react';
import styles from './styles.module.css'
import {UserProfile} from '../index';
import {UserNotification} from '../index';
import {UserPersonalization} from '../index';

export const User = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile styles={styles} />;
      case 'notification':
        return <UserNotification styles={styles} />;
      case 'personalization':
        return <UserPersonalization styles={styles} />;
      default:
        return <UserProfile styles={styles} />;
    }
  };

  return (
    <div className={styles.user}>
      <div className={styles.user__nav}>
        <div className={`${styles.user__tab} ${activeTab === 'profile' ? styles.active : ''}`} onClick={() => setActiveTab('profile')}>Профиль</div>
        <div className={`${styles.user__tab} ${activeTab === 'notification' ? styles.active : ''}`} onClick={() => setActiveTab('notification')}>Уведомления</div>
        <div className={`${styles.user__tab} ${activeTab === 'personalization' ? styles.active : ''}`} onClick={() => setActiveTab('personalization')}>Внешний вид</div>
      </div>
    <div className={styles.user__sections}>
      {renderActiveSection()}
    </div>
  </div>
  );
};
