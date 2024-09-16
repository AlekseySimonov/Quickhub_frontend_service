# QuickHub frontend service

## Описание
В данном репозитории содержатся исходные коды всего пользовательского интерфейса сайта QuickHub.

## Стэк технологий

[![Vite][shields-vite-domain]](https://vitejs.dev/) </br>
[![React][shields-react-domain]](https://react.dev/) </br>
[![React Router][shields-react-router-domain]](https://reactrouter.com/) </br>
[![Mobx][shields-mobx-domain]](https://mobx.js.org) </br>
[![Feature-Sliced Design][shields-fsd-domain]](https://feature-sliced.design/) </br>

[shields-react-router-domain]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[shields-fsd-domain]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&color=F2F2F2&labelColor=262224&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABISURBVHgB7dKxCQAgDETR0w2cws0cys2cwhEUBbsggikCuVekDHwSQFlYo7Q+8KnmtHdFWMdk2cl5wSsbxGSZw8dm8pX9ZHUTMBUgGU2F718AAAAASUVORK5CYII=
[shields-vite-domain]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[shields-react-domain]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[shields-mobx-domain]: https://img.shields.io/badge/MobX-F95?logo=mobx&logoColor=fff&style=for-the-badge

## Технические особенности
1. Архитектура приложения - [Feature-Sliced Design](https://react.dev/)
2. В **src/pages/** находятся основные компоненты из которых состоит приложение: 
    - Авторизация: **autorize**
    - Основной интерфейс: **base**
3. В **src/entities** находятся страницы контента, такие как Проекты (**projects**), Настройки (**settings**), Профиль(**profile**) и т.д.
4. Составляющие **src/entities** и **src/pages** находятся в остальных папках согласно документации [FSD](https://react.dev/)

## Ближайшие улучшения 
-  Страница регистрации
-  Профиль пользователя
-  Вкладка "Компании"


## Начало работы

Для запуска сервиса на локальной машине:

Клонировать этот репозиторий

`npm install` для установки всех зависимостей из файла `package.json`.

`npm run dev` для запуска Vite dev сервера.

`npm run test` для запуска тестов. 
