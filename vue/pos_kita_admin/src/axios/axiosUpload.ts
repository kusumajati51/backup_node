import { router } from "@/router";
import { useErrorStore } from "@/store/errorStore";
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

const httpUpload: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

httpUpload.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Handle request here, e.g., add authorization headers
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        if (config.headers && config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config;
    },
    (error) => {
        // Handle request error here
        return Promise.reject(error);
    }
);

httpUpload.interceptors.response.use(
    (response: AxiosResponse) => {
        // Handle successful response here
        return response.data;
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
            if (error.response.status === 500) {
                // Assuming you have a store to handle errors
                // useErrorStore().setError({ message: 'Internal Server Error', details: [error.response.data.message] });
            }

        }
        return Promise.reject(error);
    }
);

export default httpUpload;