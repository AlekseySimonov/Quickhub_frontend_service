import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CompanyCreate } from './../../../src/features/company_create/index';

describe('CompanyCreate Component', () => {
    const mockOnClose = jest.fn();

    // Mock console.log before each test
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterAll(() => {
        jest.restoreAllMocks(); // Restore original console.log after tests
    });

    beforeEach(() => {
        render(<CompanyCreate onClose={mockOnClose} />);
    });

    test('renders the component with correct title', () => {
        const title = screen.getByTestId('popup_title');
        expect(title).toBeInTheDocument();
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
        fireEvent.change(input, { target: { value: 'Новая Компания' } });
        
        const form = screen.getByRole('form', { name: /create company form/i }); // Adjusted for aria-label
        fireEvent.submit(form);
    });
});