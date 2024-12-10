import styles from './projects.module.css'
import { Outlet, useNavigate } from "react-router-dom"

import { ProjectsHeader } from "./ProjectsHeader"
import { useGetProjectsQuery } from '../../../app/store/slices/projectsSlice'
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { Loader } from '../../../shared/ui/components';

export const Projects = () => {
    const navigate = useNavigate()
    const companyID = useSelector(state => state.company.companyID);

    useEffect(() => {
        if (companyID === null) {
            navigate('/companies');
        }
    }, [companyID, navigate]);

    const lastVisitedProjectId = localStorage.getItem('lastVisitedProjectId');

    useEffect(() => {
        if (lastVisitedProjectId) {
            // Логика для проверки существования проекта
            const projectExists = true
            if (projectExists) {
                navigate(`/projects/${lastVisitedProjectId}`);
            }
        }
    }, [lastVisitedProjectId, navigate]);

    const { isLoading } = useGetProjectsQuery(companyID, {
        skip: companyID === null 
    });

    return (
        <>
            <div className={`${styles.content} ${isLoading ? styles.loading : ''}`}>
                {isLoading && (<Loader style={styles.loader} />)}
                <ProjectsHeader />
                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}