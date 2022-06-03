<template lang="pug">
TopHeader
div.connections-page
    div.connections-content
        div.connections-header
            div.facorite-btn-group
                router-link.view-all-btn(to="/connections" v-show="modeState" :action-type="!isFacoritePage" @click="store.saveStoreDataInCache()") 全部
                router-link.facorite-btn(to="/facorite" v-show="modeState" :action-type="isFacoritePage" @click="store.saveStoreDataInCache()") 已收藏
            div.toggle-btn-group
                select(v-model="store.connectionsCount")
                    option(v-for="(val,key) in viewCount" :key="key" :value="Number(val)") {{val}}
                button.toggle-grid-btn(type="button" @click.prevent="store.changeConnectionsMode('card')")
                    img(src="/img/grid.svg")
                button.toggle-list-btn(type="button" @click.prevent="store.changeConnectionsMode('list')")
                    img(src="/img/list.svg")
        card(v-if="modeState")
        list(v-if="!modeState")
        Pagination
LightBox
</template>
<script setup lang="ts">
const route = useRoute();
const store = useStore();
const viewCount = ref([10, 30, 50]);
const modeState = computed(() => store.get_connectionsMode === "card");
const isFacoritePage = computed(() => route.name === "Facorite");
// store.connectionsCount = 30;
// store.connectionsPage = 1;
console.log(`
modeState is Card:        ${modeState.value}
connectionsCount: ${store.connectionsCount}
connectionsPage:  ${store.connectionsPage}
`);
if (isFacoritePage.value) {
  console.log("頁面-收藏頁面狀態");
  store.showCollectList();
} else if (store.oriConnectionsList.length > 0) {
  console.log("頁面-顯示全部 grid");
  store.showConnectionsList();
} else {
  console.log("都不是");
}

watch(
  () => store.connectionsCount,
  (val, old) => {
    // console.log(val, old);
    // 儲存資料
    store.saveStoreDataInCache();
  }
);
</script>
