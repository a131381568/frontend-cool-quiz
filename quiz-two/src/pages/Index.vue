<template lang="pug">
div.page-header
  button(@click.prevent="store.setNewTree()") add tree
div.container
  //- TreeCompEdit.left-col(:treeData="store.mainData")
  div.left-col
    //- EnterCom(:treeData="value" v-for="value in store.mainData.children")
    <hr>
    SecDimensioInput(:textSplit="pair" v-for="pair in store.secDimensionList")
  TreeCompView.right-col(:treeData="store.get_floorOneTree")
div
  ul
    li(v-for="value in inputData")
      h4 {{value.pairKey}}
      h4  {{value.pairVal}}
</template>
<script setup lang="ts">
const router = useRouter();
const store = useStore();

// const mainDataLocal = ref({
//   id: "root",
//   text: "底層",
//   children: [
//     {
//       id: "t001-1",
//       text: "階層1-1",
//       children: [
//         {
//           id: "t002-1",
//           text: "階層2-1",
//           children: [
//             {
//               id: "t003-1",
//               text: "階層3-1",
//               children: [
//                 {
//                   id: "t004-1",
//                   text: "階層4-1",
//                   children: [
//                     {
//                       id: "t005-1",
//                       text: "階層5-1",
//                       children: [],
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: "t002-2",
//           text: "階層2-2",
//           children: [],
//         },
//       ],
//     },
//     {
//       id: "t001-2",
//       text: "階層1-2",
//       children: [],
//     },
//   ],
// });

const inputData = ref([
  {
    pairKey: "nav.header.creator",
    pairVal: "3D Fabric Creator",
  },
  {
    pairKey: "nav.icon",
    pairVal: "Icon name",
  },
  {
    pairKey: "nav.header.product",
    pairVal: "Product",
  },
  {
    pairKey: "common.feature.experience",
    pairVal: "Try It Now!",
  },
  {
    pairKey: "common.feature.chooseFabric",
    pairVal: "Choose Fabric",
  },
]);

// 父階層對照表
const nodes = {
  nav: {
    id: "nav",
    parent_id: "",
    value: "I am nav",
  },
  header: {
    id: "header",
    parent_id: "nav",
    value: "I am header",
  },
  creator: {
    id: "creator",
    parent_id: "header",
    value: "I am creator",
  },
  icon: {
    id: "icon",
    parent_id: "nav",
    value: "I am icon",
  },
  product: {
    id: "product",
    parent_id: "header",
    value: "I am product",
  },
  common: {
    id: "common",
    parent_id: "",
    value: "I am common",
  },
  feature: {
    id: "feature",
    parent_id: "common",
    value: "I am feature",
  },
  experience: {
    id: "experience",
    parent_id: "feature",
    value: "I am experience",
  },
  chooseFabric: {
    id: "chooseFabric",
    parent_id: "feature",
    value: "I am chooseFabric",
  },
};

// 子階層對照表
const childrenOf = {
  nav: ["header", "icon"],
  header: ["creator", "product"],
  icon: [],
  creator: [],
  product: [],
  common: ["feature"],
  feature: ["experience", "chooseFabric"],
  experience: [],
  chooseFabric: [],
};

const mainDataComposition = () => {
  const parentArray = Object.values(childrenOf);
  const parentKeys = Object.keys(childrenOf);

  const nodeArray = Object.values(nodes);
  const nodeKeys = Object.keys(nodes);

  const rootTree = {};

  const arr = [1, 3, 4, 5, 6, 7, 8, 9, 10];
  const fn = (array) => {
    return array.reduce((prev, curr) => {
      // 查詢已建立的 陣列 是否有自己的上層
      let parentId = "";
      let newVal = "";
      Object.values(prev).forEach((val) => {
        if (val.children) {
          const searchIndex = val.children.indexOf(curr.parent_id);
          if (searchIndex >= 0) {
            parentId = val.id;
            newVal = val.children[searchIndex];
          }
        }
      });

      if (newVal.length > 0) {
        // 建立節點
        rootTree[parentId].children[newVal] = {
          id: curr.parent_id,
          text: "",
          children: childrenOf[curr.parent_id],
        };
      } else {
        // 建立節點
        rootTree[curr.parent_id] = {
          id: curr.parent_id,
          text: "",
          children: childrenOf[curr.parent_id],
        };
      }

      return rootTree;
    }, []);
  };

  fn(nodeArray);
  console.log(rootTree);
};
mainDataComposition();

// -----------------

// 匯入假資料
store.initFakeData();
</script>
<style>
.container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
}
.left-col,
.right-col {
  width: 50%;
}
input[readonly] {
  background-color: #eee;
  margin-left: 1rem;
  border: none;
}
</style>
