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
      // let prevNid = "";
      console.log("當下全部 nodeId: ", nodeArrayByOriId);
      console.log("parentKeys: ", parentKeys);
      console.log("parentValues: ", parentValues);

      // 組合二維陣列
      nodeList.reduce((prev, currVal, currIndex, oriArray) => {
        const nid = "n-" + this.genNonDuplicateID(5);
        let rootRepeat = false;
        let ownRepeat = false;
        let repeatNodeType = false;
        let multipleRepeatType = 0;

        // 先判斷頂層是否為重複的 node
        const findrootNode = nodeArray.filter(
          (node) => node.id === oriArray[0]
        );
        if (findrootNode.length > 0) {
          console.log(`
          目前同階頂層 id :  ${oriArray[0]}
          目前同階頂層 Nid:  ${findrootNode[0].nid}
          `);
          rootRepeat = true;
        } else {
          console.log(`
          目前同階頂層 id :  ${oriArray[0]}
          目前同階頂層 Nid:  找不到
          `);
          rootRepeat = false;
        }

        // 再判斷自己目前有沒有重複
        const ownNode = nodeArray.filter((node) => node.id === currVal);
        console.log("重複群組: ", ownNode);

        if (ownNode.length > 0) {
          console.log(`
          目前自己的 id :  ${currVal}
          目前自己的 Nid ( 不確定, 有可能重複 ):  ${ownNode[0].nid}
          `);
          ownRepeat = true;
        } else {
          console.log(`
          目前自己的 id :  ${currVal}
          目前自己的 Nid:  找不到
          `);
          ownRepeat = false;
        }

        if (rootRepeat && ownRepeat) {
          // 頂層重複 + 自己重複
          repeatNodeType = true;
          multipleRepeatType = 1;
        } else if (rootRepeat && !ownRepeat) {
          // 頂層重複 + 自己不重複
          repeatNodeType = false;
          multipleRepeatType = 2;
        } else if (!rootRepeat && ownRepeat) {
          // 頂層不重複 + 自己重複
          repeatNodeType = false;
          multipleRepeatType = 3;
        } else if (!rootRepeat && !ownRepeat) {
          // 頂層不重複 + 自己不重複
          repeatNodeType = false;
          multipleRepeatType = 4;
        }

        // 更新字串函式
        const updatePairValInNode = () => {
          let textContent = "";
          console.log(
            "如果是最後一輪則加上 text: ",
            currIndex,
            oriArray.length
          );
          if (currIndex + 1 === oriArray.length) {
            const filterContent = this.secDimensionList.filter(
              (item) => item.pairKey === oriArray.join(".")
            );
            if (filterContent.length > 0) {
              console.log(filterContent);
              textContent = filterContent[filterContent.length - 1].pairVal;
            }
          }
          return textContent;
        };

        // 新增 node + childOf 函式
        const setNodesAndChildOf = () => {
          // 全部節點
          this.nodes[`${nid}`] = {
            nid: nid,
            id: currVal,
            parentId: prev,
            text: updatePairValInNode(), // 如果是最後一輪則加上 text
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
        };

        // 有重複就取得原 node 資訊
        if (repeatNodeType) {
          console.log(ownNode);
          console.log(`
              id 為 --------------- ${currVal}
              自己的隨機 nid 為 -------  ${nid}
          `);
          if (currIndex === 0) {
            // 回傳重複的第一位的 nid
            let floorOneNid = nid;
            const floorOneInfo = nodeArray.filter(
              (item) => item.id === currVal && !item.parentId
            );
            if (floorOneInfo.length > 0) {
              floorOneNid = floorOneInfo[0].nid;
            }
            // 有重複又是最後一階, 就把字串更新上去
            this.nodes[`${floorOneNid}`].text = updatePairValInNode();
            return floorOneNid;
          } else {
            if (
              multipleRepeatType === 0 ||
              multipleRepeatType === 2 ||
              multipleRepeatType === 4
            ) {
              // 頂層重複 + 自己不重複 || 頂層不重複 + 自己不重複
              // 有重複又是最後一階, 就把字串更新上去
              this.nodes[`${nid}`].text = updatePairValInNode();
              return nid;
            } else if (multipleRepeatType === 1 || multipleRepeatType === 3) {
              // 頂層重複 + 自己重複 || 頂層不重複 + 自己重複
              // 重複, 回傳重複的 nid

              const findFirstNid: any = (item: nodeUnitValueType) => {
                const onlyParentId = item.parentId;
                if (onlyParentId) {
                  const findParentNode = nodeArray.filter(
                    (node) => node.nid === onlyParentId
                  );
                  return findFirstNid(findParentNode[0]);
                } else {
                  return item.nid;
                }
              };

              console.log("ownNode: ", ownNode);
              console.log("頂層 nid: ", findrootNode[0].nid);
              let realOwnNodeInfo: nodeUnitValueType = {
                nid: "",
                id: "",
                parentId: "",
                text: "",
                children: [],
              };
              if (ownNode.length === 0) {
                return nid;
              } else {
                ownNode.forEach((element) => {
                  // 前後值
                  // 頂層
                  if (findrootNode[0].nid === findFirstNid(element)) {
                    realOwnNodeInfo = element;
                  }
                  console.log(findFirstNid(element));
                });
                // 此為查詢到上下, 其他階層相同的 nid
                // 如果要查詢左右, 則是要判斷 parentId 是否相同
                console.log("realOwnNodeInfo: ", realOwnNodeInfo);
                console.log("oriArray: ", oriArray);
                if (realOwnNodeInfo.id && realOwnNodeInfo.parentId) {
                  const ownParentId = oriArray[currIndex - 1];
                  const searchParentId =
                    this.nodes[`${realOwnNodeInfo.parentId}`].id;
                  console.log("ownParentId: ", ownParentId);
                  console.log("searchParentId: ", searchParentId);
                  if (ownParentId === searchParentId) {
                    console.log("回傳 realOwnNodeInfo: ", realOwnNodeInfo.nid);
                    // 有重複又是最後一階, 就把字串更新上去
                    this.nodes[`${realOwnNodeInfo.nid}`].text =
                      updatePairValInNode();
                    // 回傳真正的 nid
                    return realOwnNodeInfo.nid;
                  } else {
                    console.log("新增 nid: ", nid);
                    // 有重複又是最後一階, 就把字串更新上去
                    this.nodes[`${nid}`].text = updatePairValInNode();
                    return nid;
                  }
                } else {
                  // id 相同 + nid 不相同, 此判斷為左右重複, 需新增節點
                  // 設置對照表
                  setNodesAndChildOf();
                  return nid;
                }
              }
            } else {
              // 預設不重複, 回傳 nid
              // 有重複又是最後一階, 就把字串更新上去
              this.nodes[`${nid}`].text = updatePairValInNode();
              console.log("預設不重複, 回傳 nid");
              return nid;
            }
          }
        } else {
          // 設置對照表
          setNodesAndChildOf();
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
      // 刪除輸入欄
      this.secDimensionList.splice(order, 1);
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
          text: nodeInfo[0].text, // parentKeys[index].text
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
