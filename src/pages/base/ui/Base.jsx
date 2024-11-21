import { Outlet } from "react-router-dom";
import {Header} from "../../../widgets/header/index";
import {Menu} from "../../../widgets/menu/index";
import styles from './styles.module.css';
import {useEffect, useState } from "react";
import { baseTitles } from "../../routing";
import { useSelector } from "react-redux";
import { Loader } from "../../../shared/ui/components";
import { usePageTitle } from "../../../shared/hooks";

export const Base = () => {

    const {status} = useSelector(state => state.company)
    usePageTitle(baseTitles)

    const [isActive, setIsActive] = useState(false)
    const menu = ()=>{
        setIsActive(!isActive)
    }

    const [showLoader, setShowLoader] = useState(false)
    useEffect(() => {
        if (status === 'loading') {
            const timer = setTimeout(() => {
                setShowLoader(true);
            }, 200)

            return () => clearTimeout(timer)
        } else {
            setShowLoader(false)
        }
    }, [status]);

    return (
        <div className = {styles.container}
            style = { {gridTemplateColumns: isActive === true ? '64px auto' : '225px auto'}}
            data-testid = 'container-test'>

        <div className = {styles.header}>
            <Header burgerClick = {menu} />
        </div>
        
        <div className= {styles.menu}>
            <Menu isActive = {isActive} />
        </div>
        <div className={`${styles.content} ${status === 'loading' ? styles.loading : ''}`}>
            {showLoader && (<Loader style = {styles.loader}/>)}
            <Outlet/>
        </div>
        </div>
    )
}
