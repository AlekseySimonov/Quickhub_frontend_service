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

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Base />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                path: 'tasks',
                title: 'Мои задачи',
                element: <MyTasks />,
            },
            {
                path: 'projects',
                title: 'Проекты',
                element: <Projects />,
            },
            {
                path: 'companies',
                title: 'Компании',
                element: <Companies />,
            },
            {
                path: 'settings',
                title: 'Настройки',
                element: <Settings />,
            },
            {
                path: 'help',
                title: 'Поддержка',
                element: <Help />,
            },
        ],
    },
    {
        path: '/auth',
        element: <AutorizePage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:'login',
                title: 'Вход',
                element: <Login/>,
            },
            {
                path:'registration',
                title: 'Регистрация',
                element: <Registration />,
            },
        ],
    },
])