import { render, screen, fireEvent } from '@testing-library/react';
import { CompanyChoose } from './../../../src/features/company_choose/index';

describe('CompanyChoose Component', () => {
    const mockOnAddCompany = jest.fn();
    const mockSetSelectedCompanyId = jest.fn();
    const companiesList = [
        { id: 1, title: 'Компания A' },
        { id: 2, title: 'Компания B' },
        { id: 3, title: 'Компания C' },
    ];

    beforeEach(() => {
        render(
            <CompanyChoose
                testid="company-choose"
                onAddCompany={mockOnAddCompany}
                styles={{ select: '', select_toggle: '', active: '', select_menu: '', arrow: '' }}
                companiesList={companiesList}
                selectedCompanyId={null}
                setSelectedCompanyId={mockSetSelectedCompanyId}
            />
        );
    });

    test('renders with default text', () => {
        const button = screen.getByTestId('select_btn');
        expect(button).toHaveTextContent('Выберите компанию');
    });

    test('opens the dropdown menu when button is clicked', () => {
        const button = screen.getByTestId('select_btn');
        fireEvent.click(button);
        
        const menu = screen.getByRole('list');
        expect(menu).toBeInTheDocument();
    });

    test('closes the dropdown menu when clicked outside', () => {
        const button = screen.getByTestId('select_btn');
        fireEvent.click(button);
        
        fireEvent.mouseDown(document);
        
        const menu = screen.queryByRole('list');
        expect(menu).not.toBeInTheDocument();
    });

    test('selects a company and updates the button text', () => {
        const button = screen.getByTestId('select_btn');
        fireEvent.click(button);
        
        const companyA = screen.getByText('Компания A');
        fireEvent.click(companyA);
        
        expect(mockSetSelectedCompanyId).toHaveBeenCalledWith(1);
        expect(button).toHaveTextContent('Компания A');
    });

    test('calls onAddCompany when "+ Добавить компанию" is clicked', () => {
        const button = screen.getByTestId('select_btn');
        fireEvent.click(button);
        
        const addCompanyOption = screen.getByText('+ Добавить компанию');
        fireEvent.click(addCompanyOption);
        
        expect(mockOnAddCompany).toHaveBeenCalled();
    });
});