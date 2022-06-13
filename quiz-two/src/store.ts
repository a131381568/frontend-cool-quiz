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
    newSpFloorOneTree: <nodeItem[]>[],
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
    buildFloorOneTree(arr: nodeItem[]) {
      const arrayToTree = (arr: nodeItem[]) => {
        const result: any = [];
        if (!Array.isArray(arr) || arr.length === 0) {
          return result;
        }
        const map: any = {};
        arr.forEach((item) => (map[item.nid] = item));
        arr.forEach((item) => {
          const parent = map[item.parentNid];
          if (parent) {
            (parent.children || (parent.children = [])).push(item);
          } else {
            result.push(item);
          }
        });
        return result;
      };
      const tree = arrayToTree(this.newSpFloorOneTree);
      // console.log(tree);
      this.spFloorOneTree.children = tree;
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
        this.newSpFloorOneTree.push({
          nid: nid,
          key: "",
          value: "",
          parentNid: pre,
          inputFloor: this.enterInputGroup.length, // this.inputFloor,
          inputOrder: index,
          children: [],
          frontSame: false,
          ellipsis: false,
        });
        return nid;
      }, "");
      // 新增輸入框
      this.enterInputGroup.push({
        pairKey: "",
        pairVal: "",
      });
    },
    delOwnPair(order: number, array: number[]) {
      const stayList: nodeItem[] = [];
      this.newSpFloorOneTree.forEach((node, index) => {
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
      this.newSpFloorOneTree = stayList;
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
        this.newSpFloorOneTree.push({
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
      // 新增輸入框
      this.enterInputGroup.push({
        pairKey: pairKey,
        pairVal: pairVal,
      });
    },
    arrayToTree(arr: nodeItem[]) {
      // re nid 順序
      const reOriNidGroup = this.newSpFloorOneTree.map((item) => item.nid);
      arr.forEach((ori, oriIndex) => {
        const order = oriIndex - 1;
        if (ori.parentNid) {
          ori.parentNid = reOriNidGroup[Number(order)];
        }
      });
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
              item.frontSame = true;
            }
          } else {
            item.frontSame = false;
          }
          return true;
        } else {
          // 記下重複 node 的 nid 和 key
          if (item.key) {
            setRepeatNid.push(item.nid);
            setRepeatKey.push(item.key);
            item.ellipsis = true;
          }
          return false;
        }
      });
      console.log("setRepeatNid: ", setRepeatNid);
      console.log("setRepeatKey: ", setRepeatKey);
      //
      const result: any = [];
      if (!Array.isArray(repeatRes) || repeatRes.length === 0) {
        return result;
      }
      const map: any = {};
      repeatRes.forEach((item, index, array) => {
        map[item.nid] = item;
        const parent = map[item.parentNid];
        // parent
        if (parent) {
          if (parent.children.length === 0) {
            parent.children.push(item);
          } else if (parent.children.length > 0) {
            const includeNidChild = parent.children.map(
              (fNode: nodeItem) => fNode.nid
            );
            const hasOwnNid = includeNidChild.indexOf(item.nid);
            if (hasOwnNid === -1) {
              parent.children.push(item);
            } else {
              const stayChid = parent.children.filter(
                (item: nodeItem) => item.parentNid == parent.nid
              );
              parent.children = stayChid;
            }
          }
        } else {
          result.push(item);
        }
      });
      return result;
    },
    initTreeGetters() {
      const tree = this.arrayToTree(this.newSpFloorOneTree);
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
      // const reOriNidGroup = this.newSpFloorOneTree.map((item) => item.nid);
      // this.newSpFloorOneTree.forEach((ori, oriIndex) => {
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
    get_newSpFloorOneTreeObj: (state: any) => {
      state.initTreeGetters();
      return state.spFloorOneTree;
    },
  },
});
