import { api } from './axios';

export const apiBaseQuery = () => async ({ url, method, data, params }) => {
    try {
        const result = await api({
            url,
            method,
            data,
            params,
        })
        return { data: result.data };
    } catch (error) {
        return {
            error: {
                status: error.response?.status,
                data: error.response?.data,
            },
        }
    }
}
