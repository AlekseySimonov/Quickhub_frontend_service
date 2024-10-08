import React, { createContext } from 'react'
import {createRoot} from 'react-dom/client'
import App from './app/App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Store from './shared/model/store'

const store = new Store()
export const Context = createContext({store})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Context.Provider value ={{store}}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </Context.Provider>
  </React.StrictMode>,
)
