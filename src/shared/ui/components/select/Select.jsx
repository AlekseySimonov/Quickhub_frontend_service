import {useEffect, useState } from "react";

export const Select = ({ testid, onAddCompany, styles, options, title}) => {


    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(title|| null);

    useEffect(() => {
        setSelectedOption(title);
    }, [title]);

    const handleOptionClick = (option) => {
        console.log(option) 

        if (option === "+ Добавить компанию") {
            onAddCompany();
            return
        }

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