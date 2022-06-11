<template lang="pug">
div.tree-component-container(v-if="treeDataOri")
  div.tree-component(:class="[{'content-hide':!accordionBtn},{'content-lock':accordionLock}]")
    div.title.accordion-header
      div.pair-key {{ treeDataOri.id }}
      div.accordion-toggle-btn.title-colon(v-show="treeDataOri.children.length === 0 || accordionLock") :
      div.accordion-toggle-btn(v-show="treeDataOri.children.length > 0 && !accordionLock" @click.prevent="toggleAccordionBtn()")
        AddIcon.add-icon(v-show="!accordionBtn")
        RemoveIcon.remove-icon(v-show="accordionBtn")
    div.accordion-content
      span.content.pair-val {{ treeDataOri.text }}
    TreeCompView(v-if="treeDataOri.children.length > 0" v-for="value in treeDataChild" :treeData="value")
</template>
<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
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

const accordionLock = computed(() => {
  const checkChildLen = treeDataChild.value.length > 0;
  const pairValState = treeDataOri.value.text.length > 0;
  if (checkChildLen && pairValState) {
    return true;
  } else {
    return false;
  }
});

const treeDataChild: LooseObject = computed(() => {
  const data: LooseObject = treeData.value;
  return data.children;
});

const treeDataOri: LooseObject = computed(() => {
  const data: LooseObject = treeData.value;
  return data;
});

const accordionBtn = ref<boolean>(true);
const toggleAccordionBtn = () => {
  accordionBtn.value = !accordionBtn.value;
};

// 監聽輸入欄更改事件
watchDebounced(
  treeData,
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
  },
  { debounce: 1000 }
);
</script>
