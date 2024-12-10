import styles from './project.module.css'
import { Outlet, useParams } from "react-router-dom"


import { ProjectHeader } from "./ProjectHeader"
import { Loader } from '../../shared/ui/components'
import { useEffect } from 'react'

export const Project = () => {

    const { projectid } = useParams();

    useEffect(() => {
        localStorage.setItem('lastVisitedProjectId', projectid);
    }, [projectid]);
    
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