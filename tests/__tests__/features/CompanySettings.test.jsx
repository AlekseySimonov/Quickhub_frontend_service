import { render, screen, fireEvent } from '@testing-library/react';
import { CompanySettings } from './../../../src/features/company_settings/index';

describe('CompanySettings Component', () => {
    const mockOnClose = jest.fn();
    const initialTitle = 'Старая Компания';

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        render(<CompanySettings onClose={mockOnClose} companyTitle={initialTitle} />);
        jest.resetAllMocks()
    });

    test('renders the component with correct title', () => {
        const title = screen.getByText('Настройки компании');
        expect(title).toBeInTheDocument();
    });

    test('displays the current company title in the input', () => {
        const input = screen.getByPlaceholderText('Введите название компании');
        expect(input.value).toBe(initialTitle);
    });

    test('allows changing the company name', () => {
        const input = screen.getByPlaceholderText('Введите название компании');
        fireEvent.change(input, { target: { value: 'Новая Компания' } });
        expect(input.value).toBe('Новая Компания');
    });

    test('submits the form and logs the new company name', () => {
        const input = screen.getByPlaceholderText('Введите название компании');
        fireEvent.change(input, { target: { value: 'Новая Компания' } });
        
        const form = screen.getByTestId('form_company-settings');
        fireEvent.submit(form);

        expect(console.log).toHaveBeenCalledWith('Изменить название компании на:', 'Новая Компания');
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('calls onClose when close button is clicked', () => {
        const closeButton = screen.getByTestId('popup_close');
        fireEvent.click(closeButton);
        
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});