import { createApi } from "@reduxjs/toolkit/query/react";
import {apiBaseQuery} from "../../../shared/config";
import { URLS } from "../../../shared/api";


export const projectsApiSlice = createApi({
    reducerPath: 'projects',
    baseQuery: apiBaseQuery(),
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: (companyPk) => ({ 
                url: URLS.PROJECTS.replace('{company_pk}', companyPk), 
                method: 'get' 
            }),
        })
    })
})

export const {useGetProjectsQuery} = projectsApiSlice