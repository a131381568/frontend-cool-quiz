<template lang="pug">
Combination
div.w-7of12.mx-auto(v-show="store.get_connectionsLength === 0") 尚無收藏資料
</template>
<script setup lang="ts">
const store = useStore();
</script>
