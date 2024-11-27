import { useState } from "react";
import styles from "./styles.module.css";
import useOnclickOutside from "react-cool-onclickoutside";

export const Selector = ({ list, label, inputLabel, onSelect }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filter = list.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ref = useOnclickOutside(() => {
        setDropdownOpen(false);
    });

    const dropdownStyle = {
        top: label ? '84px' : '60px',
    };

    return (
        <div ref={ref} className={styles.row}>
            <div className={styles.label}>{label || <div></div>}</div>
            <input
                className={`${styles.select} ${isDropdownOpen ? styles.active : ''}`} 
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                type="text"
                placeholder={inputLabel}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isDropdownOpen && (
                <div className={styles.dropdown} style={dropdownStyle}>
                    <ul>
                        {filter.map((item) => (
                            <li 
                                className={styles.catalog} 
                                key={item.id} 
                                onClick={() => {
                                    setSearchTerm(item.title);
                                    setDropdownOpen(false);
                                    onSelect(item.title)
                                }}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
