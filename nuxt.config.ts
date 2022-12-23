// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
    build: {
        transpile: ['vuetify'],
    },
    runtimeConfig: {
        mongoUrl: process.env.MONGO_URL,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
    nitro: {
        plugins: ["~/server/index.js"],
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxt/image-edge',
    ],
    image: {
        cloudinary: {
            baseURL: 'https://res.cloudinary.com/dh8nk2ae4/image/upload/v1670073043/',
        }
    },
    ssr: true
})
