<template lang="pug">
div.enter-container
  //- TreeCompEdit.left-col(:treeData="store.mainData")
  //- input(type="text" v-model="val.id" v-for="(val) in store.mainData.children" @change.stop="changeAction(val)")
  //-------------------------
  input(type="text" v-model.trim="treeData.text")
  button(@click.prevent="delTreeAction") close
  //- TreeCompEdit.tree-comp-edit(v-for="value in treeDataChild" :treeData="value")
</template>
<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";

const store = useStore();
const props = defineProps<{
  treeData: {
    type: any;
    required: false;
    default: {
      nid: "";
      id: "";
      parentId: "";
      text: "";
      children: [];
    };
  };
}>();
const { treeData } = toRefs(props);
const treeDataInnerText = computed(() => treeData.value.text);
const treeDataInnerNid = computed(() => treeData.value.nid);
const treeDataChild: LooseObject = computed(() => {
  const data: LooseObject = treeData.value;
  return data.children;
});

const delTreeAction = () => {
  store.removeTree(treeDataInnerNid.value);
};

watchDebounced(
  treeDataInnerText,
  (newVal, oldVal) => {
    console.log(newVal);
    console.log(treeDataInnerNid.value);
    store.setTree(newVal, oldVal, treeDataInnerNid.value);
  },
  { debounce: 1000 }
);

// 初始化
store.setTree(
  treeDataInnerText.value,
  treeDataInnerText.value,
  treeDataInnerNid.value
);
</script>
