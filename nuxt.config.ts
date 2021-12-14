import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    publicRuntimeConfig: {
        clientId: process.env.CLIENT_ID || ''
    },
    privateRuntimeConfig: {
        clientSecret: process.env.CLIENT_SECRET || '',
        redirectUri: process.env.REDIRECT_URI || '',
    },
})
