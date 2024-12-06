import styles from './projects.module.css'
import { Outlet } from "react-router-dom"
import { Loader } from "../../../shared/ui/components"

import { ProjectsHeader } from "./ProjectsHeader"

export const Projects = () =>{
    const status = null

    return(
        <>
        <div className={`${styles.content} ${status === 'loading' ? styles.loading : ''}`}>
            {status === 'loading' && (<Loader style = {styles.loader}/>)}
            <ProjectsHeader/>
            <div className={styles.main}>
                <Outlet/>
            </div>
        </div>
        </>
    )
}