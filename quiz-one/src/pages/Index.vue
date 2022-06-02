<template lang="pug">
h1 Hello World
div
  p I'm a cool Vite project!
  router-link(to="/connections") connections
</template>
<script setup lang="ts">
const store = useStore();
// store.registerMember();
store.downloadMemberList();
</script>
