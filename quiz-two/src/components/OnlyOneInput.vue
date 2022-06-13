<template lang="pug">
div.sec-dimensio-input
  input.import-pair-key(type="text" v-model.trim="keySplitArray.pairKey")
  input.import-pair-val(type="text" v-model.trim="keySplitArray.pairVal")
  div.close-icon(:disabled="store.get_lockBtnState" @click.prevent="store.delOwnPair(order,filterOwnInputGroup)")
    CloseIcon
</template>
<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
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
      order: number;
    };
  };
  order: number;
}>();
const { textSplit, order } = toRefs(props);
const emit = defineEmits(["update:textSplit"]);
const keySplitArray: LooseObject = computed({
  get: () => {
    const data: LooseObject = textSplit.value;
    return data;
  },
  set: (val) => {
    // console.log(val);
    emit("update:textSplit", val);
  },
});

const keySplit: LooseObject = computed(() => {
  const data: LooseObject = textSplit.value;
  return data.pairKey.split(".").filter((item: string) => item !== "");
});

// 最後一個 key 在字串陣列的順序
const keySplitLen: LooseObject = computed(() => {
  const num: LooseObject = keySplit.value;
  // console.log(num);
  return num.length - 1;
});

// 輸入值
const lastVal: LooseObject = computed(() => {
  const data: LooseObject = textSplit.value;
  return data.pairVal;
});

// 目前可輸入 KEY 的欄位, 在 store 對應的陣列 index
const filterOwnInputGroup = computed(() => {
  const allNidGroup = store.newSpFloorOneTree.map((item) => item.nid);
  const data = store.newSpFloorOneTree.filter(
    (item) => item.inputFloor === order.value
  );

  // const nidGroup = data.map((item) => allNidGroup.indexOf(item.nid));
  let firstNid = allNidGroup.indexOf(data[0].nid) - 1;

  const countGroup = [];
  const floorInnerCount = Number(import.meta.env.VITE_APP_BUILD_COUNT);
  for (let index = 0; index < floorInnerCount; index++) {
    firstNid = firstNid + 1;
    countGroup.push(firstNid);
  }
  return countGroup;
});

// 監聽輸入欄更改事件
watchDebounced(
  keySplit,
  (newVal, oldVal) => {
    // console.log("舊值: ", oldVal);
    // console.log("新值: ", newVal);
    // console.log("第幾行 input: ", order.value);
    const allCount = Number(import.meta.env.VITE_APP_BUILD_COUNT);
    for (let index = 0; index < allCount; index++) {
      // 更新 KEY
      const fIndex = filterOwnInputGroup.value[Number(index)];
      // console.log("fIndex: ", fIndex);
      if (fIndex >= 0) {
        // console.log(store.newSpFloorOneTree[`${fIndex}`]);
        store.newSpFloorOneTree[`${fIndex}`].key = newVal[`${index}`];
        // store.newSpFloorOneTree[`${fIndex}`].parentNid = store.newSpFloorOneTree[`${fIndex - 1}`].nid;
        // store.newSpFloorOneTree[`${fIndex}`].frontSame = false;

        // 更新 VAL
        if (index === keySplitLen.value) {
          store.newSpFloorOneTree[`${fIndex}`].value = lastVal.value;
        } else {
          store.newSpFloorOneTree[`${fIndex}`].value = "";
        }
      }
    }
  },
  { debounce: 0 }
);

// 監聽輸入值
watchDebounced(
  lastVal,
  (newVal, oldVal) => {
    const allCount = Number(import.meta.env.VITE_APP_BUILD_COUNT);
    for (let index = 0; index < allCount; index++) {
      const fIndex = filterOwnInputGroup.value[Number(index)];
      if (fIndex >= 0) {
        if (index === keySplitLen.value) {
          // 先檢查最後一個的 node 是誰? 在賦值
          store.newSpFloorOneTree[`${fIndex}`].value = String(newVal);
        }
        /*
        else {
          store.newSpFloorOneTree[`${fIndex}`].value = "";
        }
        
        */
      }
    }
  },
  { debounce: 0 }
);
</script>
