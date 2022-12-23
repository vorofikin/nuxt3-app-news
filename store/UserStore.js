import { defineStore } from "pinia";
import { useAppStore } from "~/store/AppStore";

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    email: null,
    token: null,
    fullname: null,
    isAuth: false,
    id: null,
  }),
  actions: {
    setUsername(payload) {
      this.fullname = payload;
    },
    setUserData(payload) {
      const { email, token, firstName, lastName, id } = payload;
      this.fullname = firstName + lastName;
      this.token = token;
      this.email = email;
      this.id = id;
      this.isAuth = true;
    },
    resetUserData() {
      this.fullname = null;
      this.token = null;
      this.email = null;
      this.isAuth = false;
    },
    async registration(payload) {
      const AppStore = useAppStore();
      try {
        const response = await $fetch("api/registration", {
          method: "post",
          body: payload
        });
        this.setUserData(response);
        this.setUsername(`${response.firstName} ${response.lastName}`);
        this.isAuth = true;
      } catch (e) {
        AppStore.setRegisterErrpr(e);
      }
    },
    async login(payload) {
      const AppStore = useAppStore();
      try {
        const response = await $fetch('api/login', {
          method: "post",
          body: payload
        });
        this.setUserData(response);
        this.isAuth = true;
      } catch (e) {
        AppStore.setAuthError(e);
        return Promise.reject(e);
      }
    },
    async deleteUserAccount() {
      const AppStore = useAppStore();
      const UserStore = useUserStore();
      const userEmail = UserStore.$state.email;
      try {
        const response = await $fetch('api/delete-account', {
          method: "DELETE",
          body: userEmail
        });
        this.resetUserData();
        AppStore.setDeleteAccountSuccess(response.message);
      } catch (e) {
        AppStore.setDeleteAccountError(e);
      }
    },
  },
  getters: {
    getUsername() {
      return this.state.fullname;
    }
  },
  persist: true
})