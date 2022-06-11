<template lang="pug">
div.sec-dimensio-input
  input.import-pair-key(type="text" v-model.trim="keySplitArray.pairKey")
  input.import-pair-val(type="text" v-model.trim="keySplitArray.pairVal")
  div.close-icon(@click.prevent="rmPairInput()" :disabled="store.get_lockBtnState")
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
    console.log(val);
    emit("update:textSplit", val);
  },
});

const textSplitArray: LooseObject = computed(() => {
  const data: LooseObject = textSplit.value;
  return data.pairKey.split(".");
});

// 刪除事件
const rmPairInput = async () => {
  await store.setLockBtnOpen();
  await store.removeSecDimensionItem(textSplitArray.value, Number(order.value));
  await setTimeout(() => {
    store.setLockBtnClose();
  }, 1000);
};

// 監聽輸入欄更改事件
watchDebounced(
  textSplitArray,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
    console.log("inputOrder: ", order.value);

    store.newSpFloorOneTree[newVal.length - 1].key = newVal[newVal.length - 1];
    store.newSpFloorOneTree[newVal.length - 1].inputFloor = order.value;
    store.newSpFloorOneTree[newVal.length - 1].inputOrder = newVal.length - 1;

    // 新增
    // const nid = "n-" + Math.floor(new Date().getTime() / 1000);
    // store.newSpFloorOneTree[`${nid}`] = {
    //   nid: nid,
    //   key: newVal,
    //   value: "",
    //   parentNid: "",
    //   childNidGroup: [],
    //   inputFloor: order.value,
    //   inputOrder: 0,
    //   treePosition: [0],
    // };

    // 修改
    // const filterName =

    // 刪除
  },
  { debounce: 0 }
);
</script>
