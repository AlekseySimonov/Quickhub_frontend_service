import { render,screen} from "@testing-library/react";
import {Header} from '../../src/widgets/header/index'

describe('Header component', ()=>{

    test('Burger render', ()=>{
        render(<Header/>)
        expect(screen.getByTestId('burger-test')).toBeInTheDocument()
        })
    })