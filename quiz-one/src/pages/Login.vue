<template lang="pug">
//- div.container.p-0.m-0.mx-auto
div.flex.flex-row.h-screen.items-center.justify-center
  div.login-form.w-1of4.p-10.bg-slate-300
    form
      div.login-from-header.h-44.bg-slate-100.mb-4 Case One
      div.login-from-content
        input.w-full.block.mb-2(name="email" type="text" placeholder="帳號" v-model="loginAccount")
        input.w-full.block.mb-2(name="password" type="password" placeholder="密碼" v-model="loginPassword")
        div.login-form-btn-group.flex.justify-between
          router-link.register-btn(to="/register") 註冊
          button.login-btn(type="button" @click.prevent="loginAction()") 登入
</template>
<script setup lang="ts">
const loginAccount = ref("");
const loginPassword = ref("");
const router = useRouter();

const loginAction = () => {
  const accountCheck =
    loginAccount.value.replace(/(^s*)|(s*$)/g, "").length === 0;
  const passwordCheck =
    loginPassword.value.replace(/(^s*)|(s*$)/g, "").length === 0;
  if (!accountCheck && !passwordCheck) {
    router.push("/connections");
  }
};

// const route = useRoute();

// const VERSION = import.meta.env.VITE_APP_VERSION;
// const BUILD_DATE = import.meta.env.VITE_APP_BUILD_EPOCH
//   ? new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH))
//   : undefined;
// const thisYear = new Date().getFullYear();
</script>
