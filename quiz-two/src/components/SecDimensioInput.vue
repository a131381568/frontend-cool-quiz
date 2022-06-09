<template lang="pug">
div.sec-dimensio-input
  input.import-pair-key(type="text" v-model.trim="keySplitArray.pairKey")
  input.import-pair-val(type="text" v-model.trim="keySplitArray.pairVal")
  div.close-icon(@click.prevent="rmPairInput()" :disabled="store.get_lockBtnState")
    CloseIcon
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
</script>
