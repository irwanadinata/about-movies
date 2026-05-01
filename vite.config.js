import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        "/api/chat": {
          target: "https://generativelanguage.googleapis.com",
          changeOrigin: true,
          rewrite: () =>
            `/v1beta/models/gemini-2.5-flash:generateContent?key=${env.VITE_GEMINI_API_KEY}`,
        },
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
