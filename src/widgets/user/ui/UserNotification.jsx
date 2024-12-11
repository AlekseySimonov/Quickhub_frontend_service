import React from 'react';

export const UserNotification = ({styles}) => {
  return (
    <div className={`${styles.user__section} ${styles.user__notification} ${styles.notification}`}>
      <div className={`${styles.notification__section} ${styles.notification__reminders}  ${styles.reminders}`}>
        <div className={styles.section__heading}>Напоминания</div>
        <div className={styles.section__content}>
          <div className={styles.reminders__row}>
            <div className={styles.content_heading}>Напоминать о предстоящих задачах</div>
            <div className={styles.content_element}>
              <div className={styles.select}>1 день до</div> в <div className={styles.select}>8:00</div>
            </div>
          </div>
          <div className={styles.reminders__row}>
            <div className={styles.content_heading}>Напоминать о предстоящих задачах со временем выполнения</div>
            <div className={styles.content_element}>
              <div className={styles.select}>За 30 минут до</div>
            </div>
          </div>
          <div className={styles.reminders__row}>
            <div className={styles.content_heading}>Напоминать о просроченных задачах</div>  
            <div className={styles.content_element}>
              <div className={styles.select}>В начале следующей недели</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.notification__section} ${styles.notification__pushes} ${styles.pushes}`}>
        <div className={styles.section__heading}>Уведомления</div>
        <div className={styles.section__content}>
          <div className={styles.pushes__header}>
            <div className={`${styles.pushes__label} ${styles.pushes__label_event}`}>Событие</div>
            <div className={`${styles.pushes__label} ${styles.pushes__label_alarm}`}>Звуковое уведомление</div>
            <div className={`${styles.pushes__label} ${styles.pushes__label_browser}`}>Уведомление в браузере</div>
          </div>
          <div className={styles.pushes__content}>
            <div className={styles.pushes__events}>
              <div className={styles.event_title}>Сообщение в чате задачи</div>
              <div className={styles.event_title}>Назначение вас исполнителем</div>
              <div className={styles.event_title}>Пропуск дедлайна</div>
              <div className={styles.event_title}>Выполнение задачи</div>
            </div>
            <div className={styles.pushes__form}>
                <div className={styles.event_toggles}>
                    <div className={styles.event_toggler}></div>
                    <div className={styles.event_toggler}></div>         
                </div>
                <div className={styles.event_toggles}>
                    <div className={styles.event_toggler}></div>
                    <div className={styles.event_toggler}></div>         
                </div>
                <div className={styles.event_toggles}>
                    <div className={styles.event_toggler}></div>
                    <div className={styles.event_toggler}></div>         
                </div>
                <div className={styles.event_toggles}>
                    <div className={styles.event_toggler}></div>
                    <div className={styles.event_toggler}></div>         
                </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
  );
};
