import { defineStore } from "pinia";
export const useAppStore = defineStore('AppStore', {
  state: () => ({
    currentTheme: 'dark',
    authError: null,
    registerError: null,
    validationError: null,
    fetchPostsError: null,
    fileUploadError: null,
    fetchOnePostError: null,
    addPostError: null,
    deleteAccountError: null,
    deleteAccountSuccess: null,
    isOffline: false,
    msgForOffline: null,
  }),
  actions: {
    setThemeMode(payload) {
      this.currentTheme = payload;
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
    setFetchPostsError(error) {
      this.fetchPostsError = error;
    },
    setFileUploadError(error) {
      this.fileUploadError = error;
    },
    setFetchOnePostError(error) {
      this.fetchOnePostError = error;
    },
    setAddPostError(error) {
      this.addPostError = error;
    },
    setDeleteAccountError(error) {
      this.deleteAccountError = error
    },
    setDeleteAccountSuccess(msg) {
      this.deleteAccountSuccess = msg;
    },
    setNetworkStatus(v) {
      console.log(v);
      if (v) {
        this.isOffline = true;
        this.msgForOffline = "You are offline";
      } else {
        this.isOffline = false;
        this.msgForOffline = null;
      }
    },
    resetErrors() {
      this.registerError = null;
      this.authError = null;
      this.validationError = null;
      this.fetchPostsError = null;
      this.fileUploadError = null;
      this.fetchOnePostError = null;
      this.addPostError = null;
      this.deleteAccountError = null;
      this.deleteAccountSuccess = null;
      this.msgForOffline = null;
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
    },
    getFileUploadError: (state) => {
      return state.fileUploadError;
    }
  },
  persist: true,
});
