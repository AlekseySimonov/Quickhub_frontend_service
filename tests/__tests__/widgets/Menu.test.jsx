import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Menu } from '../../../src/widgets/menu';

describe('Navigation menu', () => {
    test('Nav exists', () => {
        render(
            <MemoryRouter>
                <Menu isActive={true} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('nav-test')).toBeInTheDocument();
    });

    test('Nav active when isActive is false', () => {
        render(
            <MemoryRouter>
                <Menu isActive={false} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('nav-test')).toHaveClass('nav');
    });

    test('Nav closed when isActive is true', () => {
        render(
            <MemoryRouter>
                <Menu isActive={true} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('nav-test')).toHaveClass('nav_close');
    });

    test('Nav unknown value results in nav_close class', () => {
        render(
            <MemoryRouter>
                <Menu isActive={8} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('nav-test')).toHaveClass('nav_close');
    });

    test('Highlights the active menu item for /tasks', () => {
        render(
            <MemoryRouter initialEntries={['/tasks']}>
                <Menu isActive={true} />
            </MemoryRouter>
        );
        const tasksLink = screen.getByText(/Мои задачи/i).closest('a');
        expect(tasksLink).toHaveClass('active')
    });

    test('Highlights the active menu item for /projects', () => {
        render(
            <MemoryRouter initialEntries={['/projects']}>
                <Menu isActive={true} />
            </MemoryRouter>
        );
        const projectsLink = screen.getByText(/Проекты/i).closest('a');
        expect(projectsLink).toHaveClass('active')
    });

    test('Highlights the active menu item for /companies/list', () => {
        render(
            <MemoryRouter initialEntries={['/companies/list']}>
                <Menu isActive={true} />
            </MemoryRouter>
        );
        const companiesLink = screen.getByText(/Компании/i).closest('a');
        expect(companiesLink).toHaveClass('active')
    });

    test('Highlights the active menu item for /settings', () => {
        render(
            <MemoryRouter initialEntries={['/settings']}>
                <Menu isActive={true} />
            </MemoryRouter>
        );
        const settingsLink = screen.getByText(/Настройки/i).closest('a');
        expect(settingsLink).toHaveClass('active')
    });

    test('Highlights the active menu item for /help', () => {
        render(
            <MemoryRouter initialEntries={['/help']}>
                <Menu isActive={true} />
            </MemoryRouter>
        );
        const helpLink = screen.getByText(/Поддержка/i).closest('a');
        expect(helpLink).toHaveClass('active')
    });
});

