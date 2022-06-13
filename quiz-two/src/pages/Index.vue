<template lang="pug">
div.container
  div.left-col
    OnlyOneInput(:textSplit="pair" :order="index" v-for="(pair,index) in Object.values(store.enterInputGroup)" :key="index")
    div.add-pair-btn(@click.prevent="addPairInput()" :disabled="store.get_lockBtnState") Add New Pair
  perfect-scrollbar.right-col
    TreeCompView(:treeData="store.get_nodeListObj")
    div.empty-demo(v-show="store.get_nodeListObj.children.length === 0") Preview
</template>
<script setup lang="ts">
const store = useStore();

// const aaa = computed(() => {
//   const bbb: any = [];
//   const maxFloorNum = Math.max(
//     ...store.nodeList.map((item) => item.inputFloor)
//   );
//   console.log(...store.nodeList);
//   console.log(maxFloorNum);
//   for (let index = 0; index < 1 + maxFloorNum; index++) {
//     const ccc = store.nodeList.filter(
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
  await store.addEnterInputPair();
  await setTimeout(() => {
    store.setLockBtnClose();
  }, 1000);
};

// 初始化
// store.checkEnterInputGroupAfterBuild(defaultData);
</script>
