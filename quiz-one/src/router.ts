import { createRouter, createWebHistory } from "vue-router";

import Index from "@/pages/Index.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Connections from "@/pages/Connections.vue";
import Facorite from "@/pages/Facorite.vue";

const routes = [
  {
    name: "Index",
    path: "/",
    component: Index,
    meta: {
      title: "首頁",
    },
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      title: "登入",
    },
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
    meta: {
      title: "註冊",
    },
  },
  {
    name: "Connections",
    path: "/connections",
    component: Connections,
    meta: {
      title: "拓展人派",
    },
  },
  {
    name: "Facorite",
    path: "/facorite",
    component: Facorite,
    meta: {
      title: "我的收藏",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
