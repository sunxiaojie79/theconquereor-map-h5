import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
// const host = "https://theconqueror.cn/";
// const host = "http://113.45.219.231/";
const host = "https://43.138.250.170/";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/map/",
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/prod-api": {
        target: host + "/prod-api",
        changeOrigin: true,
        secure: false, // 禁用SSL验证
        rewrite: (path) => path.replace(/^\/prod-api/, ""),
      },
    },
  },
});
