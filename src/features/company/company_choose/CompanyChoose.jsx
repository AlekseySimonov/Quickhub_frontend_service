import { useEffect, useState } from "react";
import useOnClickOutside from "react-cool-onclickoutside";
import { changeCompany } from "../../../app/store/slices/companySlice";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles.module.css'

export const CompanyChoose = ({ testid, onAddCompany }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    
    const { companiesList, companyID } = useSelector(state => state.company);

    
    const [ selectedOption, setSelectedOption ] = useState("Выберите компанию");

    useEffect(() => {
        if (Array.isArray(companiesList)) {
            const company = companiesList.find(company => company.id === companyID);
            if (company) {
                setSelectedOption(company.title);
            } else {
                setSelectedOption("Выберите компанию");
            }
        } else {
            setSelectedOption("Выберите компанию");
        }
    }, [companyID, companiesList]);

    const handleClickBtn = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };
    
    const ref = useOnClickOutside(() => {
        setIsOpen(false);
    });
    
    const handleOptionClick = (company) => {
    if (company.title === "+ Добавить компанию") {
        onAddCompany();
    } else {
        dispatch(changeCompany({ id: company.id, title: company.title }));
        localStorage.setItem('currentCompanyID', company.id)
        setSelectedOption(company.title);
    }
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
                    {Array.isArray(companiesList) && companiesList.filter(company => company.title !== selectedOption).map((company) => (  
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