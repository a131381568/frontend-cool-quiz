<template lang="pug">
div.pagination-container(v-show="needPagi")
  ul
    li.pre-page(:data-action="canPrevious" @click.prevent="store.changePage(store.get_connectionsPage - 1)")
      img(src="/img/previous.svg")
    li(v-for="(value,key) in store.get_calTotalPagi" :key="key" @click.prevent="store.changePage(Number(value))" :action-pagi="value === store.get_connectionsPage" ) {{value}}
    li.next-page(:data-action="canNext" @click.prevent="store.changePage(1 + store.get_connectionsPage)")
        img(src="/img/next.svg")
</template>
<script setup lang="ts">
const store = useStore();
// 上一頁和下一頁按鈕顯示判斷
const canPrevious = computed(() => store.get_connectionsPage > 1);
const canNext = computed(() => store.get_connectionsPage < store.getTotalPagi);
// 總頁數判斷是否顯示分頁
const needPagi = computed(() => store.getTotalPagi > 1);
</script>
