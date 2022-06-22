<template lang="pug">
transition(name="fade")
  div.lds-modal(v-show="store.loadingState")
    div.lds-ellipsis
      div
      div
      div
      div
</template>
<script setup lang="ts">
const store = useStore();
</script>
