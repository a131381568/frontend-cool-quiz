import { createRouter, createWebHistory } from "vue-router";

import Login from "@/pages/Login.vue";
import Connections from "@/pages/Connections.vue";
import Facorite from "@/pages/Facorite.vue";

const routes = [
  {
    path: "/",
    redirect: "/connections",
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      title: "登入",
      public: true,
    },
  },
  {
    name: "Connections",
    path: "/connections",
    component: Connections,
    meta: {
      title: "全部資料",
      public: false,
    },
  },
  {
    name: "Facorite",
    path: "/facorite",
    component: Facorite,
    meta: {
      title: "我的收藏",
      public: false,
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
  if (firstEenter) {
    // 初次進來網站
    store.loadingStateShow();
    setTimeout(async () => {
      await store.initStoreDataByCache();
      await store.loadingStateHide();
      // !store.get_userSelfMail && to.name !== "Login"
      if (!store.get_userSelfMail && to.meta.public === false) {
        // console.log("沒權限就彈去登入頁");
        await router.push("/login");
      }
    }, 1000);
  } else {
    store.initStoreDataByCache();
  }
  next();
});

export default router;
