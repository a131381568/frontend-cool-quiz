<template lang="pug">
div.sec-dimensio-input
  input(type="text" v-model.trim="keySplitArray.pairKey")
  button(@click.prevent="rmPairInput()" :disabled="store.get_lockBtnState") delete
</template>
<script setup lang="ts">
// import { useDebounceFn } from "@vueuse/core";
interface LooseObject {
  [key: string]: any;
}
const store = useStore();
const props = defineProps<{
  textSplit: {
    type: any;
    required: false;
    default: {
      pairKey: { type: string; required: false; default: "" };
      pairVal: "";
    };
  };
  order: {
    type: number;
    required: false;
    default: 0;
  };
}>();
const { textSplit, order } = toRefs(props);
const emit = defineEmits(["update:textSplit"]);
const keySplitArray: LooseObject = computed({
  get: () => {
    const data: LooseObject = textSplit.value;
    return data;
  },
  set: (val) => {
    console.log(val);
    emit("update:textSplit", val);
  },
});
const textSplitArray: LooseObject = computed(() => {
  const data: LooseObject = textSplit.value;
  return data.pairKey;
});

// 刪除事件
const rmPairInput = async () => {
  await store.setLockBtnOpen();
  await store.removeSecDimensionItem(textSplitArray.value, Number(order.value));
  await setTimeout(() => {
    store.setLockBtnClose();
  }, 1000);
};

// const rmPairInput = useDebounceFn(async () => {
//   await store.setLockBtnOpen();
//   await store.removeSecDimensionItem(textSplitArray.value);
//   await setTimeout(() => {
//     store.setLockBtnClose();
//   }, 1000);
// }, 0);

// watchDebounced(
//   textSplitArray,
//   (newVal, oldVal) => {
//     // 判斷修改形式
//     const oldSplitArray = oldVal.split(".");
//     const newSplitArray = newVal.split(".");
//     const oldSplitLen = oldSplitArray.length;
//     const newSplitLen = newSplitArray.length;

//     console.log("oldSplitArray: ", oldSplitArray);
//     console.log("newSplitArray: ", newSplitArray);

//     if (oldSplitLen === newSplitLen) {
//       if (newSplitArray[0] === oldSplitArray[0]) {
//         // 有可能只改結尾值
//         const oldExcludeEndNode = oldSplitArray.filter(
//           (item: string, index: number) => {
//             if (index < oldSplitLen - 1) {
//               return item;
//             }
//           }
//         );
//         const newExcludeEndNode = newSplitArray.filter(
//           (item: string, index: number) => {
//             if (index < newSplitLen - 1) {
//               return item;
//             }
//           }
//         );
//         const compareArrSame = store.getArraySameResult(
//           oldExcludeEndNode,
//           newExcludeEndNode
//         );
//         // 結尾值變更, 不用新增, 更改原本的值
//         if (compareArrSame) {
//           console.log("只有改結尾值");
//         }
//         // 中繼節點更名 或 延伸分支
//         if (newSplitArray[newSplitLen - 1] === oldSplitArray[oldSplitLen - 1]) {
//           console.log("改中間節點");
//         }
//       } else {
//         // 新增 root
//         console.log("起始節點被更改");
//       }
//     } else {
//       // 走新增路線
//       console.log("走新增路線");
//     }

//     const rmEmtpyArray = newSplitArray.filter(
//       (item: string) => item.length !== 0
//     );
//     store.changeSecDimension(rmEmtpyArray);
//   },
//   { debounce: 1000 }
// );

// // 初始化
// const splitStr = textSplitArray.value.split(".");
// if (splitStr.length > 0) {
//   if (splitStr[0].length > 0) {
//     store.changeSecDimension(textSplitArray.value.split("."));
//   }
// }
</script>
