<template lang="pug">
div.sec-dimensio-input
  input(type="text" v-model.trim="textSplit.pairKey")
  button close
</template>
<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";

const store = useStore();
const props = defineProps<{
  textSplit: {
    type: any;
    required: false;
    default: {
      pairKey: "";
      pairVal: "";
    };
  };
}>();
const { textSplit } = toRefs(props);
const textSplitArray = computed(() => textSplit.value.pairKey);
watchDebounced(
  textSplitArray,
  (newVal, oldVal) => {
    // 測試二維陣列
    const splitArray = newVal.split(".");
    const rmEmtpyArray = splitArray.filter((item) => item.length !== 0);
    console.log(rmEmtpyArray);
    store.changeSecDimension(rmEmtpyArray);
  },
  { debounce: 1000 }
);

// 初始化
store.changeSecDimension(textSplitArray.value.split("."));
</script>
