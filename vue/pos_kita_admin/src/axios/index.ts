import ApiResponse from '@/models/ApiResponse.model';
import { router } from '@/router';
import axios from 'axios';
import { useErrorStore } from "@/store/errorStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
    // Add logic here to intercept requests, e.g., adding headers
    const token = localStorage.getItem('token');
     if (token) {
         config.headers.Authorization = `Bearer ${token}`;
     }
    return config;
});

api.interceptors.response.use(
    (response) => {
        var res: ApiResponse<any> = {
            data: response.data.data,
            meta: response.data.meta ? response.data.meta : null,
            message: response.data.message,
            status: response.data.status,
            statusText: response.statusText,
            headers: response.headers,
            config: response.config
        };
        return res
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                router.push('/auth/login');
            } 
            if (error.response.status === 400) {
                const { status, data } = error.response;
                const errorMessage = data?.message || 'Bad Request. Please check your input.';
                const errorDetails = Array.isArray(data?.error) ? data.error : [data?.error || 'Unknown error'];

                // Use the Pinia store to set the error
                const errorStore = useErrorStore();
                errorStore.setError({ message: errorMessage, details: errorDetails });
            }
            
        }
        return Promise.reject(error);
    }
);

export default api;
