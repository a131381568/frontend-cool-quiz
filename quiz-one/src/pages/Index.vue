<template lang="pug">
h1 Hello World
div
  p I'm a cool Vite project!
  ul
    li
      router-link(to="/connections") connections
    li
      router-link(to="/login") login
    li
      router-link(to="/register") register
    li
      router-link(to="/facorite") facorite

</template>
<script setup lang="ts">
const store = useStore();
// store.registerMember();
// store.downloadMemberList();
// store.registerMember("陳小杉aa", "wang@gamil.com", "zxcvbnm");
</script>
