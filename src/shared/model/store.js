import { makeAutoObservable } from "mobx"

class Store {
    user = {}
    isAuth = false

    constructor(){
        makeAutoObservable(this)
    }
}

export {Store}