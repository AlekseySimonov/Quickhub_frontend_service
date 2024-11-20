import MockAdapter from 'axios-mock-adapter';
import { api } from '../../../../src/shared/config/axios';

describe('API Interceptors', () => {
    let mock;

    const mockWinReload = jest.fn();
    jest.mock('../../../../src/app/store/slices/authSlice', () => ({
    refreshTokenAPI: jest.fn(() => Promise.resolve({ payload: { data: { access: 'new_access_token', refresh: 'new_refresh_token' } } })),
    }));

    beforeEach(() => {
            mock = new MockAdapter(api)
            localStorage.setItem('accessToken', 'old_access_token')
            localStorage.setItem('remember', 'true')
            delete window.location
            window.location = Object.defineProperties(
            {},
            {reload: { configurable: true, value: mockWinReload },

        });
    })

    afterEach(() => {
        mock.restore();
        jest.clearAllMocks();
    });

    test('response for successful requests', async () => {
        const responseData = { data: 'success' }
        mock.onGet('/endpoint').reply(200, responseData)

        const response = await api.get('/endpoint')
        expect(response.data).toEqual(responseData)
    })

    test('400 and 401 status codes', async () => {
        mock.onGet('/endpoint').reply(401);

        await expect(api.get('/endpoint')).rejects.toMatchObject({
            response: { status: 401 }
        });
    });

    test('should handle other status codes', async () => {
        mock.onGet('/endpoint').reply(500);

        await expect(api.get('/endpoint')).rejects.toMatchObject({
            response: { status: 500 }
        });
    });

    test('should successfully refresh token and retry request', async () => {
        // Мокаем ответ, который вызывает ошибку 401
        mock.onGet('/some-endpoint').reply(401);

        // Мокаем успешный ответ после обновления токена
        mock.onGet('/some-endpoint').reply((config) => {
            if (config.headers['Authorization'] === 'Bearer new_access_token') {
                return [200, { data: 'success' }];
            }
            return [401];
        });

        // Имитация обновления токена
        const refreshToken = () => {
            localStorage.setItem('accessToken', 'new_access_token');
            return Promise.resolve({ 
                payload: { data: { access: 'new_access_token', refresh: 'new_refresh_token' } } 
            });
        };

        // Выполняем первый запрос
        const firstResponse = await api.get('/some-endpoint').catch(async (error) => {
            // Здесь мы имитируем вызов обновления токена
            await refreshToken();
            
            // Выполняем повторный запрос с новым токеном
            return await api.get('/some-endpoint');
        });

        // Проверяем, что ответ был успешным
        expect(firstResponse.data).toEqual({ data: 'success' });

        // Проверяем, что новый токен был установлен в заголовках
        expect(mock.history.get[1].headers['Authorization']).toBe('Bearer new_access_token');
    });

    test('requests indefinitely on token refresh failure', async () => {
        mock.onGet('/endpoint').reply(401);

        await expect(api.get('/endpoint')).rejects.toThrow('Request failed with status code 401');

        expect(mock.history.get.length).toBe(1)
    });
})