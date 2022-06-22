import { createRouter, createWebHistory } from "vue-router";

import Index from "@/pages/Index.vue";

const routes = [
  {
    name: "Index",
    path: "/",
    component: Index,
    meta: {
      title: "首頁",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
