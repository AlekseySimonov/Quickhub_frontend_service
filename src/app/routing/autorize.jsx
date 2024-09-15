import { Route, Routes } from "react-router-dom"
import { Login } from "../../features/autorize/login"
import { Registration } from "../../features/autorize/registration"


const AutorizeRouter = () => {
    return(
        <Routes>
            <Route path='/registration' title = 'Регистрация' element={ <Registration /> }/>
            <Route path='/login' title = 'Вход' element={ <Login /> }/> 
        </Routes>
    )
}

export {AutorizeRouter}