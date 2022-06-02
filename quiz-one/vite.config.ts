// import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import pkg from "./package.json";

const path = require("path");
function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// pug
import pugPlugin from "vite-plugin-pug";
const options = { pretty: true };
const locals = { name: "My Pug" };

process.env.VITE_APP_VERSION = pkg.version;
if (process.env.NODE_ENV === "production") {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString();
}

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/" : "./",
  define: {
    "process.env": process.env,
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/head",
        "pinia",
        {
          "@/store": ["useStore"],
        },
      ],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dirs: ["src/components"],
      extensions: ["vue"],
    }),
    pugPlugin(options, locals),
  ],
  resolve: {
    alias: {
      "@": _resolve("src"),
      "@assets": _resolve("src/assets"),
      "@comps": _resolve("src/components"),
      "@utils": _resolve("src/utils"),
      "@router": _resolve("src/router"),
      "@store": _resolve("src/store"),
    },
  },
});
