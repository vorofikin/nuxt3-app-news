import { defineStore } from "pinia";
export const useAppStore = defineStore('AppStore', {
    state: () => ({
        currentTheme: 'dark',
        authError: null,
        registerError: null,
        validationError: null,
    }),
    actions: {
        setThemeMode(payload) {
            console.log("action", payload);
            this.currentTheme = payload;
            // localStorage.setItem('currentTheme', payload);
        },
        setAuthError(error) {
            this.authError = error;
        },
        setRegisterErrpr(error) {
            this.registerError = error;
        },
        setValidationError(error) {
            this.validationError = error;
        },
        resetErrors() {
            this.registerError = null;
            this.authError = null;
            this.validationError = null;
        }
    },
    getters: {
        getThemeMode: (state) => {
            return state.currentTheme;
        },
        getAuthError: (state) => {
            return state.authError;
        },
        getRegisterError: (state) => {
            return state.registerError;
        },
        getValidationError: (state) => {
            return state.validationError;
        }
    },
    persist: true,
});
