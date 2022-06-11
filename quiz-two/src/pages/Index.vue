<template lang="pug">
div.container
  div.left-col
    OnlyOneInput(:textSplit="pair" :order="index" v-for="(pair,index) in Object.values(store.newEnterInput)" :key="index")
    div.add-pair-btn(@click.prevent="addPairInput()" :disabled="store.get_lockBtnState") Add New Pair
  perfect-scrollbar.right-col
    TreeCompView(:treeData="store.get_newSpFloorOneTreeObj")
</template>
<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
const router = useRouter();
const store = useStore();

// 樹狀結構
const secDimensionTree = computed(() => {
  // return store.get_floorOneTree;
  return store.spFloorOneTree;
});

// 原始資料反推回來陣列 (初始化)
const secDimensionArray = computed(() => {
  return store.newEnterInput;
});

const addCountGroup = [];
const addCount = 10;
for (let index = 0; index < addCount; index++) {
  addCountGroup.push(index + 1);
}
addCountGroup.reduce((pre, curr, index, array) => {
  const group: any = store.parentGroup;
  // 子層
  const nid = "n-" + store.genNonDuplicateID(5);
  store.newSpFloorOneTree.push({
    nid: nid,
    key: "",
    value: "",
    parentNid: pre,
    inputFloor: 0,
    inputOrder: 0,
    children: [],
  });
  group[`${nid}`] = [];
  // 父層
  if (pre) {
    group[`${pre}`].push(nid);
  }
  return nid;
}, "");

// const aaa = computed(() => {
//   const bbb: any = [];
//   const maxFloorNum = Math.max(
//     ...store.newSpFloorOneTree.map((item) => item.inputFloor)
//   );
//   console.log(...store.newSpFloorOneTree);
//   console.log(maxFloorNum);
//   for (let index = 0; index < 1 + maxFloorNum; index++) {
//     const ccc = store.newSpFloorOneTree.filter(
//       (item) => item.inputFloor === index
//     );
//     bbb.push(ccc);
//   }
//   return bbb;
// });

// 監聽輸入欄更改事件
// watchDebounced(
//   secDimensionArray.value,
//   (newVal, oldVal) => {
//     console.log(newVal, oldVal);

//     // console.log("觸發監聽");
//     if (newVal.length === 0) {
//       // console.log("無資料");
//       store.nodes = {};
//       store.childrenOf = {};
//     } else {
//       if (!newVal[newVal.length - 1].pairKey) {
//         // console.log("沒值");
//       } else {
//         // console.log("有值");
//       }
//     }
//   },
//   { debounce: 1000 }
// );

// 新增事件
const addPairInput = async () => {
  await store.setLockBtnOpen();
  await setTimeout(() => {
    store.setLockBtnClose();
  }, 1000);
};

//////////////////////////////////////////
</script>
