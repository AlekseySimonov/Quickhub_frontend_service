import styles from './project.module.css'
import { Outlet } from "react-router-dom"


import { ProjectHeader } from "./ProjectHeader"
import { Loader } from '../../shared/ui/components'

export const Project = () => {
    const isLoading = false

    return (
        <>
            <div className={`${styles.content} ${isLoading ? styles.loading : ''}`}>
                {isLoading && (<Loader style={styles.loader} />)}
                <ProjectHeader />
                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}