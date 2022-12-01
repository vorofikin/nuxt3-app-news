import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {defineNuxtPlugin} from "nuxt/app";
export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({ // Replaces new Vuetify(...)
        components,
        directives,
        theme: {
            defaultTheme: 'dark'
        }
    })

    nuxtApp.vueApp.use(vuetify);
})