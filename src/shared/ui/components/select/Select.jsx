import { useState } from "react";

export const Select = ({ styles, options}) => {
    const defaultOption = "QuickHub"; // Опция по умолчанию
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultOption); // Состояние для выбранной опции

    const handleOptionClick = (option) => {
        console.log(option); // Здесь можно обрабатывать нажатие на элемент  

        if (option === "+ Добавить компанию") {
            // Открываем поп-ап и оставляем меню открытым
            document.querySelector('.pop-up').style.display = 'block'; // Показываем поп-ап
            return; // Не закрываем меню
        }

        // Обновляем выбранную опцию
        setSelectedOption(option); 

        setIsOpen(false);

        if (option === "Выйти" && onLogout) {  
            onLogout(); 
        } 
    };

    return (
        <div className={styles.select}>
            <button
                className={`${styles.select_toggle} ${isOpen ? styles.active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >  
                {selectedOption}
                <div className={styles.arrow}></div>
            </button> 
            {isOpen && (  
                <ul className={styles.select_menu}>  
                    {options.filter(option => option !== selectedOption).map((option, index) => (  
                        <li key={index} onClick={() => handleOptionClick(option)}>  
                            {option}  
                        </li>  
                    ))}
                </ul>
            )}  
        </div>
    );
};