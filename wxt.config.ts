import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  outDir: "dist",
  modules: [
    "@wxt-dev/module-react",
    "@wxt-dev/i18n/module",
    "@wxt-dev/auto-icons",
  ],
  manifest: {
    name: "__MSG_extName__",
    description: "__MSG_extDescription__",
    default_locale: "en",
    permissions: ["storage", "proxy"],
  },
  vite: () => ({
    plugins: [tailwindcss()],
    // resolve: {
    //   alias: {
    //     "~": "/src",
    //   },
    // },
  }),
});
