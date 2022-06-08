import { defineStore } from "pinia";
import { useThrottleFn } from "@vueuse/core";
import {
  pairInputType,
  nodeUnitType,
  childrenUnitType,
  nodeUnitValueType,
} from "@/type/types";
// import router from "./router";
const vm = this;
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
      // {
      //   pairKey: "a.bwdfwd.c.ddd",
      //   pairVal: "aaaaaaaaaaaaaaaaaaaa",
      // },
      // {
      //   pairKey: "a.b.c.vvssssssv",
      //   pairVal: "bbbbbbbbbbbbbbbbbb",
      // },
      // {
      //   pairKey: "a.b.c.vvv.iiidddi",
      //   pairVal: "ccccccccccccccccccc",
      // },
      /////////////
      // {
      //   pairKey: "nav.header.creator",
      //   pairVal: "3D Fabric Creator",
      // },
      // {
      //   pairKey: "nav.icon",
      //   pairVal: "Icon name",
      // },
      // {
      //   pairKey: "nav.header.product",
      //   pairVal: "Product",
      // },
      // {
      //   pairKey: "common.feature.experience",
      //   pairVal: "Try It Now!",
      // },
      // {
      //   pairKey: "common.feature.chooseFabric",
      //   pairVal: "Choose Fabric",
      // },
      // {
      //   pairKey: "xxxxxxxxx.nav",
      //   pairVal: "wwwwwwwwwwwwwwwwwwwwww",
      // },
      // {
      //   pairKey: "qqqqqqqqqqq.icon",
      //   pairVal: "qqqqqqqqqqq",
      // },
      // {
      //   pairKey: "asffff.ttt.header.last.creator",
      //   pairVal: "hhhhhhhhhhhhhhhhhhhh",
      // },
    ],
    lockBtn: false,
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
    changeSecDimension(nodeList: string[]) {
      const nodeArray = Object.values(this.nodes);
      const nodeArrayByOriId = nodeArray.map((item) => item.id);
      const parentKeys = Object.keys(this.childrenOf);
      const parentValues = Object.values(this.childrenOf);
      let prevNid = "";
      // console.log("當下全部 nodeId: ", nodeArrayByOriId);
      // console.log("parentKeys: ", parentKeys);
      // console.log("parentValues: ", parentValues);

      // 組合二維陣列
      nodeList.reduce((prev, currVal, currIndex, oriArray) => {
        const nid = "n-" + this.genNonDuplicateID(5);
        let repeatNodeType = false;
        let prevId = "";
        // 先判斷是否有重複的 node
        const repeatNodeId = nodeArrayByOriId.indexOf(currVal);
        // console.log("nodeArrayByOriId: ", nodeArrayByOriId);

        // 有重複就取得原 node 資訊
        if (repeatNodeId >= 0) {
          // 可能會同時有三個以上重複, 全都要檢查
          const totalRepeatGroup = nodeArray.filter(
            (item) => item.id === currVal
          );

          if (currIndex === 0) {
            // 如果是陣列中第一位重複, 就判斷是不是上層為""
            const checkInclude = totalRepeatGroup.some(
              (item) => item.parentId === ""
            );
            // 跟自己一樣名稱又上層為"", 視為同一個 node
            if (checkInclude) {
              repeatNodeType = true;
              // console.log("第一輪重複 key = " + currVal);
            }
          } else {
            // 不是第一位, 就要判斷 parentId 是否相同
            const repeatNodeInfo = nodeArray[Number(repeatNodeId)];
            prevId = oriArray[currIndex - 1];
            const prevNidOrder = nodeArrayByOriId.indexOf(prevId);
            prevNid = parentKeys[Number(prevNidOrder)];
            ///////////////////////////////////////////////////
            // 可能會同時有三個以上重複, 全都要檢查
            const checkInclude = totalRepeatGroup.some(
              (item) => item.parentId === prevNid
            );
            /////////////////////////////////////////////
            // console.log("repeatNodeId: ", currVal);
            // console.log("repeatNid: ", repeatNodeInfo.nid);
            // console.log(
            //   "repeatParentId ( 重複的上層 Nid ) : ",
            //   repeatNodeInfo.parentId
            // );
            // console.log(prevId);
            // console.log(nodeArrayByOriId);
            // console.log("( 自己目前的上層 Nid ) prevNid: ", prevNid);
            // 重複模式
            repeatNodeType = true;
            // 重複的 ndoe, 它們的 parentId 需相同才符合重複規則
            if (!checkInclude) {
              // console.log(currVal, "不是真正的重複");
              repeatNodeType = false;
            }
          }

          ///////////////////////////////////////////////////
        } else {
          // 不重複
          // this.childrenOf[`${prev}`].push(nid);
          // console.log("noRepeatNodeId: ", currVal);
          repeatNodeType = false;
          // 如果 parentId 和 id 相同就覆蓋
          ///////////////////////////////////////////////////
          // console.log("oriArray: ", oriArray);
          // console.log("currVal: ", currVal);
          ////////////////////////////////////////////////////////////
        }

        if (repeatNodeType === false) {
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
          if (
            prev &&
            Object.prototype.hasOwnProperty.call(this.childrenOf, prev)
          ) {
            this.childrenOf[`${prev}`].push(nid);
          }
        }

        // currIndex > 0 && nodeArrayByOriId.length > 0 && repeatNodeType
        if (repeatNodeType) {
          /////////////////////
          // console.log("上面-prevNid: ", prevNid);
          // console.log(`
          //     id 為 --------------- ${currVal}
          //     自己的 nid 為 -------  ${nid}
          //     上層 id 為 ----------- ${prevId}
          //     上層的 nid 為 -------  ${prevNid}
          // `);
          ///////////////////
          //   console.log(currVal + "--- 回傳上層 nid? :" + prevNid);
          //   // 回傳上層 nid?
          //   return prevNid;

          if (currIndex === 0) {
            // 回傳重複的第一位的 nid
            let floorOneNid = nid;
            const floorOneInfo = nodeArray.filter(
              (item) => item.id === currVal && !item.parentId
            );
            if (floorOneInfo.length > 0) {
              floorOneNid = floorOneInfo[0].nid;
            }
            return floorOneNid;
          } else {
            // 回傳自己的 nid
            const repeatOwnOrder = nodeArrayByOriId.indexOf(currVal);
            const repeatNodeInfo = nodeArray[Number(repeatOwnOrder)];
            const repeatOwnNid = repeatNodeInfo.nid;
            return repeatOwnNid;
          }
        } else {
          // console.log("下面-nid: ", nid);
          return nid;
        }
      }, "");
    },
    addSecDimensionItem() {
      // 新增輸入欄
      this.secDimensionList.push({
        pairKey: "",
        pairVal: "",
      });
    },
    removeSecDimensionItem(pairKey: string, order: number) {
      console.log(order);
      // 刪除輸入欄
      // const sdList = this.secDimensionList.filter(
      //   (item) => item.pairKey !== pairKey
      // );
      // this.secDimensionList = sdList;

      this.secDimensionList.splice(order, 1);

      // 初始化
      // this.initSecDimension();
      ////////////////////////////////////
      // const splitStr = pairKey.split(".");
      // const nodeArray = Object.values(this.nodes);
      // const parentKeys = Object.keys(this.childrenOf);
      // const parentValues = Object.values(this.childrenOf);
      // // 第一個節點
      // const firstStr = splitStr[0];
      // const firstNodes = nodeArray.filter(
      //   (item) => item.id === firstStr && !item.parentId
      // );
      // 最後的節點
      // const lastStr = splitStr[splitStr.length - 1];
      // const lastNodes = nodeArray.filter((item) => item.id === lastStr);
      // console.log("最後的節點: ", lastNodes);

      // // 除此頂層以外的節點
      // const inCludeNodes = nodeArray.filter(
      //   (item) => splitStr.indexOf(item.id) > 0
      // );

      // // 查詢頂層 nid 函式
      // const findFirstNid: any = (item: nodeUnitValueType) => {
      //   const onlyParentId = item.parentId;
      //   if (onlyParentId) {
      //     const findParentNode = nodeArray.filter(
      //       (node) => node.nid === onlyParentId
      //     );
      //     return findFirstNid(findParentNode[0]);
      //   } else {
      //     return item.nid;
      //   }
      // };

      // // 查詢子 node 所有 nid
      // const inCludeNodesNid: string[] = []; // firstNodes[0].nid
      // inCludeNodes.forEach((otherNode) => {
      //   if (findFirstNid(otherNode) === firstNodes[0].nid) {
      //     inCludeNodesNid.push(otherNode.nid);
      //   }
      // });

      // // store.childrenOf 刪除指定 nid
      // // const searchParentKeysOrderGroup = [];
      // // const searchParentKeys =
      // parentKeys.forEach((item, index) => {
      //   if (inCludeNodesNid.indexOf(item) >= 0) {
      //     // searchParentKeysOrderGroup.push(index);
      //     console.log(item);

      //     if (parentValues[Number(index)].length === 0) {
      //       console.log("直接刪除: ", this.childrenOf[`${item}`]);
      //       delete this.childrenOf[parentKeys[Number(index)]];
      //       delete this.nodes[`${item}`];
      //     } else {
      //       console.log("排除陣列中的 nid: ", this.childrenOf[`${item}`]);
      //       // childrenOf value, 排除陣列中的 nid
      //       console.log(parentValues[Number(index)]);

      //       const rmChildInnerArray = parentValues[Number(index)].filter(
      //         (inCludeItem) => inCludeNodesNid.indexOf(inCludeItem) >= 0
      //       );
      //       console.log(rmChildInnerArray);
      //       this.childrenOf[`${item}`] = rmChildInnerArray;
      //     }
      //   }
      // });

      // // store.nodes 刪除指定 nid
      // inCludeNodesNid.forEach((item) => {
      //   // delete this.nodes[item];
      //   // delete this.childrenOf[item];
      // });

      //////////////////////////////
    },
    // 初始化事件
    initSecDimension() {
      console.log("初始化事件");
      this.nodes = {};
      this.childrenOf = {};
      this.secDimensionList.forEach((item) => {
        const splitStr = item.pairKey.split(".");
        this.changeSecDimension(splitStr);
      });
    },
    // buildFloorOneTree: useThrottleFn(function (
    //   nodeList: nodeUnitValueType[],
    //   nodeTitle: string[],
    //   parentTitle: string[],
    //   parentList: any
    // ) {
    //   console.log("buildFloorOneTree");
    //   const nodeArray = nodeList;
    //   const nodeKeys = nodeTitle;
    //   const parentKeys = parentTitle;
    //   const parentValues = parentList;
    //   // 父陣列
    //   const setParentMap = parentValues.map((item: any, index: number) => {
    //     const nodeInfo = nodeArray.filter(
    //       (node: any) => node.nid === parentKeys[Number(index)]
    //     );
    //     const childrenInfo = item.map((chInfo: any) => {
    //       const actionNodeKeys: number = nodeKeys.indexOf(chInfo);
    //       return actionNodeKeys >= 0 ? nodeArray[Number(actionNodeKeys)] : [];
    //     });
    //     const newItem = {
    //       nid: parentKeys[Number(index)],
    //       id: nodeInfo[0].id,
    //       parentId: nodeInfo.length > 0 ? nodeInfo[0].parentId : "",
    //       text: "", // parentKeys[index].text
    //       children: childrenInfo,
    //     };
    //     return newItem;
    //   });
    //   // 父層巢狀收縮
    //   const getId = (mainData: any) => {
    //     if (mainData.children && Array.isArray(mainData.children)) {
    //       mainData.children.reduce(
    //         (prev: any, currVal: any, currIndex: number, array: any) => {
    //           const concatIdArray = array.map((item: any) => item.nid);
    //           const childrenArray = currVal.children.map((parenScInfo: any) => {
    //             const actionNodeKeys: number = concatIdArray.indexOf(
    //               parenScInfo.nid
    //             );
    //             return array[Number(actionNodeKeys)];
    //           });
    //           currVal.children = childrenArray;
    //           return currVal;
    //         },
    //         []
    //       );
    //       const filterMainData = mainData.children.filter(
    //         (item: any) => !item.parentId
    //       );
    //       return filterMainData;
    //     }
    //   };
    //   const mainData = {
    //     nid: "",
    //     id: "root",
    //     parentId: "",
    //     text: "",
    //     children: setParentMap,
    //   };
    //   // 最後設置
    //   const settingMainData = {
    //     nid: "",
    //     id: "root",
    //     parentId: "",
    //     text: "",
    //     children: getId(mainData),
    //   };
    //   this.secDimensionTree = settingMainData;
    // },
    // 1000),
    setLockBtnOpen() {
      this.lockBtn = true;
    },
    setLockBtnClose() {
      this.lockBtn = false;
    },
  },
  getters: {
    get_initTime: (state) => {
      return state.initTime;
    },
    get_rootChild: (state) => {
      return state.mainData.children.length;
    },
    get_floorOneTree(state) {
      const nodeArray = Object.values(state.nodes);
      const nodeKeys = Object.keys(state.nodes);
      const parentKeys = Object.keys(state.childrenOf);
      const parentValues = Object.values(state.childrenOf);
      /////////////////////////////////////////
      // 父陣列
      const setParentMap = parentValues.map((item: any, index: number) => {
        const nodeInfo = nodeArray.filter(
          (node: any) => node.nid === parentKeys[Number(index)]
        );
        const childrenInfo = item.map((chInfo: any) => {
          const actionNodeKeys: number = nodeKeys.indexOf(chInfo);
          return actionNodeKeys >= 0 ? nodeArray[Number(actionNodeKeys)] : [];
        });
        const newItem = {
          nid: parentKeys[Number(index)],
          id: nodeInfo[0].id,
          parentId: nodeInfo.length > 0 ? nodeInfo[0].parentId : "",
          text: "", // parentKeys[index].text
          children: childrenInfo,
        };
        return newItem;
      });
      // 父層巢狀收縮
      const getId = (mainData: any) => {
        if (mainData.children && Array.isArray(mainData.children)) {
          mainData.children.reduce(
            (prev: any, currVal: any, currIndex: number, array: any) => {
              const concatIdArray = array.map((item: any) => item.nid);
              const childrenArray = currVal.children.map((parenScInfo: any) => {
                const actionNodeKeys: number = concatIdArray.indexOf(
                  parenScInfo.nid
                );
                return array[Number(actionNodeKeys)];
              });
              currVal.children = childrenArray;
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
      ////////////////////////////////////
      // const result = state.secDimensionTree;
      return settingMainData;
    },
    get_lockBtnState(state) {
      return state.lockBtn;
    },
    get_nodes(state) {
      return state.nodes;
    },
    get_childrenOf(state) {
      return state.childrenOf;
    },
    // bak_get_floorOneTree: (state) => {
    //   const nodeArray = Object.values(state.nodes);
    //   const nodeKeys = Object.keys(state.nodes);
    //   const parentKeys = Object.keys(state.childrenOf);
    //   const parentValues = Object.values(state.childrenOf);
    //   // console.log("nodeArray: ", nodeArray);
    //   // console.log("nodeKeys: ", nodeKeys);
    //   // console.log("parentKeys: ", parentKeys);
    //   // console.log("parentValues: ", parentValues);
    //   // 父陣列
    //   const setParentMap = parentValues.map((item, index) => {
    //     const nodeInfo = nodeArray.filter(
    //       (node) => node.nid === parentKeys[Number(index)]
    //     );
    //     // console.log(parentKeys[Number(index)]);
    //     const childrenInfo = item.map((chInfo: any) => {
    //       const actionNodeKeys: number = nodeKeys.indexOf(chInfo);
    //       // console.log("尋找: ", chInfo);
    //       // console.log("尋找id: ", state.nodes[`${chInfo}`]);
    //       // console.log("actionNodeKeys: ", actionNodeKeys);
    //       // 使刪除節點不會錯誤
    //       // nodeArray[Number(actionNodeKeys)];
    //       // actionNodeKeys >= 0 ? nodeArray[Number(actionNodeKeys)] : [];
    //       return actionNodeKeys >= 0 ? nodeArray[Number(actionNodeKeys)] : [];
    //     });
    //     // console.log("nodeInfo: ", nodeInfo);
    //     const newItem = {
    //       nid: parentKeys[Number(index)],
    //       id: nodeInfo[0].id,
    //       parentId: nodeInfo.length > 0 ? nodeInfo[0].parentId : "",
    //       text: "", // parentKeys[index].text
    //       children: childrenInfo,
    //     };
    //     // console.log("childrenInfo: ", childrenInfo);
    //     // console.log("item: ", item);
    //     // console.log("newItem: ", newItem);
    //     return newItem;
    //   });

    //   // 父層巢狀收縮
    //   const getId = (mainData: any) => {
    //     if (mainData.children && Array.isArray(mainData.children)) {
    //       // console.log(mainData.children);
    //       mainData.children.reduce(
    //         (prev: any, currVal: any, currIndex: number, array: any) => {
    //           // console.log(currVal);
    //           const concatIdArray = array.map((item: any) => item.nid);
    //           // console.log(currVal);
    //           // console.log(currVal.children);
    //           const childrenArray = currVal.children.map((parenScInfo: any) => {
    //             // console.log("parenScInfo.id: ", parenScInfo.nid);
    //             // console.log("parenScInfo: ", parenScInfo);
    //             const actionNodeKeys: number = concatIdArray.indexOf(
    //               parenScInfo.nid
    //             );
    //             return array[Number(actionNodeKeys)];
    //           });
    //           currVal.children = childrenArray;
    //           // 重複
    //           // if (!currVal.parentId && currVal.children.length > 0) {
    //           //   getId(mainData.children);
    //           // }
    //           // console.log("prev: ", prev, "currVal: ", currVal);
    //           return currVal;
    //         },
    //         []
    //       );
    //       const filterMainData = mainData.children.filter(
    //         (item: any) => !item.parentId
    //       );
    //       return filterMainData;
    //     }
    //   };

    //   const mainData = {
    //     nid: "",
    //     id: "root",
    //     parentId: "",
    //     text: "",
    //     children: setParentMap,
    //   };

    //   // 最後設置
    //   const settingMainData = {
    //     nid: "",
    //     id: "root",
    //     parentId: "",
    //     text: "",
    //     children: getId(mainData),
    //   };

    //   return settingMainData;
    // },
    get_secDimensionList(state) {
      return state.secDimensionList;
    },
  },
});
