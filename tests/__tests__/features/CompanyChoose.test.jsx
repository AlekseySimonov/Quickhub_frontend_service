import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { changeCompany } from '../../../src/app/store/slices/companySlice';
import { CompanyFeatures } from './../../../src/features/company/index';

const mockStore = configureStore([]);

describe('CompanyChoose Component', () => {
    const mockOnAddCompany = jest.fn();
    const companiesList = [
        { id: 1, title: 'Компания A' },
        { id: 2, title: 'Компания B' },
        { id: 3, title: 'Компания C' },
    ];

    let store;

    beforeEach(() => {
        store = mockStore({
            company: {
                companiesList: companiesList,
                companyTitle: null 
            }
        });

        render(
            <Provider store={store}>
                <CompanyFeatures.CompanyChoose
                    testid="company-choose"
                    onAddCompany={mockOnAddCompany}
                    styles={{ select: '', select_toggle: '', active: '', select_menu: '', arrow: '' }}
                />
            </Provider>
        );
    });

    test('renders with default text', () => {
        const button = screen.getByTestId('select_btn');
        expect(button).toHaveTextContent('Выберите компанию');
    });

    test('opens the dropdown menu when button is clicked', () => {
        const button = screen.getByTestId('select_btn');
        fireEvent.click(button);
        
        const menu = screen.getByRole('list');
        expect(menu).toBeInTheDocument();
    });

    test('closes the dropdown menu when clicked outside', () => {
        const button = screen.getByTestId('select_btn');
        fireEvent.click(button);
        
        fireEvent.mouseDown(document);
        
        const menu = screen.queryByRole('list');
        expect(menu).not.toBeInTheDocument();
    });

    test('selects a company and updates the button text', () => {
        const button = screen.getByTestId('select_btn');
        fireEvent.click(button);
        
        const companyA = screen.getByText('Компания A');
        fireEvent.click(companyA);

        expect(store.getActions()).toContainEqual({
            type: changeCompany.type,
            payload: { id: 1, title: 'Компания A' }
        });
        
        expect(button).toHaveTextContent('Компания A');
    });

    test('calls onAddCompany when "+ Добавить компанию" is clicked', () => {
        const button = screen.getByTestId('select_btn');
        fireEvent.click(button);
        
        const addCompanyOption = screen.getByText('+ Добавить компанию');
        fireEvent.click(addCompanyOption);
        
        expect(mockOnAddCompany).toHaveBeenCalled();
    });
});