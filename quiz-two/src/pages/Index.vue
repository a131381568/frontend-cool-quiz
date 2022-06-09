<template lang="pug">
div.page-header
  button(@click.prevent="addPairInput()" :disabled="store.get_lockBtnState") add tree 
div.container
  div.left-col
    <hr>
    SecDimensioInput(:textSplit="pair" :order="index" v-for="(pair,index) in store.secDimensionList" :key="index")
  TreeCompView.right-col(:treeData="secDimensionTree")
</template>
<script setup lang="ts">
import { watchDebounced, useDebounceFn } from "@vueuse/core";
const router = useRouter();
const store = useStore();

/////////////////////////////////////////////////////

// 樹狀結構
const secDimensionTree = computed(() => {
  return store.get_floorOneTree;
});

// 輸入欄
const secDimensionArray = computed(() => {
  return store.secDimensionList;
});

// 監聽輸入欄更改事件
watchDebounced(
  secDimensionArray.value,
  (newVal) => {
    console.log("觸發監聽");
    if (newVal.length === 0) {
      console.log("無資料");
      store.nodes = {};
      store.childrenOf = {};
    } else {
      if (!newVal[newVal.length - 1].pairKey) {
        console.log("沒值");
      } else {
        console.log("有值");
        // 組成二維陣列
        store.initSecDimension();
      }
    }
  },
  { debounce: 1000 }
);

// 新增事件
const addPairInput = async () => {
  await store.setLockBtnOpen();
  await store.addSecDimensionItem();
  await setTimeout(() => {
    store.setLockBtnClose();
  }, 1000);
};

// 初始化
store.initSecDimension();
</script>
<style>
.container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
}
.left-col,
.right-col {
  width: 50%;
}
input[readonly] {
  background-color: #eee;
  margin-left: 1rem;
  border: none;
}
</style>
