import { useState } from "react";
import styles from "./styles.module.css"
import useOnclickOutside from "react-cool-onclickoutside";

export const Selector = ({list, label, inputLabel}) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filter = list.filter(department =>
        department.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ref = useOnclickOutside(() => {
        setDropdownOpen(false)
    });


    return (
        <div ref={ref} className={styles.row}>
            <div className={styles.label}>{label}</div>
            <input      
                        className={`${styles.select} ${isDropdownOpen ? styles.active : ''}`} 
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        type="text"
                        placeholder= {inputLabel}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
            {isDropdownOpen && (
                <div className={styles.dropdown}>
                    <ul>
                        {filter.map((department) => (
                            <li className = {styles.catalog} key={department.id} onClick={() => {
                                setSearchTerm(department.title)
                                setDropdownOpen(false)
                            }}>
                                {department.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        
    )
}
