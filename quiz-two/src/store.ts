import { defineStore } from "pinia";
// import router from "./router";

export const useStore = defineStore("main", {
  state: () => ({
    initTime: 0,
    mainData: {
      nid: "",
      id: "root",
      parentId: "",
      text: "",
      children: [],
    },
    ///////
    nodes: {
      aaa: {
        nid: "",
        id: "aaa",
        parentId: "",
        text: "I am aaa",
      },
      bbb: {
        nid: "nidnidb",
        id: "bbb",
        parentId: "aaa",
        text: "I am bbb",
      },
      ccc: {
        nid: "",
        id: "ccc",
        parentId: "bbb",
        text: "I am ccc",
      },
      ddd: {
        nid: "",
        id: "ddd",
        parentId: "aaa",
        text: "I am ddd",
      },
      eee: {
        nid: "",
        id: "eee",
        parentId: "ddd",
        text: "I am eee",
      },
    },
    childrenOf: {
      aaa: ["bbb", "ddd"],
      bbb: ["ccc"],
      ccc: [],
      ddd: ["eee"],
      eee: [],
    },
  }),
  actions: {
    setTime() {
      this.initTime = new Date().getTime();
    },
    genNonDuplicateID(randomLength: number) {
      return Number(
        Math.random().toString().substring(3, randomLength) + Date.now()
      ).toString(36);
    },
    setTree(nodePath: string, preNodePath: string, hasParentId: string) {
      const splitArray = nodePath.split(".");
      const preSplitArray = nodePath.split(".");
      console.log("splitArray: ", splitArray);
      // =======================================
      // 提前判斷
      let frontRepeatIndex = -1;
      if (this.get_rootChild > 0) {
        // 搜尋 store 是否有符合的 root 上層
        this.mainData.children.forEach((item, index) => {
          if (item.nid === hasParentId) {
            frontRepeatIndex = index;
          }
        });

        if (frontRepeatIndex >= 0) {
          // 第一階的 nid
          console.log("f-hasParentId:  ", frontRepeatIndex);
        } else {
          // 不重複的直接加在後面
          console.log("f-不重複的直接加在後面");
        }
      }
      // ==========================================
      // 沒有的話就自己建立一個
      console.log("沒有的話就自己建立一個");

      if (
        splitArray.length > 0 &&
        splitArray[0].length > 0 &&
        splitArray[splitArray.length - 1].length > 0
      ) {
        // 先把 node 全部建立出來
        const rootArray = [];
        // console.log(splitArray);
        splitArray.reduce((prev, currVal, currIndex) => {
          // console.log("currIndex: ", currIndex);
          const genId = "id-" + this.genNonDuplicateID(5);
          rootArray.push({
            nid: genId,
            id: splitArray[currIndex],
            // parentId: currIndex === 0 ? "" : prev,
            parentId: currIndex === 0 ? "" : prev,
            text: currIndex === splitArray.length - 1 ? nodePath : "",
            children: [],
          });
          return genId;
        }, "");

        // 再分階層
        rootArray.forEach((item, index, array) => {
          if (item.parentId) {
            array.forEach((oriVal, oriIndex) => {
              if (oriVal.nid === item.parentId) {
                rootArray[oriIndex].children.push(item);
              }
            });
          }
        });

        // 判斷父層是否為 root 階層, 最後設置
        // 節點只有一個點
        const newRootArray = rootArray.filter((fItemn) => !fItemn.parentId);
        // console.log(newRootArray);
        // console.log(splitArray[0]);

        if (this.get_rootChild > 0) {
          this.mainData.children[frontRepeatIndex].children[0] =
            newRootArray[0];

          // let repeatIndex = -1;
          // this.mainData.children.forEach((innderItem, innerIndex) => {
          //   if (innderItem.id === splitArray[0]) {
          //     repeatIndex = innerIndex;
          //   }
          // });

          // // 判斷是否在第二層含以上重複
          // if (repeatIndex >= 0) {
          //   // 第一階重複

          //   // 第二階以上重複
          //   console.log("重複的");
          //   this.mainData.children[repeatIndex] = newRootArray[0];
          // } else {
          //   // 不重複的直接加在後面
          //   console.log("不重複的直接加在後面");
          //   this.mainData.children.push(...newRootArray);
          // }
        }
      } else {
        console.log("???");
      }
    },
    setNewTree() {
      this.mainData.children.push({
        // nid: "root-node-nid",
        nid: "id-" + this.genNonDuplicateID(5),
        id: "root-node",
        text: "",
        children: [],
      });
    },
    removeTree(nId: string) {
      const newRootTree = this.mainData.children.filter(
        (item) => item.nid !== nId
      );
      this.mainData.children = newRootTree;
    },
    initFakeData() {
      this.mainData.children = [
        {
          nid: "id-6bg40ehghn",
          id: "root-node",
          text: "nav.header.creator",
          children: [],
        },
        {
          nid: "id-39k7z6g5az",
          id: "root-node",
          text: "nav.icon",
          children: [],
        },
        {
          nid: "id-9gvlzcbwpv",
          id: "root-node",
          text: "common.feature.chooseFabric",
          children: [],
        },
      ];
    },
  },
  getters: {
    get_initTime: (state) => {
      return state.initTime;
    },
    get_rootChild: (state) => {
      return state.mainData.children.length;
    },
    get_floorOneTree: (state) => {
      const childrenOf = state.childrenOf;
      const nodeArray = Object.values(state.nodes);
      // const nodeKeys = Object.keys(state.nodes);
      const parentKeys = Object.keys(childrenOf);
      let parentKeysTop = [];

      // 子陣列
      const parentArray = Object.values(childrenOf).filter((item, index) => {
        if (item.length > 0) {
          parentKeysTop = parentKeysTop.concat(
            nodeArray.filter((item) => item.id === parentKeys[index])
          );
          return item;
        }
      });

      // 父陣列
      const setParentMap = parentArray.map((item, index) => {
        const newItem = {
          nid: "",
          id: parentKeysTop[index].id, // parentKeysTop[index],
          parentId: parentKeysTop[index].parentId,
          text: parentKeysTop[index].text,
          children: [],
        };
        const cildrenArray = nodeArray.filter((fel) => {
          return item.indexOf(fel.id) >= 0;
        });
        newItem.children = cildrenArray;
        return newItem;
      });

      // 檢查是否還有 parentId 未歸類
      setParentMap.reduce((prev, currVal, currIndex, array) => {
        const concatArray = prev.concat(currVal);
        const concatIdArray = concatArray.map((item) => item.id);

        if (currVal.parentId.length > 0) {
          const searchParentOrder = concatIdArray.indexOf(currVal.parentId);
          const searchItemOrder = concatIdArray.indexOf(currVal.id);
          // 減 1 ?
          concatArray[searchParentOrder].children[searchItemOrder - 1] =
            currVal;
          console.log(
            "childrenOrder..: ",
            concatArray[searchParentOrder].children
          );
          console.log("searchParentOrder: ", searchParentOrder);
          console.log("searchItemOrder: ", searchItemOrder);
          console.log("currVal: ", currVal.id);
        }
        return concatArray;
      }, []);

      const remainderArray = setParentMap.filter((item) => !item.parentId);

      // 最後設置
      const mainData = {
        nid: "",
        id: "root",
        parentId: "",
        text: "",
        children: remainderArray,
      };
      return mainData;
    },
  },
});
