import { render, fireEvent } from '@testing-library/react';
import { DropDown } from '../../../../src/shared/ui/components/index';

describe('DropDown Component', () => {
    const mockOnLogout = jest.fn();
    const styles = {
        dropdown: 'dropdown',
        dropdown_toggle: 'dropdown-toggle',
        dropdown_menu: 'dropdown-menu',
        active: 'active'
    };

    const options = [
        { label: 'Профиль', action: jest.fn() },
        { label: 'Настройки', action: jest.fn() },
        { label: 'Выйти', action: mockOnLogout }
    ];

    test('renders correctly with given title and options', () => {
        const { getByText } = render(
            <DropDown styles={styles} titleIcon="" titleName="Меню" options={options} />
        );

        expect(getByText('Меню')).toBeInTheDocument();
        fireEvent.click(getByText('Меню'));
        
        expect(getByText('Профиль')).toBeInTheDocument();
        expect(getByText('Настройки')).toBeInTheDocument();
        expect(getByText('Выйти')).toBeInTheDocument();
    });

    test('toggles dropdown menu on button click', () => {
        const { getByText, queryByText } = render(
            <DropDown styles={styles} titleIcon="" titleName="Меню" options={options} />
        );

        expect(queryByText('Профиль')).not.toBeInTheDocument();

        fireEvent.click(getByText('Меню'));
        expect(getByText('Профиль')).toBeInTheDocument();

        fireEvent.click(getByText('Меню'));
        expect(queryByText('Профиль')).not.toBeInTheDocument();
    });

    test('calls onLogout when "Выйти" option is clicked', () => {
        const { getByText } = render(
            <DropDown styles={styles} titleIcon="" titleName="Меню" options={options} />
        );

        fireEvent.click(getByText('Меню'));

        fireEvent.click(getByText('Выйти'));

        expect(mockOnLogout).toHaveBeenCalledTimes(1);
    });

    test('calls action for "Профиль" option when clicked', () => {
        const profileActionMock = jest.fn();

        const updatedOptions = [
            { label: 'Профиль', action: profileActionMock },
            { label: 'Настройки', action: jest.fn() },
            { label: 'Выйти', action: mockOnLogout }
        ];

        const { getByText } = render(
            <DropDown styles={styles} titleIcon="" titleName="Меню" options={updatedOptions} />
        );

        fireEvent.click(getByText('Меню'));

        fireEvent.click(getByText('Профиль'));

        expect(profileActionMock).toHaveBeenCalledTimes(1);
    });
});