import { createApi } from "@reduxjs/toolkit/query/react";
import {apiBaseQuery} from "../../../shared/config";
import { URLS } from "../../../shared/api";


export const projectsApiSlice = createApi({
    reducerPath: 'projects',
    baseQuery: apiBaseQuery(),
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: (companyPk) => ({ 
                url: URLS.PROJECTS.replace('{company_pk}', companyPk), 
                method: 'get' 
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({id}) => ({type: 'Projects', id})),
                    {type: 'Projects', id: 'LIST'},
                ]
                : [{type: 'Projects', id: 'LIST'}],
        }),
        postProject: builder.mutation({
            query: ({companyPk, body}) => ({
                url:`${URLS.PROJECTS.replace('{company_pk}', companyPk)}`,
                method: 'POST',
                data: body,
            }), 
            invalidatesTags: [{type: 'Projects', id: 'LIST'}]
        }),
    })
})

export const {
    useGetProjectsQuery, 
    usePostProjectMutation,
} = projectsApiSlice