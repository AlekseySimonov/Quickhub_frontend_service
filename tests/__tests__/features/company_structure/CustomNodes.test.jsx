import { render, fireEvent,screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../src/app/store';
import { DepartmentNode } from './../../../../src/features/company_structure/CustomNodes';
import { icons } from './../../../../src/shared/ui/icons/companies/';
import { ReactFlowProvider } from '@xyflow/react';

const renderComponent = (props) => {
    return render(
        <Provider store={store}>
            <ReactFlowProvider>
                <DepartmentNode {...props} />
            </ReactFlowProvider>
        </Provider>
    );
};

const defaultData = {
    id: 1,
    title: 'Engineering',
    color: '#f0f0f0',
    users: [
        { id: 1, fullName: 'John Doe', position: 'Developer', photo: icons.userPhoto },
        { id: 2, fullName: 'Jane Smith', position: 'Designer', photo: icons.userPhoto },
    ],
};

const singleUserData = {
    ...defaultData,
    users: [defaultData.users[0]],
};

const noUsersData = {
    ...defaultData,
    users: [],
};

beforeEach(() => {
    jest.clearAllMocks()
});

describe('DepartmentNode Component', () => {
    test('renders department title and user info', () => {
        renderComponent({ data: defaultData });

        expect(screen.getByText('Engineering')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    test('renders without crashing when title is missing', () => {
        renderComponent({ data: { color: '#f0f0f0', users: [singleUserData.users[0]] } });

        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    test('renders without crashing when color is missing', () => {
        renderComponent({ data: { title: 'Engineering', users: [singleUserData.users[0]] } });

        expect(screen.getByText('Engineering')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    test('renders without crashing when users are missing', () => {
        renderComponent({ data: noUsersData });

        expect(screen.getByText('Engineering')).toBeInTheDocument();
    });

    test('renders employees button when there are multiple users', () => {
        renderComponent({ data: defaultData });

        expect(screen.getByText('Сотрудники')).toBeInTheDocument();
    });

    test('does not render employees button when there is only one user or no users', () => {
        renderComponent({ data: singleUserData });
        expect(screen.queryByText('Сотрудники')).not.toBeInTheDocument();

        renderComponent({ data: noUsersData });
        expect(screen.queryByText('Сотрудники')).not.toBeInTheDocument();
    });
});

describe('DepartmentNode Component - Employees Section', () => {
    test('renders employees section when opened', () => {
    renderComponent({ data: defaultData });

    fireEvent.click(screen.getByText('Сотрудники'));
    const johnDoe = screen.getAllByText('John Doe');

    expect(johnDoe.length).toBe(1)
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    test('closes employees section when close button is clicked', () => {
        renderComponent({ data: defaultData });

        fireEvent.click(screen.getByText('Сотрудники'));
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();

        fireEvent.click(screen.getByAltText('Close'));
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

});

describe('Add Employee Modal', () => {
    test('opens Add Employee modal when button is clicked', () => {
        renderComponent({ data: defaultData });

        fireEvent.click(screen.getByText('Сотрудники'));
        fireEvent.click(screen.getByText('Добавить сотрудника'));
        const addButton = screen.getByText('Добавить');
        expect(addButton).toBeInTheDocument();
    });

    test('closes Add Employee modal when close button is clicked', () => {
    renderComponent({ data: defaultData });
    fireEvent.click(screen.getByText('Сотрудники'));

    fireEvent.click(screen.getByText('Добавить сотрудника'));

    fireEvent.click(screen.getByAltText('CloseBtn'));

    expect(screen.queryByText('Добавить')).not.toBeInTheDocument();
    });
});