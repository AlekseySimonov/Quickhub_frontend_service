import {useState } from "react";
import { useSelector } from "react-redux";

export const Select = ({ styles, options}) => {

    const companyTitle = useSelector(state => state.company.companyTitle)

    const defaultOption = companyTitle

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultOption)

    const handleOptionClick = (option) => {
        console.log(option) 

        if (option === "+ Добавить компанию") {
            document.querySelector('.pop-up').style.display = 'block'
            return
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