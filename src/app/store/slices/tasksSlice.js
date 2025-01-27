import { createApi } from "@reduxjs/toolkit/query/react";
import {apiBaseQuery} from "../../../shared/config";
import { URLS } from "../../../shared/api";

export const tasksApiSlice = createApi({
    reducerPath: 'tasks',
    baseQuery: apiBaseQuery(),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: (companyPk) => ({ 
                url: URLS.TASKS.replace('{company_pk}', companyPk), 
                method: 'get' 
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({id}) => ({type: 'Tasks', id})),
                    {type: 'Tasks', id: 'LIST'},
                ]
                : [{type: 'Tasks', id: 'LIST'}],
        }),
        getTask: builder.query({
            query: ({companyPk, id}) => ({
                url:`${URLS.TASKS.replace('{company_pk}', companyPk)}${id}/`,
                method: 'get',
            }), 
            providesTags: (result, args) => 
                result && args?.id ? [{ type: 'Tasks', id: args.id }] : [],
        }),
        postTask: builder.mutation({
            query: ({companyPk, body}) => ({
                url:`${URLS.TASKS.replace('{company_pk}', companyPk)}`,
                method: 'POST',
                data: body,
            }), 
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
        }),
        patchTask: builder.mutation({
            query: ({companyPk, id, body}) => ({
                url:`${URLS.TASKS.replace('{company_pk}', companyPk)}${id}/`,
                method: 'patch',
                data: body,
            }), 
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
        }),
        deleteTask: builder.mutation({
            query: ({companyPk, id}) => ({
                url:`${URLS.TASKS.replace('{company_pk}', companyPk)}${id}/`,
                method: 'delete',
            }), 
            invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
        }),
    })
})

export const {
    useGetTasksQuery, 
	useGetTaskQuery, 
    usePostTaskMutation,
    usePatchTaskMutation,
    useDeleteTaskMutation,
} = tasksApiSlice