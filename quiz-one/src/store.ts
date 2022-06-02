import { totalUserReq, topoListReq } from "@/api/user";
import {
  singleUserType,
  ResponseUserListType,
  userListType,
  pageReqInfoType,
} from "@/type/types";
import { defineStore } from "pinia";
import { db } from "@/utils/firebase";
import { addDoc, getFirestore, collection, getDocs } from "firebase/firestore";
const memberCollection = String(import.meta.env.VITE_APP_FIREBASE_COLLECTION);
// import bcrypt from "bcrypt";

export const useStore = defineStore("main", {
  state: () => ({
    debug: import.meta.env.MODE === "development",
    connectionsCount: 30,
    connectionsPage: 1,
    connectionsLength: 0,
    connectionsList: <singleUserType[]>[],
    oriConnectionsList: <singleUserType[]>[],
    oriConnectionsLength: 0,
    connectionsMode: "card",
    lightBoxState: false,
    actionUserInfo: {
      gender: "",
      name: {
        title: "",
        first: "",
        last: "",
      },
      location: {
        street: {
          number: 0,
          name: "",
        },
        city: "",
        state: "",
        country: "",
        postcode: 0,
        coordinates: {
          latitude: "",
          longitude: "",
        },
        timezone: {
          offset: "",
          description: "",
        },
      },
      email: "",
      login: {
        uuid: "",
        username: "",
        password: "",
        salt: "",
        md5: "",
        sha1: "",
        sha256: "",
      },
      dob: {
        date: "",
        age: 0,
      },
      registered: {
        date: "",
        age: 0,
      },
      phone: "",
      cell: "",
      id: {
        name: "",
        value: null,
      },
      picture: {
        large: "",
        medium: "",
        thumbnail: "",
      },
      nat: "",
    },
    isCollectUserList: <singleUserType[]>[],
  }),
  actions: {
    changeConnectionsMode(mode: string) {
      this.connectionsMode = mode;
    },
    showLightBox(mail: string) {
      console.log("lightBoxState-show!!!");
      const array: singleUserType[] = this.connectionsList;
      const filterItem = array.filter((item) => item.email === mail);
      if (filterItem.length > 0) {
        this.actionUserInfo = filterItem[0];
      }
      this.lightBoxState = true;
    },
    hideLightBox() {
      this.lightBoxState = false;
    },
    async downLoadTotalUserList() {
      db;
      let userListRes: singleUserType[] = [];
      let pageReqInfo: pageReqInfoType = {
        page: 0,
        results: 0,
        seed: "",
        version: "",
      };
      const userData: any = await totalUserReq();
      console.log(userData);
      if (userData.results) {
        userListRes = userData.results;
        userListRes.forEach((item) => {
          item.collect = false;
        });
        this.connectionsList = userListRes;
      }
      if (userData.info) {
        pageReqInfo = userData.info;
        // this.connectionsPage = pageReqInfo.page;
        this.connectionsLength = pageReqInfo.results;
      }
    },
    changePage(pagi: number) {
      this.connectionsPage = pagi;
    },
    collectUserActionPush(userData: singleUserType) {
      const oriList: singleUserType[] = this.connectionsList;
      oriList.forEach((item) => {
        if (item.email === userData.email) {
          item.collect = true;
        }
      });
      this.isCollectUserList.push(userData);
    },
    collectUserActionPull(email: string) {
      const oriList: singleUserType[] = this.connectionsList;
      oriList.forEach((item) => {
        if (item.email === email) {
          item.collect = false;
        }
      });
      // 備份清單
      const backCollectUserList: singleUserType[] = this.oriConnectionsList;
      backCollectUserList.forEach((item) => {
        if (item.email === email) {
          item.collect = false;
        }
      });
      // 收藏清單
      const oriCollectUserList: singleUserType[] = this.isCollectUserList;
      const newCollectUserList = oriCollectUserList.filter(
        (item) => item.email !== email
      );
      this.isCollectUserList = newCollectUserList;
    },
    showCollectList() {
      console.log("oriL ", this.connectionsList);
      this.oriConnectionsList = JSON.parse(
        JSON.stringify(this.connectionsList)
      );
      this.oriConnectionsLength = this.connectionsLength;
      // this.connectionsLength = 0;
      // this.connectionsCount = 0;
      // this.connectionsPage = 0;
      this.connectionsList = JSON.parse(JSON.stringify(this.isCollectUserList));
      this.connectionsLength = this.isCollectUserList.length;
      this.connectionsCount = 30;
      this.connectionsPage = 1;
    },
    showConnectionsList() {
      const oriData = JSON.parse(JSON.stringify(this.oriConnectionsList));
      this.connectionsList = oriData;
      this.connectionsLength = this.oriConnectionsLength;
      this.connectionsCount = 30;
      this.connectionsPage = 1;
    },
    async downloadMemberList() {
      const citiesCol = collection(db, memberCollection);
      const citySnapshot = await getDocs(citiesCol);
      const cityList = citySnapshot.docs.map((doc) => doc.data());
      console.log(cityList);
      return cityList;
    },
    async registerMember(name: string, email: string, password: string) {
      try {
        // const hash = (text: string) => bcrypt.hash(text, 2);
        // const hashedPassword = await hash(password);
        const docRef = await addDoc(collection(db, memberCollection), {
          name: name,
          mail: email,
          password: password,
        });
        console.log("已存入此id", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    loginMember(email: string, password: string) {
      console.log(email, password);
    },
  },
  getters: {
    get_connectionsList: (state) => {
      return state.connectionsList;
    },
    get_connectionsMode: (state) => {
      return state.connectionsMode;
    },
    get_actionUserInfo: (state) => {
      return state.actionUserInfo;
    },
    get_lightBoxState: (state) => {
      return state.lightBoxState;
    },
    get_connectionsPage: (state) => {
      return state.connectionsPage;
    },
    get_connectionsLength: (state) => {
      return state.connectionsLength;
    },
    getTotalPagi: (state) => {
      const totalLength = state.connectionsLength;
      const viewCount = state.connectionsCount;
      const calTotalPagi = Math.ceil(totalLength / viewCount);
      return calTotalPagi;
    },
    get_calTotalPagi: (state) => {
      // this.connectionsPage 現在在第幾頁
      const actionPai = state.connectionsPage;
      const totalLength = state.connectionsLength;
      const viewCount = state.connectionsCount;
      const calTotalPagi = Math.ceil(totalLength / viewCount);
      console.log(`
      actionPai:      ${actionPai}
      calTotalPagi:   ${calTotalPagi}
      `);
      // && calTotalPagi <= 5
      if (actionPai <= 3) {
        // 前 3 頁
        console.log("first!!");
        if (calTotalPagi >= 5) {
          return 5;
        } else {
          return calTotalPagi;
        }
      } else if (
        actionPai === calTotalPagi ||
        1 + actionPai === calTotalPagi ||
        2 + actionPai === calTotalPagi
      ) {
        console.log("last3");
        // 結尾 3 頁
        // if (actionPai === 4 && calTotalPagi >= 6) {
        //   return [2, 3, 4, 5, 6];
        // } else {
        const lastArray = [
          calTotalPagi - 4,
          calTotalPagi - 3,
          calTotalPagi - 2,
          calTotalPagi - 1,
          calTotalPagi,
        ];
        const newLastArray = lastArray.filter((item) => item > 0);
        return newLastArray;
        // }
      } else {
        // 前後兩頁都有的情況
        const calcArray = [
          actionPai - 2,
          actionPai - 1,
          actionPai,
          actionPai + 1,
          actionPai + 2,
        ];
        console.log(calcArray);
        return calcArray;
      }
    },
    get_calculateConnectionsList: (state) => {
      const actionCount = state.connectionsCount;
      const actionPagi = state.connectionsPage;
      const totalList: singleUserType[] = state.connectionsList;
      const calcList = totalList.filter((item, key) => {
        if (
          1 + key <= actionCount * actionPagi &&
          1 + key > actionCount * (actionPagi - 1)
        ) {
          return item;
        }
      });
      return calcList;
    },
  },
});
