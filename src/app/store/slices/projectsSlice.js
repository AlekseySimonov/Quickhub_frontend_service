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
        getProject: builder.query({
            query: ({companyPk, id}) => ({
                url:`${URLS.PROJECTS.replace('{company_pk}', companyPk)}${id}/`,
                method: 'get',
            }), 
            providesTags: (result, args) => 
                result && args?.id ? [{ type: 'Projects', id: args.id }] : [],
        }),
        postProject: builder.mutation({
            query: ({companyPk, body}) => ({
                url:`${URLS.PROJECTS.replace('{company_pk}', companyPk)}`,
                method: 'POST',
                data: body,
            }), 
            invalidatesTags: [{type: 'Projects', id: 'LIST'}]
        }),
        patchProject: builder.mutation({
            query: ({companyPk, id, body}) => ({
                url:`${URLS.PROJECTS.replace('{company_pk}', companyPk)}${id}/`,
                method: 'patch',
                data: body,
            }), 
            invalidatesTags: [{type: 'Projects', id: 'LIST'}]
        }),
        deleteProject: builder.mutation({
            query: ({companyPk, id}) => ({
                url:`${URLS.PROJECTS.replace('{company_pk}', companyPk)}${id}/`,
                method: 'delete',
            }), 
            invalidatesTags: [{type: 'Projects', id: 'LIST'}]
        }),
    })
})

export const {
    useGetProjectsQuery, 
    useGetProjectQuery, 
    usePostProjectMutation,
    usePatchProjectMutation,
    useDeleteProjectMutation,
} = projectsApiSlice