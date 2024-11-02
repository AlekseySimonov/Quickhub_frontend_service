import { useState } from "react"
// import { useState, useEffect, useRef } from "react"
export const DropDown = ({styles, title, options, onLogout})=>{
    const [isOpen, setIsOpen] = useState(false)

    const handleOptionClick = (option) => {  
        console.log(option)
        setIsOpen(false)
        if (option === "Выйти" && onLogout) {  
            onLogout() 
        } 
    }


    return(
        <div className={styles.dropdown}>
            <button
            className={`${styles.dropdown_toggle} ${isOpen ? styles.active : ''}`}
            onClick={() => setIsOpen(!isOpen)}>  
                {title}  
            </button> 
            {isOpen && (  
                <ul className={styles.dropdown_menu}>  
                    {options.map((option, index) => (  
                        <li key={index} onClick={() => handleOptionClick(option)}>  
                            {option}  
                        </li>  
                    ))}  
                </ul>
            )}  
        </div>
        
    )
}
