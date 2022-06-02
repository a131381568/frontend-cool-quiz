<template lang="pug">
//- div.container.p-0.m-0.mx-auto
div.flex.flex-row.h-screen.items-center.justify-center.bg-slate-300
  div.login-form.w-1of5.p-10.bg-slate-800
    form
      div.login-from-header.h-44.mb-1.text-center
        img.mx-auto(src="/img/logo.svg")
      div.login-from-content
        input.w-full.block.mb-2(name="email" type="text" placeholder="帳號" v-model="loginAccount")
        input.w-full.block.mb-3(name="password" type="password" placeholder="密碼" v-model="loginPassword")
        div.login-form-btn-group
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
</script>
