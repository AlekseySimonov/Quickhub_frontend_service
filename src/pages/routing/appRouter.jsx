import { createBrowserRouter, Navigate } from "react-router-dom";

import { Base } from "../base";
import { ErrorPage } from "../../shared/ui/components/error/ErrorPage";
import { Projects } from "../../widgets/projects";
import { Companies } from "../../widgets/companies";
import { MyTasks } from "../../widgets/my_tasks";
import { Settings } from "../../widgets/settings";
import { Help } from "../../widgets/help";

import { AutorizePage } from "../autorize/ui/AutorizePage";
import { Registration } from "../../features/autorize/registration";
import { Login } from "../../features/autorize/login";

import { CompanyStructure } from "../../features/company_structure";
import { CompanyList } from "../../features/company_list";
// import { CheckAuth, CheckCompanyID, IsAuth } from "../../shared/config";

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
                // <CheckAuth>
                    <Base />
                // </CheckAuth>
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
                        element: <CompanyList />,
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
                // <IsAuth>
                <AutorizePage />
                // </IsAuth>
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