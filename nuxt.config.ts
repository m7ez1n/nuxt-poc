// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "nuxt-svgo"],
  compatibilityDate: "2024-07-06",
  nitro: {
    devProxy: {
      "/api": {
        target: "https://fruityvice.com/api",
        changeOrigin: true,
      },
    },
  },
});
