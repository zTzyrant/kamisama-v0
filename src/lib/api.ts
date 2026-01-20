import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Constants
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Types
export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    code: string;
    message: string;
    data: T;
}

export interface User {
    id: string;
    username: string;
    email: string;
    avatar_url: string | null;
    two_factor_enabled: boolean;
    roles: { id: string; name: string }[];
}

export interface AuthResponse {
    token: string;
    token_expires_at: number;
    refresh_token: string;
    refresh_token_expires_at: number;
    type_: string;
}

// Axios Instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem(ACCESS_TOKEN_KEY);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config);
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        console.log(`[API Response] ${response.status} ${response.config.url}`, response);
        return response;
    },
    async (error: AxiosError) => {
        console.error(`[API Error] ${error.response?.status} ${error.config?.url}`, error.response || error);
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 & Refresh Token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            let refreshToken = null;
            if (typeof window !== 'undefined') {
                refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
            }

            if (refreshToken) {
                try {
                    const { data } = await axios.post<ApiResponse<AuthResponse>>(`${API_URL}/auth/refresh`, {
                        refresh_token: refreshToken,
                    });

                    if (data.status === 'success') {
                        if (typeof window !== 'undefined') {
                            localStorage.setItem(ACCESS_TOKEN_KEY, data.data.token);
                            localStorage.setItem(REFRESH_TOKEN_KEY, data.data.refresh_token);
                        }

                        // Retry original request
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${data.data.token}`;
                        }
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    // Refresh failed, logout
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem(ACCESS_TOKEN_KEY);
                        localStorage.removeItem(REFRESH_TOKEN_KEY);
                        window.location.href = '/login';
                    }
                }
            } else {
                // No refresh token, but don't force logout immediately if we are just checking auth status
                // For now, let's just clear tokens only if we are sure
                if (typeof window !== 'undefined' && localStorage.getItem(ACCESS_TOKEN_KEY)) {
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                    localStorage.removeItem(REFRESH_TOKEN_KEY);
                    // window.location.href = '/login'; 
                }
            }
        }
        return Promise.reject(error);
    }
);

// API Methods
export const authApi = {
    register: (data: any) => api.post<ApiResponse<User>>('/auth/register', data),
    login: (data: any) => api.post<ApiResponse<AuthResponse>>('/auth/login', data),
    verifyEmail: (token: string) => api.post<ApiResponse<null>>('/auth/verify-email', { token }),
    getProfile: () => api.get<ApiResponse<User>>('/auth/profile'),
    logout: (refreshToken: string) => api.post<ApiResponse<null>>('/auth/logout', { refresh_token: refreshToken }),

    // 2FA
    setup2fa: () => api.post<ApiResponse<{ secret: string; qr_code_url: string; backup_codes: string[] }>>('/auth/2fa/setup'),
    confirm2fa: (data: { secret: string; code: string }) => api.post<ApiResponse<{ backup_codes: string[] }>>('/auth/2fa/confirm', data),
    disable2fa: (password: string) => api.post<ApiResponse<null>>('/auth/2fa/disable', { password }),
    verifyLogin2fa: (data: { temp_token: string; code: string }) => api.post<ApiResponse<AuthResponse>>('/auth/2fa/verify-login', data),
};

export const articlesApi = {
    list: (params?: { page?: number; limit?: number; status?: string }) => api.get<ApiResponse<{ data: any[]; meta: any }>>('/articles', { params }),
    get: (id: string) => api.get<ApiResponse<any>>(`/articles/${id}`),
    create: (data: any) => api.post<ApiResponse<any>>('/articles', data),
    update: (id: string, data: any) => api.put<ApiResponse<any>>(`/articles/${id}`, data),
    delete: (id: string) => api.delete<ApiResponse<null>>(`/articles/${id}`),
    getTags: () => api.get<ApiResponse<any[]>>('/articles/tags'),
};


export default api;
