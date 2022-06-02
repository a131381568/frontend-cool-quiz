<template lang="pug">
TopHeader
div.connections-page
    div.connections-content
        div.connections-header
            div.facorite-btn-group
                router-link.view-all-btn(to="/connections" v-show="modeState" :action-type="!isFacoritePage") 全部
                router-link.facorite-btn(to="/facorite" v-show="modeState" :action-type="isFacoritePage" ) 已收藏
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
if (isFacoritePage.value) {
  store.showCollectList();
} else if (store.oriConnectionsList.length > 0) {
  store.showConnectionsList();
} else {
  store.downLoadTotalUserList();
}
</script>
