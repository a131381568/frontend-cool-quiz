import { defineStore } from "pinia";
import { pairInputType, nodeUnitType, childrenUnitType } from "@/type/types";
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
    nodes: <nodeUnitType>{},
    childrenOf: <childrenUnitType>{},
    secDimensionList: <pairInputType[]>[
      {
        pairKey: "a.bwdfwd.c.ddd",
        pairVal: "aaaaaaaaaaaaaaaaaaaa",
      },
      {
        pairKey: "a.b.c.vvssssssv",
        pairVal: "bbbbbbbbbbbbbbbbbb",
      },
      {
        pairKey: "a.b.c.vvv.iiidddi",
        pairVal: "ccccccccccccccccccc",
      },
      // {
      //   pairKey: "aaa.bbb.ccc",
      //   pairVal: "aaaaaaaaaaaaaaaaa",
      // },
      // {
      //   pairKey: "aaa.ddd.eee",
      //   pairVal: "bbbbbbbbbbbbbbbbbb",
      // },
      // {
      //   pairKey: "fff.ggg.hhh.iii.jjj.kkk.lll",
      //   pairVal: "cccccccc",
      // },
    ],
  }),
  actions: {
    setTime() {
      this.initTime = new Date().getTime();
    },
    getArraySameResult(a1: string[], a2: string[]) {
      let i: number = a1.length;
      if (i !== a2.length) return false;
      while (i--) {
        if (a1[Number(i)] !== a2[Number(i)]) return false;
      }
      return true;
    },
    genNonDuplicateID(randomLength: number) {
      return Number(
        Math.random().toString().substring(3, randomLength) + Date.now()
      ).toString(36);
    },
    // setTree(nodePath: string, preNodePath: string, hasParentId: string) {
    //   const splitArray = nodePath.split(".");
    //   const preSplitArray = nodePath.split(".");
    //   console.log("splitArray: ", splitArray);
    //   // =======================================
    //   // 提前判斷
    //   let frontRepeatIndex = -1;
    //   if (this.get_rootChild > 0) {
    //     // 搜尋 store 是否有符合的 root 上層
    //     this.mainData.children.forEach((item, index) => {
    //       if (item.nid === hasParentId) {
    //         frontRepeatIndex = index;
    //       }
    //     });

    //     if (frontRepeatIndex >= 0) {
    //       // 第一階的 nid
    //       console.log("f-hasParentId:  ", frontRepeatIndex);
    //     } else {
    //       // 不重複的直接加在後面
    //       console.log("f-不重複的直接加在後面");
    //     }
    //   }
    //   // ==========================================
    //   // 沒有的話就自己建立一個
    //   console.log("沒有的話就自己建立一個");

    //   if (
    //     splitArray.length > 0 &&
    //     splitArray[0].length > 0 &&
    //     splitArray[splitArray.length - 1].length > 0
    //   ) {
    //     // 先把 node 全部建立出來
    //     const rootArray: any = [];
    //     // console.log(splitArray);
    //     splitArray.reduce((prev, currVal, currIndex) => {
    //       // console.log("currIndex: ", currIndex);
    //       const genId = "id-" + this.genNonDuplicateID(5);
    //       rootArray.push({
    //         nid: genId,
    //         id: splitArray[currIndex],
    //         // parentId: currIndex === 0 ? "" : prev,
    //         parentId: currIndex === 0 ? "" : prev,
    //         text: currIndex === splitArray.length - 1 ? nodePath : "",
    //         children: [],
    //       });
    //       return genId;
    //     }, "");

    //     // 再分階層
    //     rootArray.forEach((item: any, index: number, array: any) => {
    //       if (item.parentId) {
    //         array.forEach((oriVal: any, oriIndex: number) => {
    //           if (oriVal.nid === item.parentId) {
    //             rootArray[oriIndex].children.push(item);
    //           }
    //         });
    //       }
    //     });

    //     // 判斷父層是否為 root 階層, 最後設置
    //     // 節點只有一個點
    //     const newRootArray = rootArray.filter(
    //       (fItemn: any) => !fItemn.parentId
    //     );
    //     // console.log(newRootArray);
    //     // console.log(splitArray[0]);

    //     if (this.get_rootChild > 0) {
    //       this.mainData.children[frontRepeatIndex].children[0] =
    //         newRootArray[0];

    //       // let repeatIndex = -1;
    //       // this.mainData.children.forEach((innderItem, innerIndex) => {
    //       //   if (innderItem.id === splitArray[0]) {
    //       //     repeatIndex = innerIndex;
    //       //   }
    //       // });

    //       // // 判斷是否在第二層含以上重複
    //       // if (repeatIndex >= 0) {
    //       //   // 第一階重複

    //       //   // 第二階以上重複
    //       //   console.log("重複的");
    //       //   this.mainData.children[repeatIndex] = newRootArray[0];
    //       // } else {
    //       //   // 不重複的直接加在後面
    //       //   console.log("不重複的直接加在後面");
    //       //   this.mainData.children.push(...newRootArray);
    //       // }
    //     }
    //   } else {
    //     console.log("???");
    //   }
    // },
    // setNewTree() {
    //   this.mainData.children.push({
    //     // nid: "root-node-nid",
    //     nid: "id-" + this.genNonDuplicateID(5),
    //     id: "root-node",
    //     text: "",
    //     children: [],
    //   });
    // },
    // removeTree(nId: string) {
    //   const newRootTree = this.mainData.children.filter(
    //     (item) => item.nid !== nId
    //   );
    //   this.mainData.children = newRootTree;
    // },
    // initFakeData() {
    //   this.mainData.children = [
    //     {
    //       nid: "id-6bg40ehghn",
    //       id: "root-node",
    //       text: "nav.header.creator",
    //       children: [],
    //     },
    //     {
    //       nid: "id-39k7z6g5az",
    //       id: "root-node",
    //       text: "nav.icon",
    //       children: [],
    //     },
    //     {
    //       nid: "id-9gvlzcbwpv",
    //       id: "root-node",
    //       text: "common.feature.chooseFabric",
    //       children: [],
    //     },
    //   ];
    // },
    changeSecDimension(nodeList: string[]) {
      const nodeArray = Object.values(this.nodes);
      const nodeArrayByOriId = nodeArray.map((item) => item.id);
      const parentKeys = Object.keys(this.childrenOf);
      const parentValues = Object.values(this.childrenOf);
      console.log("當下全部 nodeId: ", nodeArrayByOriId);
      // console.log("parentKeys: ", parentKeys);
      // console.log("parentValues: ", parentValues);

      // 組合二維陣列
      nodeList.reduce((prev, currVal, currIndex) => {
        const nid = "n-" + this.genNonDuplicateID(5);

        // 先搜尋是否有重複的 nodeId
        const repeatNodeId = nodeArrayByOriId.indexOf(currVal);

        // 有重複就取得原 node 資訊
        if (repeatNodeId >= 0) {
          console.log("repeatNodeId: ", currVal);
          const repeatNodeInfo = nodeArray[Number(repeatNodeId)];
          const repeatNodeParentId = repeatNodeInfo.parentId;

          console.log("repeatNodeParentId: ", repeatNodeParentId);
        } else {
          // 不重複
          // this.childrenOf[`${prev}`].push(nid);
          console.log("noRepeatNodeId: ", currVal);
          // 如果 parentId 和 id 相同就覆蓋
        }
        // 全部節點
        this.nodes[`${nid}`] = {
          nid: nid,
          id: currVal,
          parentId: prev,
          text: "I am " + currVal,
          children: [],
        };

        // 父階層, 先製作空陣列
        if (!Object.prototype.hasOwnProperty.call(this.childrenOf, nid)) {
          this.childrenOf[`${nid}`] = [];
        }
        if (prev) {
          // 判斷是否有 key
          if (Object.prototype.hasOwnProperty.call(this.childrenOf, prev)) {
            if (repeatNodeId >= 0) {
              // 重複
            } else {
              // 不重複
            }
            // 查詢 oriId 有沒有重複值, 沒有重複才推上去
            this.childrenOf[`${prev}`].push(nid);
          } else {
            console.log("其他: ", nid);
            this.childrenOf[`${prev}`] = [];
            this.childrenOf[`${prev}`].push(nid);
          }
        }
        return nid;
      }, "");
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
      const nodeArray = Object.values(state.nodes);
      const nodeKeys = Object.keys(state.nodes);
      const parentKeys = Object.keys(state.childrenOf);
      const parentValues = Object.values(state.childrenOf);
      // console.log("nodeArray: ", nodeArray);
      // console.log("nodeKeys: ", nodeKeys);
      // console.log("parentKeys: ", parentKeys);
      // console.log("parentValues: ", parentValues);
      // 父陣列
      const setParentMap = parentValues.map((item, index) => {
        const nodeInfo = nodeArray.filter(
          (node) => node.nid === parentKeys[Number(index)]
        );
        const childrenInfo = item.map((chInfo: any) => {
          const actionNodeKeys: number = nodeKeys.indexOf(chInfo);
          return nodeArray[Number(actionNodeKeys)];
        });
        const newItem = {
          nid: parentKeys[Number(index)],
          id: nodeInfo[0].id,
          parentId: nodeInfo.length > 0 ? nodeInfo[0].parentId : "",
          text: "", // parentKeys[index].text
          children: childrenInfo,
        };
        // console.log("nodeInfo: ", nodeInfo);
        // console.log("childrenInfo: ", childrenInfo);
        // console.log("item: ", item);
        // console.log("newItem: ", newItem);
        return newItem;
      });

      // 父層巢狀收縮
      const getId = (mainData: any) => {
        if (mainData.children && Array.isArray(mainData.children)) {
          // console.log(mainData.children);
          mainData.children.reduce(
            (prev: any, currVal: any, currIndex: number, array: any) => {
              // console.log(currVal);
              const concatIdArray = array.map((item: any) => item.nid);
              const childrenArray = currVal.children.map((parenScInfo: any) => {
                // console.log("parenScInfo.id: ", parenScInfo.nid);
                const actionNodeKeys: number = concatIdArray.indexOf(
                  parenScInfo.nid
                );
                return array[Number(actionNodeKeys)];
              });
              currVal.children = childrenArray;
              // 重複
              // if (!currVal.parentId && currVal.children.length > 0) {
              //   getId(mainData.children);
              // }
              // console.log("prev: ", prev, "currVal: ", currVal);
              return currVal;
            },
            []
          );
          const filterMainData = mainData.children.filter(
            (item: any) => !item.parentId
          );
          return filterMainData;
        }
      };

      const mainData = {
        nid: "",
        id: "root",
        parentId: "",
        text: "",
        children: setParentMap,
      };

      // 最後設置
      const settingMainData = {
        nid: "",
        id: "root",
        parentId: "",
        text: "",
        children: getId(mainData),
      };

      return settingMainData;
    },
    // bak_get_floorOneTree: (state) => {
    //   const childrenOf = state.childrenOf;
    //   const nodeArray = Object.values(state.nodes);
    //   // const nodeKeys = Object.keys(state.nodes);
    //   const parentKeys = Object.keys(childrenOf);
    //   let parentKeysTop = [];

    //   // 子陣列
    //   const parentArray = Object.values(childrenOf).filter((item, index) => {
    //     if (item.length > 0) {
    //       parentKeysTop = parentKeysTop.concat(
    //         nodeArray.filter((item) => item.id === parentKeys[index])
    //       );
    //       return item;
    //     }
    //   });

    //   console.log("parentArray: ", parentArray);

    //   // 父陣列
    //   const setParentMap = parentArray.map((item, index) => {
    //     console.log(item);

    //     const newItem = {
    //       nid: "",
    //       id: parentKeysTop[index].id, // parentKeysTop[index],
    //       parentId: parentKeysTop[index].parentId,
    //       text: parentKeysTop[index].text,
    //       children: [],
    //     };
    //     const cildrenArray = nodeArray.filter((fel) => {
    //       return item.indexOf(fel.id) >= 0;
    //     });
    //     newItem.children = cildrenArray;
    //     return newItem;
    //   });

    //   const getId = (xxxx, n) => {
    //     if (xxxx.children) {
    //       const floor = n + 1;
    //       console.log("floor: ", floor);
    //       xxxx.children.forEach((el, index) => {
    //         console.log(`
    //         id:   ${el.id}
    //         el:   ${index}
    //         `);
    //         if (xxxx.children[index]) {
    //           getId(xxxx.children[index], floor);
    //         }
    //       });
    //     }
    //   };

    //   // 檢查是否還有 parentId 未歸類
    //   setParentMap.reduce((prev, currVal, currIndex, array) => {
    //     const concatArray = prev.concat(currVal);
    //     const concatIdArray = concatArray.map((item) => item.id);

    //     getId(currVal, 0);

    //     if (currVal.parentId.length > 0) {
    //       // const searchParentOrder = concatIdArray.indexOf(currVal.parentId);
    //       // const searchItemOrder = concatIdArray.indexOf(currVal.id);
    //       // 減 1 ?
    //       // concatArray[searchParentOrder].children[searchItemOrder] = currVal;
    //     }
    //     return concatArray;
    //   }, []);

    //   // const remainderArray = setParentMap.filter((item) => !item.parentId);

    //   // 最後設置
    //   const mainData = {
    //     nid: "",
    //     id: "root",
    //     parentId: "",
    //     text: "",
    //     children: setParentMap,
    //   };

    //   return mainData;
    // },
  },
});
