import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Selector } from '../../../../src/shared/ui/components/selector/Selector';

describe('Selector Component', () => {
    const mockList = [
        { id: 1, title: 'Apple' },
        { id: 2, title: 'Banana' },
        { id: 3, title: 'Cherry' },
    ];

    const mockOnSelect = jest.fn();

    beforeEach(() => {
        render(
            <Selector 
                list={mockList} 
                label="Select a fruit" 
                inputLabel="Type to search..." 
                onSelect={mockOnSelect} 
            />
        );
    });

    test('renders the label and input field', () => {
        expect(screen.getByText(/Select a fruit/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Type to search.../i)).toBeInTheDocument();
    });

    test('opens dropdown on input click', () => {
        const input = screen.getByPlaceholderText(/Type to search.../i);
        fireEvent.click(input);
        
        expect(screen.getByText(/Apple/i)).toBeInTheDocument();
        expect(screen.getByText(/Banana/i)).toBeInTheDocument();
        expect(screen.getByText(/Cherry/i)).toBeInTheDocument();
    });

    test('filters the dropdown items based on input', () => {
        const input = screen.getByPlaceholderText(/Type to search.../i);
        fireEvent.click(input);
        
        fireEvent.change(input, { target: { value: 'Ap' } });
        
        expect(screen.getByText(/Apple/i)).toBeInTheDocument();
        expect(screen.queryByText(/Banana/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Cherry/i)).not.toBeInTheDocument();
    });

    test('selects an item from the dropdown', () => {
        const input = screen.getByPlaceholderText(/Type to search.../i);
        fireEvent.click(input);
        
        fireEvent.click(screen.getByText(/Banana/i));
        
        expect(input.value).toBe('Banana');
        expect(mockOnSelect).toHaveBeenCalledWith('Banana');
    });

    test('closes dropdown when clicking outside', () => {
        const input = screen.getByPlaceholderText(/Type to search.../i);
        fireEvent.click(input);

        fireEvent.mouseDown(document);
        
        expect(screen.queryByText(/Apple/i)).not.toBeInTheDocument();
    });
});