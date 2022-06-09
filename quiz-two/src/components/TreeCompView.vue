<template lang="pug">
div.tree-component-container(v-if="treeDataOri")
  div.tree-component
    div.title.accordion-header
      div.pair-key {{ treeDataOri.id }}
      div.accordion-toggle-btn.title-colon(v-show="treeDataOri.children.length === 0") :
      div.accordion-toggle-btn(v-show="treeDataOri.children.length>0" @click.prevent="toggleAccordionBtn()")
        AddIcon.add-icon(v-show="!accordionBtn")
        RemoveIcon.remove-icon(v-show="accordionBtn")
    div.accordion-content
      span.content.pair-val {{ treeDataOri.text }}
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
const accordionBtn = ref<boolean>(true);
const toggleAccordionBtn = () => {
  accordionBtn.value = !accordionBtn.value;
};
</script>
<style scoped lang="scss">
.tree-component {
  padding: 0.2rem 0;
  margin: 0.2rem 2rem;
  text-align: left;
  width: auto;
  .accordion-header {
    display: inline-block;
    vertical-align: middle;
    height: 25px;
    &:before {
      content: "";
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .pair-key {
      font-weight: 700;
      display: inline-block;
      vertical-align: middle;
      height: 25px;
    }
    .title-colon {
      margin: 0 0.4rem 0 0.2rem;
    }
    .accordion-toggle-btn {
      margin: 0 0.3rem;
      display: inline-block;
      vertical-align: middle;
      height: 25px;
      svg {
        fill: #39b3aa;
      }
    }
  }
  .accordion-content {
    display: inline-block;
    vertical-align: middle;
    height: 25px;
    .pair-val {
      color: #ffc063;
      vertical-align: middle;
      height: 25px;
    }
  }
}
</style>
