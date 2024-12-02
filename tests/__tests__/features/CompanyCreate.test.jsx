import { render, screen, fireEvent } from '@testing-library/react';
import { CompanyCreate } from './../../../src/features/company_create/index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { postCompanyAPI } from '../../../src/app/store/slices/companySlice';


const mockStore = configureStore();

jest.mock('../../../src/app/store/slices/companySlice', () => ({
    postCompanyAPI: jest.fn(),
}));

describe('CompanyCreate Component', () => {
    const mockOnClose = jest.fn();
    let store;

    afterAll(() => {
        jest.restoreAllMocks(); 
    });

    beforeEach(() => {
        store = mockStore({
            user: {
                email: 'test@example.com', 
            },
        });

        store.dispatch = jest.fn(); 
        render(
            <Provider store={store}>
                <CompanyCreate onClose={mockOnClose} />
            </Provider>
        );

        window.alert = jest.fn();
    });

    test('renders the component with correct title', () => {
        const title = screen.getByTestId('popup_title');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Создать компанию');
    });

    test('allows input of company name', () => {
        const input = screen.getByPlaceholderText('Введите название компании');
        fireEvent.change(input, { target: { value: 'Новая Компания' } });
        expect(input.value).toBe('Новая Компания');
    });

    test('calls onClose when the close button is clicked', () => {
        const closeButton = screen.getByTestId('popup_close');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('submits the form and calls onClose', () => {
        const input = screen.getByPlaceholderText('Введите название компании');
        fireEvent.change(input, { target: { value: 'Новая Компания' }});
        
        const form = screen.getByRole('form', { name: /create company form/i });
        fireEvent.submit(form);

        expect(store.dispatch).toHaveBeenCalledWith(postCompanyAPI({ title: 'Новая Компания', email: 'test@example.com' }));
        expect(mockOnClose).toHaveBeenCalled();
    });

    test('does not submit empty company name and shows alert', () => {

        fireEvent.submit(screen.getByRole('form', { name: /create company form/i }));

        expect(window.alert).toHaveBeenCalledWith('Название компании не может быть пустым'); 
        expect(store.dispatch).not.toHaveBeenCalled();
    });
});