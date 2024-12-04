import { render, screen, fireEvent } from '@testing-library/react';
import { CompanyFeatures } from '../../../src/features/company';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { deleteCompanyAPI, renameCompanyAPI } from '../../../src/app/store/slices/companySlice';

const mockStore = configureStore([]);

jest.mock('../../../src/app/store/slices/companySlice', () => ({
    deleteCompanyAPI: jest.fn(),
    renameCompanyAPI: jest.fn(),
}));

describe('CompanySettings Component', () => {
    let store;
    const mockOnClose = jest.fn();

    beforeEach(() => {
        store = mockStore({
            company: {
                companyID: '1',
                companyTitle: 'Old Company Name',
            },
        });

        store.dispatch = jest.fn();
        render(
            <Provider store={store}>
                <CompanyFeatures.CompanySettings onClose={mockOnClose} />
            </Provider>
        );
        jest.resetAllMocks();
    });

    test('renders correctly with initial state', () => {
        expect(screen.getByText(/настройки компании/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/введите название компании/i)).toHaveValue('Old Company Name');
    });

    test('handles input change', () => {
        const input = screen.getByPlaceholderText(/введите название компании/i);
        fireEvent.change(input, { target: { value: 'New Company Name' } });
        
        expect(input).toHaveValue('New Company Name');
    });

    test('saves new company name when valid', () => {
        const input = screen.getByPlaceholderText(/введите название компании/i);
        fireEvent.change(input, { target: { value: 'New Company Name' } });
        
        fireEvent.click(screen.getByText(/сохранить/i)); // Click the save button

        expect(store.dispatch).toHaveBeenCalledWith(renameCompanyAPI({ id: '1', title: 'New Company Name' }));
        expect(mockOnClose).toHaveBeenCalled();
    });

    test('company with empty name cannot be created', () => {
        window.alert = jest.fn(); // Mock alert
        const input = screen.getByPlaceholderText(/введите название компании/i);
        fireEvent.change(input, { target: { value: '' } });
        
        fireEvent.click(screen.getByText(/сохранить/i)); // Click the save button
    });

    test('shows alert when new name is the same as the old name', () => {
        window.alert = jest.fn(); // Mock alert
        const input = screen.getByPlaceholderText(/введите название компании/i);
        
        fireEvent.change(input, { target: { value: 'Old Company Name' } });
        
        fireEvent.click(screen.getByText(/сохранить/i)); // Click the save button

        expect(window.alert).toHaveBeenCalledWith('Новое название компании должно отличаться от предыдущего');
    });

    test('deletes company when delete button is clicked', () => {
        fireEvent.click(screen.getByText(/удалить компанию/i));

        expect(store.dispatch).toHaveBeenCalledWith(deleteCompanyAPI({ id: '1' }));
        expect(mockOnClose).toHaveBeenCalled();
    });
});