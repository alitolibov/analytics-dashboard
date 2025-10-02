// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
      '@primevue/nuxt-module',
      '@pinia/nuxt',
      '@nuxtjs/tailwindcss',
      '@nuxtjs/color-mode'
    ],
    css: [
        '@/assets/css/main.css',
        '@/assets/css/theme.css',
        'primeicons/primeicons.css'
    ],
    colorMode: {
        classSuffix: ''
    },
    primevue: {
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark'
                }
            }
        }
    },
    pinia: {
        storesDirs: [
            '@/stores/**'
        ]
    }
})