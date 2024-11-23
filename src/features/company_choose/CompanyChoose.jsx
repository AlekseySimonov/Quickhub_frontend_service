import { useEffect, useState } from "react";
import useOnClickOutside from "react-cool-onclickoutside";

import { changeCompany } from "../../app/store/slices/companySlice";
import { useDispatch, useSelector } from "react-redux";

export const CompanyChoose = ({ testid, onAddCompany, styles }) => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    
    const {companiesList,companyTitle} = useSelector(state => state.company)

    const [selectedOption, setSelectedOption] = useState(companyTitle || "Выберите компанию")

    useEffect(() => {
        setSelectedOption(companyTitle || "Выберите компанию");
    }, [companyTitle]);

    useEffect(() => {
    }, [companiesList]);

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
        dispatch(changeCompany(company.title));
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