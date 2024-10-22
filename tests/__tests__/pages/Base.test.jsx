import { render,screen, fireEvent } from "@testing-library/react";
import {Base} from '../../../src/pages/base/index';

const base = ()=>{
    return(
            <Base>
            </Base>
    )
}

describe('Base grid change', ()=>{

    test('Base render', ()=>{
        render(base())
        const container = screen.getByTestId('container-test')
        expect(container).toBeInTheDocument()
        })
    
    test('Verify if gridTemplateColumns has changed', ()=>{
        render(base())

        const burgerBtn = screen.getByTestId('burger-test')
        const container = screen.getByTestId('container-test')

        fireEvent.click(screen.getByTestId('burger-test'));
        expect(container).toHaveStyle('gridTemplateColumns: 64px auto');

        fireEvent.click(burgerBtn);
        expect(container).toHaveStyle('gridTemplateColumns: 225px auto');
        })  

})