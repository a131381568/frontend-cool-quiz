<template lang="pug">
div.page-header
  button(@click.prevent="store.addSecDimensionItem()") add tree 
div.container
  div.left-col
    <hr>
    SecDimensioInput(:textSplit="pair" :order="index" v-for="(pair,index) in store.secDimensionList" :key="index")
  TreeCompView.right-col(:treeData="secDimensionTree")
</template>
<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
// import { pairInputType } from "@/type/types";
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

watchDebounced(
  secDimensionArray.value,
  (newVal: any, oldVal: any) => {
    console.log(newVal, oldVal);
    store.initSecDimension();
  },
  { debounce: 1000 }
);

// 初始化事件
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
