import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CompanyInvite } from './../../../src/features/company_invite/index';

describe('CompanyInvite Component', () => {
    const mockOnClose = jest.fn();

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        render(<CompanyInvite onClose={mockOnClose} />);
    });

    test('renders the component with correct title', () => {
        const title = screen.getByTestId('popup_title');
        expect(title).toBeInTheDocument();
    });

    test('switches to "by-link" form when clicked', () => {
        const byLinkNav = screen.getByText('Приглашение по ссылке');
        fireEvent.click(byLinkNav);
        expect(screen.getByTestId('form_by-link'));
    });

    test('switches to "by-personal" form when clicked', () => {
        const byPersonalNav = screen.getByText('Приглашение по Email');
        fireEvent.click(byPersonalNav);
        expect(screen.getByTestId('form_by-personal'));
    });

    test('adds a new row when "Добавить ещё" is clicked', () => {
        const byPersonalNav = screen.getByText('Приглашение по Email');
        fireEvent.click(byPersonalNav);
        
        const addButton = screen.getByText('Добавить ещё');
        fireEvent.click(addButton);
        
        const rows = screen.getAllByPlaceholderText('Введите Email');
        expect(rows).toHaveLength(2);
    });

    test('removes a row when "Удалить" is clicked', () => {
        const byPersonalNav = screen.getByText('Приглашение по Email');
        fireEvent.click(byPersonalNav);
        
        const addButton = screen.getByText('Добавить ещё');
        fireEvent.click(addButton);
        const deleteButton = screen.getByText('Удалить');

        fireEvent.click(deleteButton);
        
        const rows = screen.getAllByPlaceholderText('Введите Email');
        expect(rows).toHaveLength(1);
    });

    test('does not allow adding more than 10 rows', () => {
        const byPersonalNav = screen.getByText('Приглашение по Email');
        fireEvent.click(byPersonalNav);

        for (let i = 0; i < 10; i++) {
            const addButton = screen.getByText('Добавить ещё');
            fireEvent.click(addButton);
        }

        expect(console.log).toHaveBeenCalledWith('Нельзя добавить больше 10 сотрудников за 1 раз');
    });

    test('submits the form and calls console.log with correct data', () => {
        const byPersonalNav = screen.getByText('Приглашение по Email');
        fireEvent.click(byPersonalNav);

        const emailInput = screen.getAllByPlaceholderText('Введите Email')[0];
        const nameInput = screen.getAllByPlaceholderText('Введите имя')[0];
        const surnameInput = screen.getAllByPlaceholderText('Введите фамилию')[0];

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(nameInput, { target: { value: 'Имя' } });
        fireEvent.change(surnameInput, { target: { value: 'Фамилия' } });

        const form = screen.getByTestId('form_by-personal');
        fireEvent.submit(form);

        expect(console.log).toHaveBeenCalledWith('Форма отправлена:', expect.anything());
    });

    test('calls onClose when close button is clicked', () => {
        const closeButton = screen.getByTestId('popup_close');
        fireEvent.click(closeButton);
        
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});