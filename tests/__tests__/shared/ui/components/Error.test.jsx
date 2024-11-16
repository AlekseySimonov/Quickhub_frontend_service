import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorPage } from '../../../../../src/shared/ui/components/index';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('ErrorPage Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
    });

    test('renders ErrorPage component correctly', () => {
        render(<ErrorPage />);
        
        expect(screen.getByText('404 PAGE')).toBeInTheDocument();
        expect(screen.getByText('. The page you were looking for could not be found')).toBeInTheDocument();
        expect(screen.getByText('... Back home')).toBeInTheDocument();
        
        const imgElement = screen.getByAltText('404');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', 'https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg');
    });

    test('navigates to /companies when Back Home button is clicked', () => {
        render(<ErrorPage />);
        
        // Находим кнопку и кликаем по ней
        const backButton = screen.getByRole('button', { name: /back home/i });
        fireEvent.click(backButton);
        
        // Проверяем, что navigate был вызван с правильным путем
        expect(mockNavigate).toHaveBeenCalledWith('/companies');
    });
});