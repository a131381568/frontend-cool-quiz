import { defineStore } from "pinia";
// import { useThrottleFn } from "@vueuse/core";
import {
  nodeItem,
  pairInputType,
  nodeUnitType,
  childrenUnitType,
  nodeUnitValueType,
} from "@/type/types";
import { pushScopeId } from "vue";
const vm = this;
export const useStore = defineStore("main", {
  state: () => ({
    lockBtn: false,
    spFloorOneTree: {
      nid: "root",
      key: "",
      value: "",
      parentNid: "",
      inputFloor: 0,
      inputOrder: 0,
      children: [],
    },
    newSpFloorOneTree: <nodeItem[]>[
      // {
      //   nid: "aaa",
      //   key: "nav",
      //   value: "",
      //   parentNid: "",
      //   inputFloor: 0,
      //   inputOrder: 0,
      //   children: [],
      // },
      // {
      //   nid: "bbb",
      //   key: "header",
      //   value: "",
      //   parentNid: "aaa",
      //   inputFloor: 0,
      //   inputOrder: 1,
      //   children: [],
      // },
      // {
      //   nid: "ccc",
      //   key: "nav",
      //   value: "3D Fabric Creator",
      //   parentNid: "bbb",
      //   inputFloor: 0,
      //   inputOrder: 2,
      //   children: [],
      // },
      // {
      //   nid: "ddd",
      //   key: "common",
      //   value: "Choose Fabric",
      //   parentNid: "",
      //   inputFloor: 1,
      //   inputOrder: 0,
      //   children: [],
      // },
      // {
      //   nid: "eee",
      //   key: "icon",
      //   value: "Hellow",
      //   parentNid: "",
      //   inputFloor: 1,
      //   inputOrder: 0,
      //   children: [],
      // },
    ],
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
      console.log(tree);
      this.spFloorOneTree.children = tree;
    },
    addEnterInputPair() {
      // 新增輸入格
      const addCountGroup = [];
      const addCount = 5;
      for (let index = 0; index < addCount; index++) {
        addCountGroup.push(index + 1);
      }
      addCountGroup.reduce((pre, curr, index, array) => {
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
        });
        // 父層
        // const group: any = this.parentGroup;
        // group[`${nid}`] = [];
        // if (pre) {
        //   group[`${pre}`].push(nid);
        // }
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
  },
  getters: {
    get_lockBtnState(state) {
      return state.lockBtn;
    },
    get_newSpFloorOneTreeObj: (state) => {
      const arrayToTree = (arr: nodeItem[]) => {
        const result: any = [];
        if (!Array.isArray(arr) || arr.length === 0) {
          return result;
        }
        const map: any = {};
        arr.forEach((item) => {
          map[item.nid] = item;
          const parent = map[item.parentNid];
          // console.log(map);
          // parent
          if (parent) {
            // console.log(parent.children);
            if (parent.children.length === 0) {
              parent.children.push(item);
            }
            // else if (parent.children.indexOf(item.nid) === -1) {
            //   parent.children.push(item);
            // }

            // (parent.children || (parent.children = [])).push(item);
            // console.log("下");
          } else {
            // console.log("上");
            result.push(item);
          }
        });
        return result;
      };
      const tree = arrayToTree(state.newSpFloorOneTree);
      const spFloorOneTree = {
        nid: "root",
        key: "",
        value: "",
        parentNid: "",
        inputFloor: 0,
        inputOrder: 0,
        children: [],
      };
      spFloorOneTree.children = tree;
      return spFloorOneTree;
    },
  },
});
