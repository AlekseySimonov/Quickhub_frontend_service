import React from 'react';
import { render, screen } from '@testing-library/react';
import { Search } from '../../../../../src/shared/ui/components/index';
import { icons } from '../../../../../src/shared/ui/icons/header/index';

describe('Search Component', () => {
    const testid = 'search-component';
    const placeholder = 'Поиск...';

    test('renders Search component correctly', () => {
        render(<Search testid={testid} placeholder={placeholder} />);
        
        const searchComponent = screen.getByTestId(testid);
        expect(searchComponent).toBeInTheDocument();
    });

    test('displays the correct placeholder in the input', () => {
        render(<Search testid={testid} placeholder={placeholder} />);
        
        const inputElement = screen.getByPlaceholderText(placeholder);
        expect(inputElement).toBeInTheDocument();
    });

    test('has the correct data-testid attribute', () => {
        render(<Search testid={testid} placeholder={placeholder} />);
        
        const searchComponent = screen.getByTestId(testid);
        expect(searchComponent).toHaveAttribute('data-testid', testid);
    });
});