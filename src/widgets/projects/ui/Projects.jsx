import styles from './projects.module.css'
import { Outlet } from "react-router-dom"
import { Loader } from "../../../shared/ui/components"

import { ProjectsHeader } from "./ProjectsHeader"
import { useGetProjectsQuery } from '../../../app/store/slices/projectsSlice'
import { useSelector } from 'react-redux';

export const Projects = () =>{
    const status = null
    const companyID = useSelector(state => state.company.companyID) 

    const {data = [], isLoading, error} = useGetProjectsQuery(companyID)

    console.log(data, isLoading, error)

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