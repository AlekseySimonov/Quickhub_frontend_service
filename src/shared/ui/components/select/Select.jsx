import {useEffect, useState } from "react";
import useOnClickOutside from "react-cool-onclickoutside";

export const Select = ({ testid, onAddCompany, styles, options, title, selectOption}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(title|| null);

    useEffect(() => {
        setSelectedOption(title);
    }, [title]);

    const ref = useOnClickOutside(() => {
        setIsOpen(false);
    });


    const handleClickBtn = () => {
        setIsOpen(true);
    };

    const handleOptionClick = (option) => {
        if (option === "+ Добавить компанию") {
            onAddCompany()
            return
        }

        selectOption(option)
        setSelectedOption(option); 
        setIsOpen(false);

        if (option === "Выйти" && onLogout) {  
            onLogout(); 
        } 
    };

    return (
        <div data-testid={testid} className={styles.select}>
            <button
                data-testid='select_btn'
                className={`${styles.select_toggle} ${isOpen ? styles.active : ''}`}
                onClick={handleClickBtn}
            >  
                {selectedOption}
                <div className={styles.arrow}></div>
            </button> 
            {isOpen && (  
                <ul ref={ref} className={styles.select_menu}>  
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