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

> [!WARNING]
> Для взаимодействия с API необходимо пользоваться расширением [Moesif Origin/CORS Changer](https://chromewebstore.google.com/detail/moesif-origincors-changer/digfbfaphojjndkpccljibejjbppifbc), если вы пользуетесь Google Chrome. Для других браузеров также необходимо установить расширения для разблокировки CORS-заголовков, или искать другие обходные пути.

## Технические особенности
1. Архитектура приложения - [Feature-Sliced Design](https://react.dev/)
2. В **/src/pages** находятся основные компоненты из которых состоит приложение (): 
    - Авторизация **autorize**
    - Основной интерфейс **base**
3. В **/src/widgets** находятся страницы контента, такие как Проекты (**/projects**), Настройки (**/settings**), Профиль(**/profile**) и т.д.Также здесь помещены компоненты, который образуют **base**: 
4. В **/src/features** находятся компоненты, которые позволяют взаимодействовать с API. К ним относятся pop-ups, settings и т.д.
4. В **/src/entities** находятся составляющие компонент из **/src/widgets**. 
5. Тесты находятся в папке **/tests**. Они написаны на основе библиотеки [Jest](https://jestjs.io/ru/)

### Store
Store и Reducers находятся в **/app/store**. Каждый слайс в **/slices** отвечает за каждую вкладку. В слайсах находится обработка жизненных
циклов асихронных запросов, реализуемых с помощью [RTK-Query](https://redux-toolkit.js.org/rtk-query/overview), также в некоторых местах для более гибких запросов, таких как авторизация пользователя,
использован [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk).

1) **AuthSlice** предназначен для аунтетификации и авторизации пользователя и дальнейшем хранении состояния об авторизованном пользователе (использован только [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk))
    - States
        - isAuth
        - remember
    - Reducers 
        - login
        - registration
        - logout
        - refresh 

2) **userSlice**  предназначен для хранения информации об авторизованном пользователе (не реализован)
    - States
        - email
        - firstName
        - secondName

3) **CompanySlice** предназначен для получения и отправлении информации о компаниях, сохранения и изменения состояний о компании, в которой на данный момент пользователь работает. На данный момент CompanyStructure работает на [RTK-Query](https://redux-toolkit.js.org/rtk-query/overview). В будущем CompanyList будет перенес также на RTK.
    - States
        - companyID
    - Reducers 
        - getCompaniesAPI
        - postCompanyAPI
        - setCompanyID
        - checkCompanyID

### Routing
- Основной роутинг приложения находится в **/src/pages/routing**. Данный роутинг реализован с помощью [React-Router](https://reactrouter.com/), а приложение в **/src/app**
обернуто в **`<RouterProvider />`**
- Переход по страницам сопровождается изменением заголовка (title) страницы.Для отслеживания текущего местоположения на странице реализован кастомный хук `<usePageTitle/>`
- Реализована проверка авторизации пользователя на странице - **RequireAuth** в **/src/shared/config** (скорее всего, данный файл будет перенесен к роутингу). 
Происходит отслеживание состояния isAuth из **store**. При авторизованном пользователе идет переадресация на страницу */tasks* (по умолчанию), а при не авторизованном - */auth/login*
- Если пользователь не имеет в localStorage значения CompanyId, то идет переадресация на */companies* и устанавливается значение для CompanyId (первое значение из пришедшего с сервера списка компаний)

### Основные вкладки 
## Компании (*/companies*)
Данная вкладка состоит из 3-х основных компонентов:
1) <CompanyHeader /> - включает навигацию по вкладке, создание/изменение компании и отдела, приглашение в компанию (не реализовано).
2) <CompanyList /> - отображает сотрудников компании. Позволяет
    - Фильтровать сотрудников по различным условиям (не реализовано)
    - Изменять отображение списка 
    - Производить поиск по списку сотрудников (не реализовано)
3) <CompanyStructure /> отображает дерево компании с помощью библиотек [ReactFlow](https://reactflow.dev/) и [dagre](https://github.com/dagrejs/dagre). Позволяет
    - Удалять/изменять отдел (реализовано частично)
    - Удалять/добавлять сотрудника

## Проекты (*/projects*)
***В разработке*** 

## Мои задачи (*/tasks*)
***В разработке*** 

## Необходимые улучшения
- Полностью перенести общение с API на RTK-Query 
- Оптимизировать CompaniesList 
- Поместить в localStorage необходимые значения и состояния

## Ближайшие улучшения 
-  Создание прав доступа на основе библиотеки [CASL](https://casl.js.org/)
-  Проекты
-  Профиль пользователя
