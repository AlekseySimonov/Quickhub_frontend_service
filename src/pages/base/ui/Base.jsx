import {Header} from "../../../widgets/header/index";
import {Menu} from "../../../widgets/menu/index";
import './styles.css';
import { useState } from "react";

const Base = (props) => {
    
    const [isActive, setIsActive] = useState(false)
    
    const menu = ()=>{
        setIsActive(!isActive)
    }

    return (
        <div className = 'container' 
            style = { {gridTemplateColumns: isActive === true ? '64px auto' : '225px auto'}}
            data-testid = 'container-test'
        >
            <Header burgerClick = {menu} />
            <Menu isActive = {isActive} />
            <div className="content">
                {props.children}
            </div>
        </div>  
    )
}

export {Base}