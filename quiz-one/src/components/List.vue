<template lang="pug">
div.card-mode.table-container
  table.table-auto.rwd-table
    thead
      tr
        th.w-full 姓名
        th.w-full 手機
        th.w-full 信箱
    tbody
      tr(v-for="(value,key) in store.get_calculateConnectionsList" :key="key" @click="store.showLightBox(value.email)")
        td(data-label="姓名")
           h6 {{ String(value.name.first) +" "+ String(value.name.last) }}
        td(data-label="手機")
           h6 {{ String(value.cell) }}
        td(data-label="信箱")
           h6 {{ String(value.email) }}
</template>
<script setup lang="ts">
// const route = useRoute();
const store = useStore();
</script>
