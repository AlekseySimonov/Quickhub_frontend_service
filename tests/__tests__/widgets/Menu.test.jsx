import { render,screen } from "@testing-library/react";
import {Menu} from '../../../src/widgets/menu/index';
import { BrowserRouter } from "react-router-dom";

const menu = (isActive)=>{
    return(
        <BrowserRouter>
            <Menu isActive={isActive}/>
        </BrowserRouter>
        )
}

describe('Navigation menu', ()=>{

    test('Nav exist', ()=>{
        render(menu())
        expect(screen.getByTestId('nav-test')).toBeInTheDocument()
        })
    
    test('Nav active', ()=>{
        render(menu(false))
        expect(screen.getByTestId('nav-test')).toHaveClass('nav')
        })
    
    test('Nav close', ()=>{
        render(menu(true))
        expect(screen.getByTestId('nav-test')).toHaveClass('nav_close')
        })
    
    test('Nav unknown value', ()=>{
        render(menu(8))
        expect(screen.getByTestId('nav-test')).toHaveClass('nav_close' || 'nav')
        })

    })

