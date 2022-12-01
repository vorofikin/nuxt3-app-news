// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
    build: {
        transpile: ['vuetify'],
    },
    runtimeConfig: {
        mongoUrl: process.env.MONGO_URL,
    },
    nitro: {
        plugins: ["~/server/index.js"],
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
    ],
})
