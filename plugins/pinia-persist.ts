import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { defineNuxtPlugin } from "nuxt/app";
import { createPinia } from "pinia";

export default defineNuxtPlugin(nuxtApp => {
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate);
})