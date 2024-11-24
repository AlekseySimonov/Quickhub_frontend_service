import React, { useState } from 'react';

const PopupForm = ({ onSave }) => {
  const defaultSettings = {
    photo: true,
    fullName: true,
    patronymic: false,
    city: false,
    gender: false,
    birthDate: false,
    position: true,
    department: true,
    email: true,
    workPhone: true,
    personalPhone: false,
    tg: false,
    vk: false,
    regDate: false,
  };

  const [checkboxes, setCheckboxes] = useState(defaultSettings);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    onSave(checkboxes);
  };

  const handleResetToDefault = () => {
    setCheckboxes(defaultSettings);
  };

  return (
    <div className="wrapper">
      <div className="pop-up">
        <div className="pop-up__header">
          <div className="container">
            <div className="pop-up__title">Настройки списка "Сотрудники"</div>
            <button className="pop-up__closeBtn">
              <span className="pop-up__closeBtn-component"></span>
              <span className="pop-up__closeBtn-component"></span>
            </button>
          </div>
        </div>
        <div className="pop-up__content">
          <div className="container">
            <div className="pop-up__form">
              <div className="pop-up__columns">
                {Object.keys(checkboxes).map((key) => (
                  <label key={key} className="pop-up__checkbox checkbox">
                    <input
                      type="checkbox"
                      name={key}
                      checked={checkboxes[key]}
                      onChange={handleCheckboxChange}
                    />
                    <span className="checkbox__box"></span>
                    <span className="checkbox__label">{key.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
              <div className="pop-up__actions">
                <button type="button" className="pop-up__btn pop-up__btn-default" onClick={handleResetToDefault}>
                  По умолчанию
                </button>
                <button type="button" className="pop-up__btn pop-up__btn-submit" onClick={handleSubmit}>
                  Сохранить
                </button>
                <button type="button" className="pop-up__btn pop-up__btn-cancel" onClick={() => setIsOpen}>
                  Отменить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;