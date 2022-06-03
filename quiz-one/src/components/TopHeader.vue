<template lang="pug">
header.bg-slate-800.text-white.flex.justify-between.px-4.py-2
  div.logo-block.flex.self-center
    router-link.w-10.inline-block(to="/")
      img(src="/img/logo.svg")
    div.user-name.inline-block.ml-6.leading-8 您好，{{store.get_userSelfName}}
  button.btn(@click.prevent="store.logOut()") 登出
</template>
<script setup lang="ts">
const store = useStore();
</script>
