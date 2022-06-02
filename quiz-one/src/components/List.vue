<template lang="pug">
//- .flex.justify-center
div.card-mode.table-container
  table.table-auto
    thead
      tr
        th.w-full 姓名
        th.w-full 手機
        th.w-full 信箱
    tbody
      tr(v-for="(value,key) in store.get_calculateConnectionsList" :key="key" @click="store.showLightBox(value.email)")
        td
           h6 {{ String(value.name.first) +" "+ String(value.name.last) }}
        td
           h6 {{ String(value.cell) }}
        td
           h6 {{ String(value.email) }}
</template>
<script setup lang="ts">
// const route = useRoute();
const store = useStore();
</script>
