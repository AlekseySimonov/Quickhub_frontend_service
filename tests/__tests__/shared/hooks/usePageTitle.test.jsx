import { usePageTitle } from './../../../../src/shared/hooks/usePageTitle';
import { renderHook } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

describe('usePageTitle', () => {
    const mockNavigate = jest.fn();
    const mockUseLocation = useLocation;

    beforeEach(() => {
        jest.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
        document.title = '';
    });

    it('sets the document title based on the baseTitles', () => {
        const baseTitles = [
            { path: '/tasks', title: 'Мои задачи' },
            { path: '/projects', title: 'Проекты' },
        ];

        mockUseLocation.mockReturnValue({ pathname: '/tasks' });
        renderHook(() => usePageTitle(baseTitles));
        expect(document.title).toBe('Мои задачи');
    });

    it('navigates to /error when the path does not match baseTitles', () => {
        const baseTitles = [
            { path: '/tasks', title: 'Мои задачи' },
            { path: '/projects', title: 'Проекты' },
        ];

        mockUseLocation.mockReturnValue({ pathname: '/unknown' });
        renderHook(() => usePageTitle(baseTitles));
        expect(document.title).toBe('Ошибка');
        expect(mockNavigate).toHaveBeenCalledWith('/error');
    });

    it('sets the document title correctly for nested paths', () => {
        const baseTitles = [
            { path: '/projects', title: 'Проекты' },
            { path: '/projects/details', title: 'Детали проекта' },
        ];

        mockUseLocation.mockReturnValue({ pathname: '/projects/details' });

        renderHook(() => usePageTitle(baseTitles));

        expect(document.title).toBe('Проекты');
    });
});