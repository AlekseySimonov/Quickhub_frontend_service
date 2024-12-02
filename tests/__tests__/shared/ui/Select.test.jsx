import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../../../../src/shared/ui/components/select/Select';

describe('Select Component', () => {
    const mockOnAddCompany = jest.fn();
    const mockSelectOption = jest.fn();
    const options = ["Option 1", "Option 2", "+ Добавить компанию"];
    const title = "Выберите опцию";

    beforeEach(() => {
        render(
            <Select 
                testid="select-component" 
                onAddCompany={mockOnAddCompany} 
                selectOption={mockSelectOption} 
                options={options} 
                title={title} 
                styles={{ select: '', select_toggle: '', active: '', select_menu: '', arrow: '' }} 
            />
        );
    });

    test('renders with initial title', () => {
        expect(screen.getByText(title)).toBeInTheDocument();
    });

    test('toggles dropdown on button click', () => {
        const button = screen.getByTestId('select_btn');

        expect(screen.queryByRole('list')).not.toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.getByRole('list')).toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    test('selects an option and calls selectOption', () => {
        const button = screen.getByTestId('select_btn');
        
        fireEvent.click(button);

        fireEvent.click(screen.getByText(/Option 1/i)); 

        expect(mockSelectOption).toHaveBeenCalledWith("Option 1");
        
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    test('calls onAddCompany when "+ Добавить компанию" is clicked', () => {
        const button = screen.getByTestId('select_btn');

        fireEvent.click(button);
        fireEvent.click(screen.getByText("+ Добавить компанию"));

        expect(mockOnAddCompany).toHaveBeenCalled();
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    test('closes dropdown when clicking outside', () => {
        const button = screen.getByTestId('select_btn');

        fireEvent.click(button);
        expect(screen.getByRole('list')).toBeInTheDocument();

        fireEvent.mouseDown(document);
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
});