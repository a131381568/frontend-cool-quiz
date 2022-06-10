import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PerfectScrollbar, {
  options: { wheelPropagation: false, swipeEasing: true },
});
app.mount("#app");
