<template lang="pug">
div.container
  div.left-col
    SecDimensioInput(:textSplit="pair" :order="index" v-for="(pair,index) in store.secDimensionList" :key="index")
    div.add-pair-btn(@click.prevent="addPairInput()" :disabled="store.get_lockBtnState") Add New Pair
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
<style lang="scss">
html {
  font-family: "Arial", "sans-serif";
  font-size: 20px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  overflow-x: hidden;
  * {
    font-size: 1rem;
  }
  body {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 0;
    overflow-x: hidden;
    background-color: #107e76;
    color: #f1fdff;
    .container {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      margin: 4rem auto;
      .left-col {
        width: 50%;
        padding: 4rem;
      }
      .right-col {
        @extend .left-col;
        border-left: 1px solid #39b3aa;
        & > .tree-component {
          margin: 0;
          & > .accordion-header {
            display: none;
            margin: 0;
            padding: 0;
            & > .accordion-toggle-btn {
              display: none;
              margin: 0;
              padding: 0;
            }
          }
          & > .accordion-content {
            display: none;
          }
          & > .tree-component-container {
            & > .tree-component {
              margin: 0;
            }
          }
        }
      }
      .add-pair-btn {
        width: 200px;
        background: #39b3aa;
        text-align: center;
        padding: 0.3rem 0.5rem;
        border-radius: 0.2rem;
        margin: 3.6rem auto;
      }
    }
  }
}
</style>
