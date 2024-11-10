# QuickHub frontend service

## Описание
В данном репозитории содержатся исходные коды всего пользовательского интерфейса сайта QuickHub.

## Стэк технологий

[![Vite][shields-vite-domain]](https://vitejs.dev/) </br>
[![React][shields-react-domain]](https://react.dev/) </br>
[![React Router][shields-react-router-domain]](https://reactrouter.com/) </br>
[![Redux Toolkit][shields-redux-domain]](https://redux-toolkit.js.org/) </br>
[![Feature-Sliced Design][shields-fsd-domain]](https://feature-sliced.design/) </br>

[shields-react-router-domain]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[shields-fsd-domain]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&color=F2F2F2&labelColor=262224&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABISURBVHgB7dKxCQAgDETR0w2cws0cys2cwhEUBbsggikCuVekDHwSQFlYo7Q+8KnmtHdFWMdk2cl5wSsbxGSZw8dm8pX9ZHUTMBUgGU2F718AAAAASUVORK5CYII=
[shields-vite-domain]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[shields-react-domain]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[shields-redux-domain]: https://img.shields.io/badge/redux_toolkit-%2320232a.svg?style=for-the-badge&logo=redux&logoColor=%764abc

## Начало работы

Для запуска сервиса на локальной машине:

Клонировать этот репозиторий

`npm install` для установки всех зависимостей из файла `package.json`.

`npm run dev` для запуска Vite dev сервера.

`npm run test` для запуска тестов. 

## Технические особенности
1. Архитектура приложения - [Feature-Sliced Design](https://react.dev/)
2. В **/src/pages** находятся основные компоненты из которых состоит приложение: 
    - Авторизация **autorize**
    - Основной интерфейс **base**
3. В **/src/entities** находятся страницы контента, такие как Проекты (**/projects**), Настройки (**/settings**), Профиль(**/profile**) и т.д.
4. Составляющие **/src/entities** и **/src/pages** находятся в остальных папках согласно документации [FSD](https://react.dev/)
5. Тесты находятся в папке **/tests**

> [!WARNING]
> Для взаимодействия с API необходимо пользоваться расширением [CORS Unblock](https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino), 
если вы пользуетесь Google Chrome. Для других браузеров также необходимо установить расширения для разблокировки CORS-заголовков, или искать другие обходные пути.

### Store
Store и Reducers находятся в **/app/store**. Каждый слайс в **/slices** отвечает за определенные действия для изменения store. В слайсах находится обработка жизненных
циклов асихронных запросов, реализуемых с помощью [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk).


1) **AuthSlice** предназначен для аунтетификации и авторизации пользователя и дальнейшем хранении состояния об авторизованном пользователе
    - States
        - isAuth
    - Reducers 
        - login
        - registration
        - logout

2) **userSlice**  предназначен для хранения информации об авторизованном пользователе
    - States
        - email
        - firstName
        - secondName

3) **CompanySlice** предназначен для получения и отправлении информации о компаниях, сохранения и изменения состояний о компании, в которой на данный момент пользователь работает
    - States
        - companiesList
        - companyID
        - companyTitle
    - Reducers 
        - getCompaniesAPI
        - postCompanyAPI
        - setCompanyID
        - checkCompanyID

### Routing
- Основной роутинг приложения находится в **/src/pages/routing**. Данный роутинг реализован с помощью [React-Router](https://reactrouter.com/), а приложение в **/src/app**
обернуто в **`<RouterProvider />`**
- Переход по страницам сопровождается изменением заголовка (title) страницы.
- Реализована проверка авторизации пользователя на странице - **RequireAuth** в **/src/shared/config** (скорее всего, данный файл будет перенесен к роутингу)
Происходит отслеживание состояния isAuth из **store**. При авторизованном пользователе идет переадресация на страницу */tasks*, а при не авторизованном - */auth/login*
- 

## Ближайшие улучшения 
-  Создать хранилище для состояний
-  Вкладка "Компании"
    - Размещение информации с сервера по блокам
    - Отображение структуры компании с помощью ReactFlow
-  Изменение авторизации под Cookies
-  Профиль пользователя
