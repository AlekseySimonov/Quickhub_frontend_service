// import { render, screen, fireEvent } from "@testing-library/react";
// import { CompaniesHeader } from "../../../src/widgets/companies/ui/CompaniesHeader";

// const CompanyHeader = () => {
//     return (
//         <CompaniesHeader>
//         </CompaniesHeader>
//     );
// }

// describe('CompaniesHeader', () => {
//     test('Проверяем, загружается ли select', () => {
//         render(CompanyHeader());
//         const selectElement = screen.getByTestId('select');
//         expect(selectElement).toBeInTheDocument();
//     });

//     test('Проверяем, загружается ли tabsnavigation', () => {
//         render(CompanyHeader());
//         const tabsnavigationElement = screen.getByTestId('tabsnavigation');
//         expect(tabsnavigationElement).toBeInTheDocument();
//     });

//     test('Проверяем, загружается ли search', () => {
//         render(CompanyHeader());
//         const searchElement = screen.getByTestId('search');
//         expect(searchElement).toBeInTheDocument();
//     });

//     test('Проверяем, загружается ли filter', () => {
//         render(CompanyHeader());
//         const filterElement = screen.getByTestId('filter');
//         expect(filterElement).toBeInTheDocument();
//     });

//     test('Проверяем, открывается ли pop-up: Настройки компании', () => {
//         render(CompanyHeader());

//         const CompanySettings_btn = screen.getByAltText('company_settings-btn');

//         fireEvent.click(CompanySettings_btn);

//         const CompanySettings = screen.getByTestId('companySettings_popup');
        
//         expect(CompanySettings).toBeInTheDocument();

//         const closePopUp = screen.getByTestId('popup_close');

//         fireEvent.click(closePopUp);
//         expect(CompanySettings).not.toBeInTheDocument();

//     });
    
//     test('Проверяем, открывается ли pop-up: Создать компанию', () => {
//         render(CompanyHeader());

//         fireEvent.click(screen.getByTestId('select_btn'));

//         const CreateCompany_btn = screen.getByText('+ Добавить компанию');

//         fireEvent.click(CreateCompany_btn);

//         const CreateCompany = screen.getByTestId('createCompany_popup');

//         expect(CreateCompany).toBeInTheDocument();

//         const closePopUp = screen.getByTestId('popup_close');

//         fireEvent.click(closePopUp);
//         expect(CreateCompany).not.toBeInTheDocument();


//     });

//     test('Проверяем, открывается ли pop-up: Пригласить сотрудника', () => {
//         render(CompanyHeader());

//         fireEvent.click(screen.getByText('Пригласить сотрудника'));

//         const InviteEmployee = screen.getByTestId('inviteEmployee_popup');

//         expect(InviteEmployee).toBeInTheDocument();

//         const closePopUp = screen.getByTestId('popup_close');

//         fireEvent.click(closePopUp);
//         expect(InviteEmployee).not.toBeInTheDocument();

//     });


// });