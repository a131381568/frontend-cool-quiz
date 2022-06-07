<template lang="pug">
div
  //- div.title {{ treeDataText }}
  //--  input( type="text" v-model="treeData.id")
  input(type="text" v-model="treeDataOri.text" v-show="treeDataOri.id !== 'root-node'")
  button close
  TreeCompEdit.tree-comp-edit(v-for="value in treeDataChild" :treeData="value")
</template>
<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
interface LooseObject {
  [key: string]: any;
}
// import { treeDataType } from "@/type/types";
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
// const treeDataText = computed(() => {
//   const data: LooseObject = treeData.value;
//   return data.text;
// });
const treeDataChild: LooseObject = computed(() => {
  const data: LooseObject = treeData.value;
  return data.children;
});

// const emit = defineEmits(["update:treeData"]);
// const treeDataComTxt = computed({
//   get() {
//     return treeData.value.text;
//   },
//   set(val) {
//     emit("update:treeData", val);
//   },
// });

console.log("組件啟動??");
const autoWatchAction = ref(0);

const treeDataOri: LooseObject = computed(() => {
  const data: LooseObject = treeData.value;
  return data;
});

const treeDataInnerText: LooseObject = computed(() => {
  const data: LooseObject = treeData.value;
  return data.text;
});
const treeDataInnerNid: LooseObject = computed(() => {
  const data: LooseObject = treeData.value;
  return data.nid;
});

watchDebounced(
  treeDataInnerText,
  (newVal, oldVal) => {
    autoWatchAction.value += 1;
    console.log(autoWatchAction.value);
    console.log("啟動了---setTree???");
    console.log(newVal, oldVal);
    console.log(newVal.toString() === oldVal.toString());
    // store.setTree(String(newVal), String(oldVal), treeDataInnerNid.value);
  },
  { debounce: 1500 }
);
</script>
<style>
.tree-component {
  padding: 5px 0;
  margin: 1px 10px;
  text-align: left;
  font-size: 16px;
  max-width: 500px;
  border-left: 1px dashed #999;
}

.tree-component .title {
  display: inline-block;
}

.tree-component::before {
  content: "--";
  display: inline-block;
  padding: 0 4px;
}
</style>
