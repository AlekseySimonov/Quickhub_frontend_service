import { useState } from "react"
import useOnClickOutside from "react-cool-onclickoutside";

export const DropDown = ({ styles, titleIcon, titleName, options }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (action) => {
        setIsOpen(false);
        if (action) {
            action()
        }
    };

    const ref = useOnClickOutside(() => {
        setIsOpen(false);
    });

    return (
        <div ref={ref} className={styles.dropdown}>
            <button
                className={`${styles.dropdown_toggle} ${isOpen ? styles.active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={styles.profile_icon}>
                    <img src={titleIcon} alt="Profile" />
                </div>
                {titleName}
                <div className={styles.arrow}>
                </div>
            </button>
            {isOpen && (
                <ul className={styles.dropdown_menu}>
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleOptionClick(option.action)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
