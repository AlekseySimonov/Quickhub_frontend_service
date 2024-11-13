import {useState } from "react";
import useOnClickOutside from "react-cool-onclickoutside";

export const Select = ({ testid, onAddCompany, styles, options, title}) => {


    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(title|| null);



    const handleClickBtn = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };
    
    const handleOptionClick = (option) => {
        console.log(option) 

        if (option === "+ Добавить компанию") {
            onAddCompany();
            return; // Не закрываем меню
        }

        // Обновляем выбранную опцию
        setSelectedOption(option); 

        setIsOpen(false);

        if (option === "Выйти" && onLogout) {  
            onLogout(); 
        } 
    };

    const ref = useOnClickOutside(() => {
        setIsOpen(false);
    });

    return (
        <div ref={ref} data-testid={testid} className={styles.select}>
            <button
                data-testid='select_btn'
                className={`${styles.select_toggle} ${isOpen ? styles.active : ''}`}
                onClick={handleClickBtn}
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