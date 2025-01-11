import styles from './projects.module.css'
import { Outlet, useNavigate } from "react-router-dom"

import { ProjectsHeader } from "./ProjectsHeader"
import { useGetProjectsQuery } from '../../../app/store/slices/projectsSlice'
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { Loader } from '../../../shared/ui/components';
import { useRedirectIfNoCompanies } from '../../../shared/hooks/useRedirectIfNoCompanies';

export const Projects = () => {
    const navigate = useNavigate()
    const {companyID, companiesList} = useSelector(state => state.company);

    useRedirectIfNoCompanies({companyID, companiesList})

    const lastVisitedProjectId = localStorage.getItem('lastVisitedProjectId');

    useEffect(() => {
        if (lastVisitedProjectId) {
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