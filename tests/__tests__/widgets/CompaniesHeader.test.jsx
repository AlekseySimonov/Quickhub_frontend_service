import { render, screen, fireEvent } from "@testing-library/react";
import { CompaniesHeader } from "../../../src/widgets/companies/ui/CompaniesHeader";

const Companies_Header = () => {
    return (
        <CompaniesHeader>
        </CompaniesHeader>
    );
}

describe('Companies_Header', () => {
    test('Проверяем, загружается ли select', () => {
        render(Companies_Header());
        const selectElement = screen.getByTestId('select');
        expect(selectElement).toBeInTheDocument();
    });

    test('Проверяем, загружается ли tabsnavigation', () => {
        render(Companies_Header());
        const tabsnavigationElement = screen.getByTestId('tabsnavigation');
        expect(tabsnavigationElement).toBeInTheDocument();
    });

    test('Проверяем, загружается ли search', () => {
        render(Companies_Header());
        const searchElement = screen.getByTestId('search');
        expect(searchElement).toBeInTheDocument();
    });

    test('Проверяем, загружается ли filter', () => {
        render(Companies_Header());
        const filterElement = screen.getByTestId('filter');
        expect(filterElement).toBeInTheDocument();
    });

    test('Проверяем, открывается ли pop-up: Настройки компании', () => {
        render(Companies_Header());

        const CompanySettings_btn = screen.getByAltText('company_settings-btn');

        fireEvent.click(CompanySettings_btn);

        const CompanySettings = screen.getByTestId('companySettings_popup');
        
        expect(CompanySettings).toBeInTheDocument();

        const closePopUp = screen.getByTestId('popup_close');

        fireEvent.click(closePopUp);
        expect(CompanySettings).not.toBeInTheDocument();

    });
    
    test('Проверяем, открывается ли pop-up: Создать компанию', () => {
        render(Companies_Header());

        fireEvent.click(screen.getByTestId('select_btn'));

        const CreateCompany_btn = screen.getByText('+ Добавить компанию');

        fireEvent.click(CreateCompany_btn);

        const CreateCompany = screen.getByTestId('createCompany_popup');

        expect(CreateCompany).toBeInTheDocument();

        const closePopUp = screen.getByTestId('popup_close');

        fireEvent.click(closePopUp);
        expect(CreateCompany).not.toBeInTheDocument();


    });

    test('Проверяем, открывается ли pop-up: Пригласить сотрудника', () => {
        render(Companies_Header());

        fireEvent.click(screen.getByText('Пригласить сотрудника'));

        const InviteEmployee = screen.getByTestId('inviteEmployee_popup');

        expect(InviteEmployee).toBeInTheDocument();

        const closePopUp = screen.getByTestId('popup_close');

        fireEvent.click(closePopUp);
        expect(InviteEmployee).not.toBeInTheDocument();

    });


});