import { Outlet } from "react-router-dom";
import {Header} from "../../../widgets/header/index";
import {Menu} from "../../../widgets/menu/index";
import styles from './styles.module.css';
import { useEffect, useState } from "react";
import { baseTitles } from "../../routing";
import { usePageTitle } from "../../../shared/hooks/index";
import { useDispatch } from "react-redux";
import { decodeJWT } from "../../../app/store/slices/userSlice";

export const Base = () => {

    usePageTitle(baseTitles)

    const dispatch = useDispatch()

    useEffect (() => {
        dispatch(decodeJWT())
    }, [dispatch])

    const [isActive, setIsActive] = useState(false)
    const menu = ()=>{
        setIsActive(!isActive)
    }

    return (
            <div 
                className = {styles.container}
                style = { {gridTemplateColumns: isActive === true ? '64px auto' : '225px auto'}}
                data-testid = 'container-test'
            >
                <div className = {styles.header}>
                    <Header burgerClick = {menu} />
                </div>
                <div className= {styles.menu}>
                    <Menu isActive = {isActive} />
                </div>
                <div className={styles.content}>
                    <Outlet/>
                </div>
            </div>
    )
}
