import { defineStore } from "pinia";
import { useAppStore } from "~/store/AppStore";

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        email: null,
        token: null,
        fullname: null,
    }),
    actions: {
        setUsername(payload) {
            this.fullname = payload;
        },
        setUserData(payload) {
            console.log(payload);
            const { email, token, firstName, lastName } = payload;
            this.fullname = firstName + lastName;
            this.token = token;
            this.email = email;
        },
        resetUserData() {
            this.fullname = null;
            this.token = null;
            this.email = null;
        },
        async registration(payload) {
            const AppStore = useAppStore();
            try {
                const response = await $fetch("api/registration", {
                    method: "post",
                    body: payload
                });
                this.setUsername(`${response.firstName} ${response.lastName}`);
                localStorage.setItem("user", JSON.stringify(response));
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
                localStorage.setItem("user", JSON.stringify(response));
                this.setUsername(`${response.firstName} ${response.lastName}`);
            } catch (e) {
                AppStore.setAuthError(e);
            }
        }
    },
    getters: {
        getUsername() {
            return this.state.fullname;
        }
    },
    persist: true
})