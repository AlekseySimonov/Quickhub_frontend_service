import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DropDown } from '../../../../../src/shared/ui/components/index';

describe('DropDown Component', () => {
    const mockOnLogout = jest.fn();
    const styles = {
        dropdown: 'dropdown',
        dropdown_toggle: 'dropdown-toggle',
        dropdown_menu: 'dropdown-menu',
        active: 'active'
    };

    const options = ['Профиль', 'Настройки', 'Выйти'];

    test('renders correctly with given title and options', () => {
        const { getByText } = render(
            <DropDown styles={styles} title="Меню" options={options} onLogout={mockOnLogout} />
        );

        expect(getByText('Меню')).toBeInTheDocument();
        fireEvent.click(getByText('Меню'));
        expect(getByText('Профиль')).toBeInTheDocument();
        expect(getByText('Настройки')).toBeInTheDocument();
        expect(getByText('Выйти')).toBeInTheDocument();
    });

    test('toggles dropdown menu on button click', () => {
        const { getByText, queryByText } = render(
            <DropDown styles={styles} title="Меню" options={options} onLogout={mockOnLogout} />
        );


        expect(queryByText('Профиль')).not.toBeInTheDocument();

        fireEvent.click(getByText('Меню'));
        expect(getByText('Профиль')).toBeInTheDocument();


        fireEvent.click(getByText('Меню'));
        expect(queryByText('Профиль')).not.toBeInTheDocument();
    });

    test('calls onLogout when "Выйти" option is clicked', () => {
        const { getByText } = render(
            <DropDown styles={styles} title="Меню" options={options} onLogout={mockOnLogout} />
        );

        fireEvent.click(getByText('Меню'));

        fireEvent.click(getByText('Выйти'));

        expect(mockOnLogout).toHaveBeenCalledTimes(1);
    });
});