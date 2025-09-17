// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-naiveui',
    '@formkit/auto-animate/nuxt'
  ],
  compatibilityDate: '2024-08-19',
  devtools: {
    enabled: true
  },
  typescript: {
    shim: false
  }
})
