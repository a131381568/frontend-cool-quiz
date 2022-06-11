import { defineStore } from "pinia";
// import { useThrottleFn } from "@vueuse/core";
import {
  nodeItem,
  pairInputType,
  nodeUnitType,
  childrenUnitType,
  nodeUnitValueType,
} from "@/type/types";
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
    parentGroup: {
      aaa: ["bbb"],
      bbb: ["ccc"],
      ccc: [],
      ddd: [],
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
    newEnterInput: <pairInputType[]>[
      // {
      //   pairKey: "nav.header.creator",
      //   pairVal: "3D Fabric Creator",
      // },
      // {
      //   pairKey: "common",
      //   pairVal: "Choose Fabric",
      // },
      {
        pairKey: "",
        pairVal: "",
      },
    ],
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
