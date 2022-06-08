<template lang="pug">
div
  div.tree-component
    div.title {{ treeDataOri.id }}
    TreeCompView(v-for="value in treeDataChild" :treeData="value")
</template>
<script setup lang="ts">
interface LooseObject {
  [key: string]: any;
}
const store = useStore();
const props = defineProps<{
  treeData: {
    type: any;
    required: false;
    default: {
      nid: "";
      id: "";
      text: "";
      parentId: "";
      children: [];
    };
  };
}>();
const { treeData } = toRefs(props);
const treeDataTitle = computed(() => {
  const data: LooseObject = treeData.value;
  const split = data.id.split(".");
  return split[split.length - 1];
});
const treeDataText = computed(() => {
  const data: LooseObject = treeData.value;
  return data.text;
});
const treeDataChild: LooseObject = computed(() => {
  const data: LooseObject = treeData.value;
  return data.children;
});

const treeDataOri: LooseObject = computed(() => {
  const data: LooseObject = treeData.value;
  return data;
});
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
