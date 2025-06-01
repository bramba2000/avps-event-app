import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  server: {
    preset: "netlify-edge",
    compatibilityDate: "2025-05-29"
  }
});