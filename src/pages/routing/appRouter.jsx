import { createBrowserRouter } from "react-router-dom";

import { Base } from "../base";
import { ErrorPage } from "../../shared/ui/components/error/ErrorPage";
import { Projects } from "../../entities/projects";
import { Companies } from "../../entities/companies";
import { MyTasks } from "../../entities/my_tasks";
import { Settings } from "../../entities/settings";
import { Help } from "../../entities/help";

import { AutorizePage } from "../autorize/ui/AutorizePage";
import { Registration } from "../../features/autorize/registration";
import { Login } from "../../features/autorize/login";
import { CheckAuth, IsAuth } from "../../shared/config";

export const authTitles = {
    '/auth/login': 'Вход',
    '/auth/registration': 'Регистрация',
}

export const baseTitles = {
    '/tasks': 'Мои задачи',
    '/projects': 'Проекты',
    '/companies': 'Компании',
    '/settings': 'Настройки',
    '/help': 'Поддержка',
}

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <CheckAuth>
                <Base />
                </CheckAuth>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
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
            },
            {
                path: 'settings',
                element: <Settings />,
            },
            {
                path: 'help',
                element: <Help />,
            },
        ],
    },
    {
        path: '/auth',
        element: <IsAuth>
                <AutorizePage />
                </IsAuth>,
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