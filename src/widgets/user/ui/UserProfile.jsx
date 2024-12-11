import { useState } from 'react';

export const UserProfile = ({styles}) => {
    const [isEditable, setIsEditable] = useState(false);
    const toggleEditable = () => {
      setIsEditable(prev => !prev);
    };
  
  return (
    <form method="#" className={styles.profile__form}>
      <div className={`${styles.user__profile} ${styles.section} ${styles.profile}`}>
        <div className={`${styles.profile__card} ${isEditable ? '' : styles.uneditable}`}>
                <div className={styles.profile__picture}>
                    <div className={styles.profile__picture_inner}></div>
                    <div className={styles.profile__editIcon} onClick={toggleEditable}>
                    </div>
                </div>
                <input 
                    placeholder="Симонов Алексей" 
                    className={styles.profile__name} 
                    readOnly={!isEditable} 
                />
                <div className={styles.profile__job}>Финансист</div>
                <div className={styles.profile__position}>Студент</div>
        </div>
        <div className={styles.profile__detailed}>
                <div className={`${styles.profile__personal} ${styles.section} ${styles.profile__section} ${styles.uneditable}`}>
                    <div className={styles.section__heading}>Контактная информация</div>
                    <div className={styles.section__content}>
                        <div className={styles.section__editIcon} onClick={toggleEditable}>
                            {/* Иконка редактирования */}
                            pen
                        </div>
                        <div className={styles.section__row}>
                            <div className={styles.section__input}>
                                <div className={styles.section__input_label}>Имя</div>
                                <input 
                                    className={styles.input} 
                                    placeholder="Введите имя" 
                                    readOnly={!isEditable} 
                                />
                            </div>
                            <div className={styles.section__input}>
                                <div className={styles.section__input_label}>Фамилия</div>
                                <input 
                                    className={styles.input} 
                                    placeholder="Введите фамилию" 
                                    readOnly={!isEditable} 
                                />
                            </div>
                        </div>
                        <div className={styles.section__row}>
                            <div className={styles.section__input}>
                                <div className={styles.section__input_label}>Почта</div>
                                <input 
                                    className={styles.input} 
                                    type="email" 
                                    placeholder="Введите почту" 
                                    readOnly={!isEditable} 
                                />
                            </div>
                        </div>
                        <div className={styles.section__row}>
                            <div className={styles.section__input}>
                                <div className={styles.section__input_label}>Контактный телефон</div>
                                <input 
                                    className={styles.input} 
                                    type="tel" 
                                    placeholder="Введите телефон" 
                                    readOnly={!isEditable} 
                                />
                            </div>
                        </div>
                        <div className={styles.section__row}>
                            <div className={styles.section__input}>
                                <div className={styles.section__input_label}>Telegram</div>
                                <input 
                                    className={styles.input} 
                                    placeholder="Введите Telegram" 
                                    readOnly={!isEditable} 
                                />
                            </div>
                        </div>
                        <div className={styles.section__actions}>
                            {isEditable && (
                                <>
                                    <button type="submit" className={styles.section__saveBtn}>Сохранить</button>
                                    <button type="reset" className={styles.section__resetBtn}>Отменить</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`${styles.profile__about} ${styles.section} ${styles.profile__section} ${styles.uneditable}`}>
                    <div className={styles.section__heading}>Обо мне</div>
                    <div className={styles.section__content}>
                        <div className={styles.section__editIcon} onClick={toggleEditable}>
                            {/* Иконка редактирования */}
                            pen
                        </div>
                        <div className={styles.section__row}>
                            <textarea name="about" readOnly={!isEditable}></textarea>
                        </div>
                        {isEditable && (
                            <div className={styles.section__actions}>
                                <button type="submit" className={styles.section__saveBtn}>Сохранить</button>
                                <button type="reset" className={styles.section__resetBtn}>Отменить</button>
                            </div>
                        )}
                    </div>
                </div>
        </div>
      </div>
    </form>
  );
};
