import { Route, Routes } from "react-router-dom"
import {MyTasks} from "../../../entities/my_tasks/index"
import {Projects} from "../../../entities/projects/index"
import {Companies} from "../../../entities/companies/index"
import {Settings} from "../../../entities/settings/index"
import {Help} from "../../../entities/help/index"


const BaseRouter = () => {
    return(
        <Routes>
            <Route path='/tasks' title = 'Мои задачи' element={<MyTasks />}/>
            <Route path='/projects' title = 'Проекты' element={<Projects />}/>
            <Route path='/companies' title = 'Компании' element={<Companies />}/>
            <Route path='/settings' title = 'Настройки' element={<Settings />}/>
            <Route path='/help' title = 'Поддержка' element={<Help />}/>
        </Routes>
    )
}

export {BaseRouter}