import { defineStore } from "pinia";
import { nodeItem, pairInputType } from "@/type/types";
export const useStore = defineStore("main", {
  state: () => ({
    lockBtn: false,
    spFloorOneTree: {
      nid: "n-123456789",
      key: "root",
      value: "",
      parentNid: "",
      inputFloor: 0,
      inputOrder: 0,
      children: [],
      frontSame: false,
      ellipsis: false,
    },
    nodeList: <nodeItem[]>[],
    protoNodeList: <nodeItem[]>[],
    enterInputGroup: <pairInputType[]>[],
  }),
  actions: {
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
    setLockBtnOpen() {
      this.lockBtn = true;
    },
    setLockBtnClose() {
      this.lockBtn = false;
    },
    addEnterInputPair() {
      // 新增輸入格
      const addCountGroup = [];
      const addCount = Number(import.meta.env.VITE_APP_BUILD_COUNT);
      for (let index = 0; index < addCount; index++) {
        addCountGroup.push(index + 1);
      }
      addCountGroup.reduce((pre, curr, index, array) => {
        // console.log("inputOrder: ", index);
        // 子層
        const nid = "n-" + this.genNonDuplicateID(5);
        const node = {
          nid: nid,
          key: "",
          value: "",
          parentNid: pre,
          inputFloor: this.enterInputGroup.length, // this.inputFloor,
          inputOrder: index,
          children: [],
          frontSame: false,
          ellipsis: false,
        };
        this.nodeList.push(node);
        this.protoNodeList.push(JSON.parse(JSON.stringify(node)));
        return nid;
      }, "");
      // 新增輸入框
      this.enterInputGroup.push({
        pairKey: "",
        pairVal: "",
      });
    },
    delOwnPair(order: number, array: number[]) {
      const delLoop = (arr: nodeItem[]) => {
        const stayList: nodeItem[] = [];
        arr.forEach((node, index) => {
          if (array.indexOf(index) === -1) {
            if (node.inputFloor > order) {
              // 如果是刪第一層, 全部都要 -1
              // 如果是刪中間, 小於自己的樓層都要 -1, 大於自己的樓層就不用變
              // 如果是刪最後一層, 自己是最後一層的話, 其他層就不用變更了
              node.inputFloor = node.inputFloor - 1;
            }
            stayList.push(node);
          }
        });
        return stayList;
      };
      // 活動 nodeList
      this.nodeList = delLoop(this.nodeList);
      // 原始 nodeList
      this.protoNodeList = delLoop(this.protoNodeList);
      // 刪除輸入欄
      this.enterInputGroup.splice(order, 1);
    },
    checkEnterInputGroupAfterBuild(array: pairInputType[]) {
      array.forEach((el) => {
        this.applyEnterInputPairInTree(el.pairKey, el.pairVal);
      });
    },
    applyEnterInputPairInTree(pairKey: string, pairVal: string) {
      const splitKeyArr = pairKey
        .split(".")
        .filter((item: string) => item !== "");
      let nodeValue = "";
      // 先設定節點數量範圍
      const applyCountGroup = [];
      const applyCount = Number(import.meta.env.VITE_APP_BUILD_COUNT);
      for (let index = 0; index < applyCount; index++) {
        applyCountGroup.push(index + 1);
      }
      applyCountGroup.reduce((pre, curr, index, array) => {
        // 最後一個節點才賦予 VAL
        if (index === splitKeyArr.length - 1) {
          nodeValue = pairVal;
        }
        // 節點資料
        const nid = "n-" + this.genNonDuplicateID(5);
        this.nodeList.push({
          nid: nid,
          key: splitKeyArr[`${index}`],
          value: nodeValue,
          parentNid: pre,
          inputFloor: this.enterInputGroup.length, // this.inputFloor,
          inputOrder: index,
          children: [],
          frontSame: false, // 再看怎麼改
          ellipsis: false,
        });
        return nid;
      }, "");

      // 設置原始資料
      this.protoNodeList = JSON.parse(JSON.stringify(this.nodeList));

      // 新增輸入框
      this.enterInputGroup.push({
        pairKey: pairKey,
        pairVal: pairVal,
      });
    },
    buildTreeByNodeList(
      arr: nodeItem[],
      setRepeatKey: string[],
      setRepeatNid: string[]
    ) {
      const result: nodeItem[] = [];
      if (!Array.isArray(arr) || arr.length === 0) {
        return result;
      }
      let setProtoNodes: nodeItem[] = [];

      // newArray.forEach((item) => {
      //   // 將異動的欄位階層補回來
      //   if (!item.parentNid && setRepeatKey.indexOf(item.key) === -1) {
      //     const resetParentNid = this.protoNodeList.filter(
      //       (rInfo) =>
      //         rInfo.inputFloor === item.inputFloor && rInfo.inputOrder !== 0
      //     );
      //     setProtoNodes = setProtoNodes.concat(resetParentNid);
      //     // console.log(item.key);
      //     console.log(setProtoNodes);
      //     // 將已經被過濾的也給拉回來
      //     const isRmNodeGroup = this.protoNodeList.filter(
      //       (rmInfo) => setRepeatNid.indexOf(rmInfo.nid) >= 0
      //     );
      //     const needReCoverNode = isRmNodeGroup.filter(
      //       (nrcInfo) => nrcInfo.parentNid === item.nid
      //     );
      //     if (needReCoverNode.length > 0) {
      //       const hasOwnChild = item.children.map(
      //         (hocNode: nodeItem) => hocNode.nid
      //       );
      //       const hasOwnNid = hasOwnChild.indexOf(
      //         needReCoverNode[needReCoverNode.length - 1].nid
      //       );
      //       if (hasOwnNid === -1) {
      //         item.children.push(needReCoverNode[needReCoverNode.length - 1]);
      //       }
      //       arr.push(needReCoverNode[needReCoverNode.length - 1]);
      //     }
      //   }

      //   const isSameNidOrder = setProtoNodes.filter(
      //     (spNode) => spNode.nid === item.nid
      //   );

      //   // 重新賦值
      //   if (isSameNidOrder.length > 0) {
      //     item = isSameNidOrder[0];
      //     item.value = "xxxxxxxxxxxxxx";
      //     console.log(item);
      //     // 搜尋有沒有跟自己一樣的
      //     const searchSameKey = arr.filter(
      //       (sameKey) => sameKey.key === item.key
      //     );
      //     console.log("searchSameKey: ", searchSameKey);
      //     if (searchSameKey.length > 0) {
      //       setProtoNodes.push(searchSameKey[0]);
      //     }
      //   }

      //   return item;
      // });

      const map: any = {};
      const nodeListNid: string[] = this.nodeList.map(
        (narr: nodeItem) => narr.nid
      );
      const nidArr: string[] = arr.map((narr: nodeItem) => narr.nid);
      arr.forEach((item) => {
        // 將異動的欄位階層補回來
        if (!item.parentNid && setRepeatKey.indexOf(item.key) === -1) {
          const resetParentNid = this.protoNodeList.filter(
            (rInfo) =>
              rInfo.inputFloor === item.inputFloor && rInfo.inputOrder !== 0
          );
          setProtoNodes = setProtoNodes.concat(resetParentNid);
          // console.log(item.key);
          // console.log(setProtoNodes);
          const isRmNodeGroup = this.protoNodeList.filter(
            (rmInfo) => setRepeatNid.indexOf(rmInfo.nid) >= 0
          );
          const needReCoverNode = isRmNodeGroup.filter(
            (nrcInfo) => nrcInfo.parentNid === item.nid
          );
          if (needReCoverNode.length > 0) {
            const hasOwnChild = item.children.map(
              (hocNode: nodeItem) => hocNode.nid
            );
            const hasOwnNid = hasOwnChild.indexOf(
              needReCoverNode[needReCoverNode.length - 1].nid
            );
            // if (hasOwnNid === -1) {
            const protoNode = needReCoverNode[needReCoverNode.length - 1];
            const searchNidOrder = nodeListNid.indexOf(protoNode.nid);
            const newNode = protoNode;
            // console.log(this.nodeList[`${searchNidOrder}`]);
            newNode.key = this.nodeList[`${searchNidOrder}`].key;
            // console.log(newNode);
            item.children.push(newNode);
            // arr.push(newNode);
            // }

            // 搜尋跟自己一樣的 KEY
            const searchSameKey = arr.filter(
              (sameKey) =>
                sameKey.key === needReCoverNode[needReCoverNode.length - 1].key
            );
            // console.log("searchSameKey: ", searchSameKey);
            if (searchSameKey.length > 0) {
              const sameChildNid: number = nidArr.indexOf(searchSameKey[0].nid);
              // 排除不是自己樓層的
              const excludeOwnFloor = arr[`${sameChildNid}`].children.filter(
                (ecof) => ecof.inputFloor === searchSameKey[0].inputFloor
              );
              arr[`${sameChildNid}`].children = excludeOwnFloor;
            }
          }
        }

        const isSameNidOrder = setProtoNodes.filter(
          (spNode) => spNode.nid === item.nid
        );

        // 重新賦值
        if (isSameNidOrder.length > 0) {
          const protoNodeData = isSameNidOrder[0];
          // console.log("重新賦值: ", item.key);

          item.parentNid = protoNodeData.parentNid;
          item.children = protoNodeData.children;
          // console.log(item);
          // 搜尋有沒有跟自己一樣的
          // const searchSameKey = arr.filter(
          //   (sameKey) => sameKey.key === item.key
          // );
          // console.log("searchSameKey: ", searchSameKey);
          // if (searchSameKey.length > 0) {
          //   setProtoNodes.push(searchSameKey[0]);
          // }
        }

        ///////////////////////////
        map[item.nid] = item;
        const parent = map[item.parentNid];
        // console.log("parent: ", map[item.nid]);

        // console.log(map);

        if (parent) {
          if (parent.children.length === 0) {
            parent.children.push(item);
          } else if (parent.children.length > 0) {
            // 排除子項目的上層不是自己的
            const stayChid = parent.children.filter(
              (pinfo: nodeItem) => pinfo.parentNid == parent.nid
            );
            parent.children = stayChid;
            // 如果子項目不包含自己就加進去
            const includeNidChild = parent.children.map(
              (fNode: nodeItem) => fNode.nid
            );
            const hasOwnNid = includeNidChild.indexOf(item.nid);
            if (hasOwnNid === -1) {
              parent.children.push(item);
            }
          }
        } else {
          // console.log(item);
          // if (!item.parentNid) {
          // root 層推上去
          result.push(item);
          // }
        }
      });
      // console.log("result: ", result);
      return result;
    },
    arrayToTree(arr: nodeItem[]) {
      // re nid 順序
      // const reOriNidGroup = this.nodeList.map((item) => item.nid);
      // arr.forEach((ori, oriIndex) => {
      //   const order = oriIndex - 1;
      //   if (ori.parentNid) {
      //     ori.parentNid = reOriNidGroup[Number(order)];
      //   }
      // });
      ////////////////////////////////////////////////
      const setRepeatKey: string[] = [];
      const setRepeatNid: string[] = [];
      const setStay = new Set();
      const setStayDetail = new Set();
      /* 過濾重複的 node */
      const repeatRes = arr.filter((item, index, array) => {
        item.frontSame = false;
        item.ellipsis = false;
        if (!setStay.has(item.key)) {
          setStay.add(item.key);
          setStayDetail.add(item);
          const nidRepeatOrder = setRepeatNid.indexOf(item.parentNid);
          // 將被過濾掉的 nid 補給他們的子項目
          if (nidRepeatOrder >= 0) {
            const repeatActInfo = array.filter(
              (info) =>
                info.key === setRepeatKey[Number(nidRepeatOrder)] &&
                info.nid !== item.parentNid
            );
            if (repeatActInfo.length > 0) {
              item.parentNid = repeatActInfo[0].nid;
            }
          }
          return true;
        } else {
          // 記下重複 node 的 nid 和 key
          if (item.key) {
            if (
              setRepeatNid.indexOf(item.parentNid) >= 0 &&
              item.parentNid.length > 0 &&
              item.inputOrder > 0
            ) {
              // 包含以上的條件才要刪除
              setRepeatNid.push(item.nid);
              setRepeatKey.push(item.key);
              item.ellipsis = true;
              return false;
            } else if (item.inputOrder === 0 && !item.parentNid) {
              // 一定要刪除
              setRepeatNid.push(item.nid);
              setRepeatKey.push(item.key);
              item.ellipsis = true;
              return false;
            }
          }
        }
      });
      // console.log("setRepeatNid: ", setRepeatNid);
      // console.log("setRepeatKey: ", setRepeatKey);
      const result = this.buildTreeByNodeList(
        repeatRes,
        setRepeatKey,
        setRepeatNid
      );
      return result;
    },
    initTreeGetters() {
      const tree: any = this.arrayToTree(this.nodeList);
      // const spFloorOneTree = {
      //   nid: "n-123456789",
      //   key: "root",
      //   value: "",
      //   parentNid: "",
      //   inputFloor: 0,
      //   inputOrder: 0,
      //   children: [],
      //   frontSame: false,
      //   ellipsis: false,
      // };
      this.spFloorOneTree.children = [];
      this.spFloorOneTree.children = tree;

      //////////////////
      // re nid 順序
      // const reOriNidGroup = this.nodeList.map((item) => item.nid);
      // this.nodeList.forEach((ori, oriIndex) => {
      //   const order = oriIndex - 1;
      //   if (ori.parentNid) {
      //     ori.parentNid = reOriNidGroup[Number(order)];
      //   }
      // });
      //////////////////
    },
  },
  getters: {
    get_lockBtnState(state) {
      return state.lockBtn;
    },
    get_nodeListObj: (state: any) => {
      state.initTreeGetters();
      return state.spFloorOneTree;
    },
  },
});
