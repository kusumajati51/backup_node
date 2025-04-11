// src/store/errorStore.ts
import { defineStore } from 'pinia';

interface ErrorState {
    errorMessage: string | null;
    errorDetails: string[];
}

export const useErrorStore = defineStore('error', {
    state: (): ErrorState => ({
        errorMessage: null,
        errorDetails: [],
    }),
    actions: {
        setError(payload: { message: string; details: string[] }) {
            this.errorMessage = payload.message;
            this.errorDetails = payload.details;
        },
        clearError() {
            this.errorMessage = null;
            this.errorDetails = [];
        },
    },
});