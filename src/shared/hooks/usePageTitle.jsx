import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const usePageTitle = (baseTitles) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const curTitle = baseTitles.find(item => location.pathname.startsWith(item.path));
        
        if (curTitle && curTitle.title) {
            document.title = curTitle.title;
        } else if (document.title !== 'Ошибка') { // Проверяем текущий заголовок
            document.title = 'Ошибка';
            navigate('/error');
        }
    }, [location, baseTitles, navigate]);
};