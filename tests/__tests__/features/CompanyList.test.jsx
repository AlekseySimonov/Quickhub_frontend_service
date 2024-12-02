import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CompanyList } from '../../../src/entities/company_list/CompanyList'; 

const mockStore = configureStore([]);

describe('CompanyList Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            company: {
                companyUsers: [],
            },
        });
    });

    test('renders empty state when no employees are present', () => {
        render(
            <Provider store={store}>
                <CompanyList />
            </Provider>
        );

        expect(screen.getByText(/На данный момент в компании нет сотрудников/i)).toBeInTheDocument();
    });

    test('renders employee list when employees are present', () => {
        const employees = [
            { id: 1, first_name: 'Иван', last_name: 'Иванов', position: 'Менеджер', date_joined: '2023-01-01' },
            { id: 2, first_name: 'Петр', last_name: 'Петров', position: 'Разработчик', date_joined: '2023-02-01' },
        ];

        store = mockStore({
            company: {
                companyUsers: employees,
            },
        });

        render(
            <Provider store={store}>
                <CompanyList />
            </Provider>
        );

        expect(screen.getByText(/Петров/i)).toBeInTheDocument();
        expect(screen.getByText(/Иванов/i)).toBeInTheDocument();
    });

    test('opens settings modal when settings button is clicked', () => {
        store = mockStore({
            company: {
                companyUsers: [],
            },
        });

        render(
            <Provider store={store}>
                <CompanyList />
            </Provider>
        );

        fireEvent.click(screen.getByAltText(/Настройки/i));
        expect(screen.getByText(/Сохранить/i)).toBeInTheDocument();
    });
});