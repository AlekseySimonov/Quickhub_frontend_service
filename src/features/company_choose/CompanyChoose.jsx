import { useEffect, useState } from "react";
import useOnClickOutside from "react-cool-onclickoutside";

export const CompanyChoose = ({ testid, onAddCompany, styles, companiesList, selectedCompanyId, setSelectedCompanyId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);


    useEffect(() => {
        const selectedCompany = companiesList.find(company => company.id === selectedCompanyId);
        setSelectedOption(selectedCompany ? selectedCompany.title : "Выберите компанию");
    }, [selectedCompanyId, companiesList]);

    const handleClickBtn = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };
    
    const ref = useOnClickOutside(() => {
        setIsOpen(false);
    });
    
    const handleOptionClick = (company) => {
        if (company.title === "+ Добавить компанию") {
            onAddCompany();
            setIsOpen(false);
            return;
        }

        setSelectedCompanyId(company.id);
        setSelectedOption(company.title);
        setIsOpen(false);
    };

    return (
        <div ref={ref} data-testid={testid} className={styles.select}>
            <button
                data-testid='select_btn'
                className={`${styles.select_toggle} ${isOpen ? styles.active : ''}`}
                onClick={handleClickBtn}
            >  
                {selectedOption || "Выберите компанию"}
                <div className={styles.arrow}></div>
            </button> 
            {isOpen && (  
                <ul className={styles.select_menu}>  
                    {companiesList.filter(company => company.title !== selectedOption).map((company) => (  
                        <li key={company.id} onClick={() => handleOptionClick(company)}>  
                            {company.title}  
                        </li>  
                    ))}
                    <li onClick={() => handleOptionClick({ title: "+ Добавить компанию" })}>
                        + Добавить компанию
                    </li>
                </ul>
            )}  
        </div>
    );
};