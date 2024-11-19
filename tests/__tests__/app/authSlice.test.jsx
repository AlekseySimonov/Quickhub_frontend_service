import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginAPI, registerAPI, logoutAPI, refreshTokenAPI } from '../../../src/app/store/slices/authSlice';
import { authService } from '../../../src/shared/api/index';

jest.mock('../../../src/shared/api')
const mockWinReload = jest.fn();

describe('authSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({ 
            reducer: { auth: authReducer },
            preloadedState: {
                auth: {
                    status: null,
                    error: null,
                    remember: 'true'
                },
            }, })
        delete window.location
        window.location = Object.defineProperties(
        {},
        {reload: { configurable: true, value: mockWinReload },}
    )
    })

    test('should handle loginAPI fulfilled', async () => {
        const mockResponse = {
            data: {
                access_token: 'mockAccessToken',
                refresh_token: 'mockRefreshToken',
            },
        }

        authService.login.mockResolvedValueOnce(mockResponse)

        const email = 'test@example.com'
        const password = 'password'
        const remember = true

        await store.dispatch(loginAPI({ email, password, remember }))
        const state = store.getState().auth

        expect(state.status).toBe('succeeded')
        expect(state.error).toBeNull()
        expect(localStorage.getItem('remember')).toBe('true')
        expect(localStorage.getItem('accessToken')).toBe('mockAccessToken')
        expect(localStorage.getItem('refreshToken')).toBe('mockRefreshToken')
    });

    test('loginAPI rejected with 400 status', async () => {
        const errorResponse = {
            response: {
                status: 400,
                data: {
                    error: 'Неверный e-mail или пароль',
                },
            },
        };

        authService.login.mockRejectedValueOnce(errorResponse)

        const email = 'test@example.com';
        const password = 'wrongpassword';
        const remember = false;

        await store.dispatch(loginAPI({ email, password, remember }))

        const state = store.getState().auth

        expect(state.status).toBe('failed')
        expect(state.error).toBe('Неверный e-mail или пароль')
    });

    test('loginAPI rejected with 401 status', async () => {
        const errorResponse = {
            response: {
                status: 401,
                data: {
                    error: 'Unauthorized',
                },
            },
        };

        authService.login.mockRejectedValueOnce(errorResponse)

        const email = 'test@example.com'
        const password = 'wrongpassword'
        const remember = false

        await store.dispatch(loginAPI({ email, password, remember }))

        const state = store.getState().auth

        expect(state.status).toBe('failed')
        expect(state.error).toBe('Неверный e-mail или пароль')
    });

    test('registerAPI fulfilled', async () => {
        const mockResponse = { message: 'User registered successfully' }

        authService.register.mockResolvedValueOnce(mockResponse)

        const userData = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            password2: 'password123',
        };

        await store.dispatch(registerAPI(userData))
        
        const state = store.getState().auth

        expect(state.status).toBe('succeeded')
        expect(state.error).toBeNull()
    });

    test('registerAPI rejected with 400 status', async () => {
        const errorResponse = {
            response: {
                status: 400,
                data: {
                    error: 'Registration failed',
                },
            },
        };

        authService.register.mockRejectedValueOnce(errorResponse)

        const userData = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            password2: 'password123',
        };

        await store.dispatch(registerAPI(userData))

        const state = store.getState().auth

        expect(state.status).toBe('failed')
        expect(state.error).toBe('Registration failed')
    });

    test('logoutAPI fulfilled', async () => {
        localStorage.setItem('remember', 'true')
        
        authService.logout.mockResolvedValueOnce({})

        await store.dispatch(logoutAPI())

        const state = store.getState().auth

        expect(state.status).toBe('succeeded')
    });

    test('logoutAPI rejected', async () => {
        const errorResponse = { message: 'Logout failed' }
        
        authService.logout.mockRejectedValueOnce(errorResponse)
        
        await store.dispatch(logoutAPI())
        
        const state = store.getState().auth

        expect(state.status).toBe('failed')
    })

    test('refreshTokenAPI fulfilled', async () => {
        const mockResponse = {
            data: {
                access: 'newAccessToken',
                refresh: 'newRefreshToken',
            },
        };

        localStorage.setItem('remember', 'true');
        localStorage.setItem('refreshToken', 'existingRefreshToken');
        localStorage.setItem('accessToken', 'existingAccessToken');

        authService.refreshToken.mockResolvedValueOnce(mockResponse);

        await store.dispatch(refreshTokenAPI());


        const state = store.getState().auth;

        expect(state.status).toBe('succeeded');
        expect(localStorage.getItem('accessToken')).toEqual(mockResponse.data.access);
        expect(localStorage.getItem('refreshToken')).toEqual(mockResponse.data.refresh);
    });
    

    test('refreshTokenAPI rejected with 401 status', async () => {
        const errorResponse = {
            response: { status: 401, detail: "Unauthorized" }
        }

        authService.refreshToken.mockRejectedValueOnce(errorResponse)

        await store.dispatch(refreshTokenAPI())

        const state = store.getState().auth

        expect(state.status).toBe('failed')
    })
})