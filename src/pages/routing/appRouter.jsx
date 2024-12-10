import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense } from 'react';

import { Base } from "../base";
import { ErrorPage } from "../../shared/ui/components/error/ErrorPage";
import { Projects } from "../../widgets/projects";
import { Companies } from "../../widgets/companies";
import { MyTasks } from "../../widgets/my_tasks";
import { Settings } from "../../widgets/settings";
import { Help } from "../../widgets/help";

import { AutorizePage } from "../autorize/ui/AutorizePage";
import { Registration } from "../../entities/autorize/registration";
import { Login } from "../../entities/autorize/login";

import { CompanyStructure } from "../../entities/company_structure";
import { CompanyList } from "../../entities/company_list";
import { IsAuth, CheckAuth } from "../../shared/config";
import { Loader } from "../../shared/ui/components";
import { ProjectsTree } from "../../entities/projects_tree";
import { ProjectsList } from "../../entities/projects_list";
import { ProjectsEvents } from "../../entities/projects_events";
import { Project } from "../../widgets/project";
import { ProjectList } from "../../entities/project_list";
import { ProjectTable } from "../../entities/project_table";
import { ProjectCalendar } from "../../entities/project_calendar";
import { ProjectGantt } from "../../entities/project_gantt";
import { ProjectMyPlan } from "../../entities/project_myplan";

export const authTitles = {
    '/auth/login': 'Вход',
    '/auth/registration': 'Регистрация',
}

export const baseTitles = [
        { path: '/tasks', title: 'Мои задачи' },
        { path: '/projects', title: 'Проекты' },
        { path: '/companies', title: 'Компании' },
        { path: '/settings', title: 'Настройки' },
        { path: '/help', title: 'Поддержка' },
    ];

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: 
                <CheckAuth>
                    <Suspense fallback={<Loader />}>
                        <Base />
                    </Suspense>,
                </CheckAuth>
                ,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/tasks" replace />,
            },    
            {
                path: 'tasks',
                element: <MyTasks />,
            },
            {
                path: 'projects',
                element: <Projects />,
                children:[
                    {
                        index: true,
                        element: <Navigate to="list" replace />,
                    },
                    {
                        path: 'tree',
                        element: <ProjectsTree />,
                    },
                    {
                        path: 'list',
                        element: <ProjectsList/>,
                    },
                    {
                        path: 'events',
                        element: <ProjectsEvents/>,
                    },
                    {
                        path: 'project/',
                        element: <Project />,
                        children:[
                    {
                        index: true,
                        element: <Navigate to="list" replace />,
                    },
                    {
                        path: 'list',
                        element: <ProjectList />,
                    },
                    {
                        path: 'table',
                        element: <ProjectTable />,
                    },
                    {
                        path: 'calendar',
                        element: <ProjectCalendar/>,
                    },
                    {
                        path: 'gantt',
                        element: <ProjectGantt/>,
                    },
                    {
                        path: 'myplan',
                        element: <ProjectMyPlan/>,
                    },
                ],
                
            },
                ],
                
            },
            {
                path: 'companies',
                element: <Companies />,
                children:[
                    {
                        index: true,
                        element: <Navigate to="list" replace />,
                    },
                    {
                        path: 'structure',
                        element: <CompanyStructure />,
                    },
                    {
                        path: 'list',
                        element: <CompanyList/>,
                    },
                ],
            },
            {
                path: 'settings',
                element: <Settings />,
            },
            {
                path: 'help',
                element: <Help />,
            },
            {
                path: 'error',
                element: <ErrorPage />
            },
        ],
    },
    {
        path: '/auth',
        element:
                <IsAuth>
                <AutorizePage />
                </IsAuth>
                ,
        errorElement: <ErrorPage />,
        children: [
            {
                path:'login',
                element: <Login/>,
            },
            {
                path:'registration',
                element: <Registration />,
            },
        ],
    },
])