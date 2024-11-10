import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import { Base } from './../../../src/pages/base/ui/Base';
import { Provider } from "react-redux";
import store from './../../../src/app/store/index';



const renderBase = () => {
    return (
        <Provider store={store}>
        <MemoryRouter>
        <Base/>
        </MemoryRouter>
        </Provider>
    )
}

describe('Base grid change', () => {

    test('Base renders', () => {
        render(renderBase())
        const container = screen.getByTestId('container-test')
        expect(container).toBeInTheDocument()
    })

    test('Verify if gridTemplateColumns has changed', () => {
        render(renderBase())

        const burgerBtn = screen.getByTestId('burger-test')
        const container = screen.getByTestId('container-test')

        expect(container).toHaveStyle('grid-template-columns: 225px auto')

        fireEvent.click(burgerBtn)
        expect(container).toHaveStyle('grid-template-columns: 64px auto')

        fireEvent.click(burgerBtn)
        expect(container).toHaveStyle('grid-template-columns: 225px auto')
    })

    test('Page title changes based on location', () => {
        render(renderBase());
        expect(document.title).toBe('Ошибка')
    })
})