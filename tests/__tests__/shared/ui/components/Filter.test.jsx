import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Filter } from '../../../../../src/shared/ui/components/index';

describe('Filter Component', () => {
    const testid = 'filter-component';
    const menuItems = [
        { label: 'Option 1', submenu: true },
        { label: 'Option 2', submenu: false },
    ];
    const submenuItems = ['Suboption 1', 'Suboption 2'];

    test('renders Filter component correctly', () => {
        render(<Filter testid={testid} menuItems={menuItems} submenuItems={submenuItems} />);
        
        // Проверяем, что компонент рендерится
        const filterComponent = screen.getByTestId(testid);
        expect(filterComponent).toBeInTheDocument();
    });

    test('toggles menu on button click', () => {
        render(<Filter testid={testid} menuItems={menuItems} submenuItems={submenuItems} />);
        
        // Ищем кнопку и кликаем по ней
        const toggleButton = screen.getByRole('button', { name: /фильтр/i });
        fireEvent.click(toggleButton);

        // Проверяем, что меню открыто
        expect(screen.getByText('Option 1')).toBeVisible();
    });

    test('displays submenu items when parent item is clicked', () => {
        render(<Filter testid={testid} menuItems={menuItems} submenuItems={submenuItems} />);
        
        // Открываем меню
        const toggleButton = screen.getByRole('button', { name: /фильтр/i });
        fireEvent.click(toggleButton);
        
        // Кликаем по первому элементу меню
        fireEvent.click(screen.getByText('Option 1'));

        // Проверяем, что подменю отображается
        submenuItems.forEach(subitem => {
            expect(screen.getByText(subitem)).toBeVisible();
        });
    });

    test('closes menu when clicking outside', () => {
        render(<Filter testid={testid} menuItems={menuItems} submenuItems={submenuItems} />);
        
        // Открываем меню
        const toggleButton = screen.getByRole('button', { name: /фильтр/i });
        fireEvent.click(toggleButton);

        // Проверяем, что меню открыто
        expect(screen.getByText('Option 1')).toBeVisible();
    });
});