<template lang="pug">
div.login-container
  div.login-form
    form
      div.login-from-header
        img.mx-auto(src="/img/logo.svg")
        h3.login-from-header-title {{fromTitle}}
      Form.login-from-content(v-show="!isRegisterShow" ref="loginForm" :validation-schema="loginRule" v-slot="{ errors }")
        Field(name="email" type="text" placeholder="信箱" v-model="loginMail")
        Field.mb-3(name="password" type="password" placeholder="密碼" v-model="loginPassword")
        div.login-form-btn-group
          button.register-tab-btn(@click.prevent="isRegisterShow=true" type="button") 註冊
          button.login-btn(@click.prevent="loginAction()" type="button") 登入
        span.from-alert-msg(v-show="errors.email") {{errors.email}}
        span.from-alert-msg(v-show="errors.password") {{errors.password}}
      Form.register-from-content(v-show="isRegisterShow" ref="registerForm" :validation-schema="registerRule" v-slot="{ errors }")
        Field(name="name" type="text" placeholder="姓名" v-model="registerName")
        Field(name="email" type="text" placeholder="信箱" v-model="registerMail")
        Field.mb-3(name="password" type="password" placeholder="密碼" v-model="registerPassword")
        div.register-form-btn-group
          button.login-tab-btn(@click.prevent="isRegisterShow=false" type="button") 登入
          button.register-btn(@click.prevent="registerAction()" type="button") 註冊
        span.from-alert-msg(v-show="errors.name") {{errors.name}}
        span.from-alert-msg(v-show="errors.email") {{errors.email}}
        span.from-alert-msg(v-show="errors.password") {{errors.password}}
</template>
<script setup lang="ts">
import { debounce } from "throttle-debounce";
import schema from "@/utils/vee-validate-schema";
import { Field, Form } from "vee-validate";
const router = useRouter();
const store = useStore();
const isRegisterShow = ref(false);
const fromTitle = computed(() => {
  if (isRegisterShow.value) {
    return "專案會員註冊";
  } else {
    return "專案會員登入";
  }
});

// 驗證規則
const loginRule = {
  email: schema.email,
  password: schema.password,
};
const registerRule = {
  name: schema.required,
  email: schema.email,
  password: schema.password,
};
// 綁定檢查
const loginMail = ref("");
const loginPassword = ref("");
const registerName = ref("");
const registerMail = ref("");
const registerPassword = ref("");
const loginForm = ref({
  validate: () => {
    return { valid: false };
  },
});
const registerForm = ref({
  validate: () => {
    return { valid: false };
  },
});

// 送出表單
const loginAction = async () => {
  const { valid } = await loginForm.value.validate();
  if (valid) {
    // 先進 loading
    await store.loadingStateShow();
    // 請求
    const res = await store.loginMember(loginMail.value, loginPassword.value);
    // 回傳訊息
    if (res.code > 0) {
      loginMail.value = "";
      loginPassword.value = "";
      store.showAlertBox(res.msg);
      router.push("/connections");
    } else if (res.code < 0) {
      store.showAlertBox(res.msg);
    }
  }
};
const registerAction = async () => {
  const { valid } = await registerForm.value.validate();
  if (valid) {
    // 先進 loading
    await store.loadingStateShow();
    // 請求
    const res = await store.registerMember(
      registerName.value,
      registerMail.value,
      registerPassword.value
    );
    // 回傳訊息
    if (res.code > 0) {
      registerName.value = "";
      registerMail.value = "";
      registerPassword.value = "";
      store.showAlertBox(res.msg);
      isRegisterShow.value = false;
    } else if (res.code < 0) {
      store.showAlertBox(res.msg);
      isRegisterShow.value = false;
    }
  }
};
</script>
