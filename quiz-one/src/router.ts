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

router.beforeEach((to, from, next) => {
  const store = useStore();
  const firstEenter = from.matched.length === 0;

  // if (firstEenter) {
  //   store.loadingStateShow();
  //   // 初次進來網站
  //   // setTimeout(async () => {
  //   console.log("初次進來網站");
  //   store.initStoreDataByCache();
  //   if (!store.get_userSelfMail && to.name !== "Login") {
  //     console.log("沒權限");
  //     router.push("/login");
  //     store.loadingStateHide();
  //   } else {
  //     next();
  //     console.log("有權限");
  //     store.loadingStateHide();
  //   }
  //   // }, 1000);
  // } else {
  //   // 載入瀏覽器暫存資料
  //   if (!store.get_userSelfMail && to.name !== "Login") {
  //     console.log("沒權限");
  //     router.push("/login");
  //   } else {
  //     console.log("有權限");
  //     next();
  //   }
  // }

  if (firstEenter) {
    // 初次進來網站
    store.loadingStateShow();
    setTimeout(async () => {
      await store.initStoreDataByCache();
      await store.loadingStateHide();
      if (!store.get_userSelfMail && to.name !== "Login") {
        await console.log("沒權限就彈去登入頁");
        await router.push("/login");
      }
    }, 1000);
  } else {
    store.initStoreDataByCache();
  }
  next();
});

export default router;
