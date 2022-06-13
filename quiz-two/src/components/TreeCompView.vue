<template lang="pug">
div.tree-component-container(v-if="treeDataOri.key")
  //- && treeDataOri.ellipsis === false"
  div.tree-component(:class="[{'content-hide':!accordionBtn},{'content-lock':accordionLock}]")
    div.title.accordion-header
      div.pair-key(v-if="treeDataOri.key") {{ treeDataOri.key }}
      div.accordion-toggle-btn.title-colon(v-show="accordionLock || isLastValIndex") :
      div.accordion-toggle-btn(v-show="!accordionLock && !isLastValIndex" @click.prevent="toggleAccordionBtn()")
        AddIcon.add-icon(v-show="!accordionBtn")
        RemoveIcon.remove-icon(v-show="accordionBtn")
    div.accordion-content
      span.content.pair-val(v-if="treeDataOri.value") {{ treeDataOri.value }}
    TreeCompView(v-if="treeDataOri.children.length > 0" v-for="value in treeDataChild" :treeData="value")
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
      key: "";
      value: "";
      parentNid: "";
      inputFloor: null;
      inputOrder: null;
      children: [];
      frontSame: false;
      ellipsis: false;
    };
  };
}>();
const { treeData } = toRefs(props);

// 重複退階距離
const autoML: LooseObject = computed(() => {
  if (treeDataOri.value.frontSame) {
    return { "margin-left": 2 * treeDataOri.value.inputOrder + "rem" };
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

const isLastValIndex = computed(() => {
  // console.log("inputFloor: ", treeDataOri.value.inputFloor);
  // console.log("inputOrder: ", treeDataOri.value.inputOrder);
  if (store.enterInputGroup.length > 0) {
    const ownEnterInputStr =
      store.enterInputGroup[treeDataOri.value.inputFloor].pairKey;
    const oriStrArrayLen = ownEnterInputStr
      .split(".")
      .filter((item: string) => item !== "").length;
    return treeDataOri.value.inputOrder === oriStrArrayLen - 1;
  }
});

const accordionLock = computed(() => {
  // key 有值 + 最後一層 回傳 d
  const checkChildLen = treeDataChild.value.length > 0;
  const pairValState = treeDataOri.value.value.length > 0;
  if (checkChildLen && pairValState) {
    return true;
  } else {
    return false;
  }
});

// 監聽輸入欄更改事件
// watchDebounced(
//   treeData,
//   (newVal, oldVal) => {
//     console.log(newVal, oldVal);
//   },
//   { debounce: 1000 }
// );
</script>
