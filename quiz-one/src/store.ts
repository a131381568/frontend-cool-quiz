import { totalUserReq } from "@/api/user";
import {
  singleUserType,
  ResponseUserListType,
  userListType,
  pageReqInfoType,
  singleMemberInfo,
  singleUser,
} from "@/type/types";
import { defineStore } from "pinia";
import { db } from "@/utils/firebase";
import {
  addDoc,
  getFirestore,
  getDocs,
  runTransaction,
  updateDoc,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import bcrypt from "bcryptjs";
import codeStateMaster from "@/config/member-code";
import router from "./router";

const memberCollection = String(import.meta.env.VITE_APP_FIREBASE_COLLECTION);
const saltRounds = Number(import.meta.env.VITE_APP_SALTROUNDS);

export const useStore = defineStore("main", {
  state: () => ({
    initTime: 0,
    connectionsCount: 30,
    connectionsPage: 1,
    connectionsLength: 0,
    connectionsList: <singleUserType[]>[],
    oriConnectionsList: <singleUserType[]>[],
    oriConnectionsLength: 0,
    connectionsMode: "card",
    lightBoxState: false,
    actionUserInfo: <singleUser>{
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
    alertBoxState: false,
    alertBoxMsg: "",
    loadingState: false,
    userSelfName: "",
    userSelfMail: "",
  }),
  actions: {
    changeConnectionsMode(mode: string) {
      this.connectionsMode = mode;
      // 儲存資料
      this.saveStoreDataInCache();
    },
    showLightBox(mail: string) {
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
      // console.log(userData);
      if (userData.results) {
        userListRes = userData.results;
        userListRes.forEach((item) => item.collect === false);
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
      // 儲存資料
      this.saveStoreDataInCache();
    },
    collectUserActionPush(userData: singleUserType) {
      const oriList: singleUserType[] = this.connectionsList;
      oriList.forEach((item) => {
        if (item.email === userData.email) {
          item.collect = true;
        }
      });
      this.isCollectUserList.push(userData);
      // 更新至資料庫
      this.updateFireBaseMemberFacorite(this.isCollectUserList);
      // 儲存資料
      this.saveStoreDataInCache();
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
      // 更新至資料庫
      this.updateFireBaseMemberFacorite(newCollectUserList);
      // 儲存資料
      this.saveStoreDataInCache();
    },
    // 顯示已收藏 Grid
    showCollectList() {
      // console.log("顯示已收藏 Grid");
      // 依情境選擇 oriList 的資料
      // 如果是正常操作
      this.oriConnectionsList = JSON.parse(
        JSON.stringify(this.connectionsList)
      );
      this.oriConnectionsLength = this.connectionsLength;
      this.connectionsList = JSON.parse(JSON.stringify(this.isCollectUserList));
      this.connectionsLength = this.isCollectUserList.length;
      this.connectionsCount = 30;
      this.connectionsPage = 1;
      // 儲存資料
      // this.saveStoreDataInCache();
    },
    // 顯示全部 Grid
    showConnectionsList() {
      // console.log("顯示全部 Grid");
      const oriData = JSON.parse(JSON.stringify(this.oriConnectionsList));
      this.connectionsList = oriData;
      this.connectionsLength = this.oriConnectionsLength;
      this.connectionsCount = 30;
      this.connectionsPage = 1;
    },
    async downloadMemberList() {
      const memberCol = collection(db, memberCollection);
      const memberSnapshot = await getDocs(memberCol);
      const memberList = memberSnapshot.docs.map((doc) => doc.data());
      return memberList;
    },
    async registerMember(name: string, email: string, password: string) {
      // 先檢查信箱有沒有重複
      const memberList = await this.downloadMemberList();
      const isRepeat = await memberList.some((item) => item.mail === email);
      let resCode = 0;
      if (isRepeat) {
        resCode = -1;
      } else {
        // 先加密
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // 再進行註冊
        const memberRef = await collection(db, memberCollection);
        await setDoc(doc(memberRef, email), {
          name: name,
          mail: email,
          password: hashedPassword,
          facorite: [],
        });
        // 檢索新增
        const docRef = await doc(db, memberCollection, email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // 註冊成功
          resCode = 1;
          console.log("Document data:", docSnap.data());
        } else {
          // 不明原因錯誤
          resCode = -2;
          console.log("No such document!");
        }
        // const docRef = await addDoc(collection(db, memberCollection), {
        //   name: name,
        //   mail: email,
        //   password: hashedPassword,
        //   facorite: [],
        // });
        // if (docRef.id) {
        //   resCode = 1;
        // } else {
        //   resCode = -2;
        // }
      }
      const resMsg = await codeStateMaster.transformMemberMsg(
        "registerMember",
        resCode
      );
      return {
        code: resCode,
        msg: resMsg,
      };
    },
    async loginMember(email: string, password: string) {
      let resCode = 0;
      // 先檢查信箱是否有這個人
      const memberList = await this.downloadMemberList();
      // let hasMember: singleMemberInfo[] = [];
      const hasMember = await memberList.filter((item) => item.mail === email);
      if (hasMember.length > 0) {
        // 檢查密碼
        const passwordIsTrue = await bcrypt.compare(
          password,
          hasMember[0].password
        );
        if (!passwordIsTrue) {
          // 密碼錯誤
          resCode = -2;
        } else {
          // 登入成功
          resCode = 1;
          // 載入個人資料
          this.userSelfName = hasMember[0].name;
          this.userSelfMail = hasMember[0].mail;
          this.isCollectUserList = hasMember[0].facorite;
          // 載初次的全部資料
          if (this.get_connectionsList.length === 0) {
            await this.downLoadTotalUserList();
          }
          // 儲存資料
          await this.saveStoreDataInCache();
        }
      } else if (hasMember.length === 0) {
        // 無此帳號
        resCode = -1;
      } else {
        // 不明原因錯誤
        resCode = -3;
      }
      const resMsg = await codeStateMaster.transformMemberMsg(
        "loginMember",
        resCode
      );
      return {
        code: resCode,
        msg: resMsg,
      };
    },
    showAlertBox(msg: string) {
      this.alertBoxMsg = msg;
      this.alertBoxState = true;
    },
    hideAlertBox() {
      this.loadingStateHide();
      this.alertBoxMsg = "";
      this.alertBoxState = false;
    },
    loadingStateShow() {
      this.loadingState = true;
    },
    loadingStateHide() {
      this.loadingState = false;
    },
    setUserSelfInfo(name: string) {
      this.userSelfName = name;
    },
    async updateFireBaseMemberFacorite(newFacoriteArray: singleUser[]) {
      const washingtonRef = doc(db, memberCollection, this.get_userSelfMail);
      await updateDoc(washingtonRef, {
        facorite: newFacoriteArray,
      });
    },
    // 儲存資料
    saveStoreDataInCache() {
      const initTime: number = this.initTime;
      const connectionsCount: number = this.connectionsCount;
      const connectionsPage: number = this.connectionsPage;
      const connectionsLength: number = this.connectionsLength;
      const connectionsList: singleUserType[] = this.connectionsList;
      // 要依據情境存?
      const oriConnectionsList: singleUserType[] = this.oriConnectionsList;
      const oriConnectionsLength: number = this.oriConnectionsLength;
      const connectionsMode: string = this.connectionsMode;
      const lightBoxState: boolean = this.lightBoxState;
      const actionUserInfo: singleUser = this.actionUserInfo;
      const isCollectUserList: singleUserType[] = this.isCollectUserList;
      const alertBoxState: boolean = this.alertBoxState;
      const alertBoxMsg: string = this.alertBoxMsg;
      const loadingState: boolean = this.loadingState;
      const userSelfName: string = this.userSelfName;
      const userSelfMail: string = this.userSelfMail;

      const fccoCache = {
        connectionsCount,
        connectionsPage,
        connectionsLength,
        connectionsList,
        oriConnectionsList,
        oriConnectionsLength,
        connectionsMode,
        lightBoxState,
        actionUserInfo,
        isCollectUserList,
        alertBoxState,
        alertBoxMsg,
        loadingState,
        userSelfName,
        userSelfMail,
      };
      const storeCacheStr = localStorage.getItem("fcco-cache");
      if (storeCacheStr) {
        const storeCacheObj = JSON.parse(storeCacheStr);
        const localInitTime = storeCacheObj.initTime;
        // 存以前先比對 localInitTime 的 initTime
        if (localInitTime > initTime) {
          // 不儲存，跳出警示燈箱後初始化。
          this.showAlertBox(
            "不同頁籤的時差行為，導致儲存資料不同步，請關閉其它頁面後繼續作業。"
          );
          this.initStoreDataByCache();
        } else {
          // 確定是最新開的視窗就儲存
          localStorage.setItem("fcco-cache", JSON.stringify(fccoCache));
        }
      }
      console.log("已儲存資料至瀏覽器");
    },
    initStoreDataByCache() {
      this.initTime = new Date().getTime();
      // console.log("initStoreDataByCache: ", this.initTime);
      const storeCacheStr = localStorage.getItem("fcco-cache");
      if (storeCacheStr) {
        const storeCacheObj = JSON.parse(storeCacheStr);
        this.connectionsCount = storeCacheObj.connectionsCount;
        this.connectionsPage = storeCacheObj.connectionsPage;
        this.connectionsLength = storeCacheObj.connectionsLength;
        this.connectionsList = storeCacheObj.connectionsList;
        // 依據情境取代?
        this.oriConnectionsList = storeCacheObj.oriConnectionsList;
        this.oriConnectionsLength = storeCacheObj.oriConnectionsLength;
        this.connectionsMode = storeCacheObj.connectionsMode;
        // this.lightBoxState = storeCacheObj.lightBoxState;
        this.actionUserInfo = storeCacheObj.actionUserInfo;
        this.isCollectUserList = storeCacheObj.isCollectUserList;
        // this.alertBoxState = storeCacheObj.alertBoxState;
        // this.alertBoxMsg = storeCacheObj.alertBoxMsg;
        // this.loadingState = storeCacheObj.loadingState;
        this.userSelfName = storeCacheObj.userSelfName;
        this.userSelfMail = storeCacheObj.userSelfMail;
      } else {
        // 如果 cache 為空就設置預設值
        const defaultStoreCacheStr = {
          initTime: this.initTime,
          connectionsCount: 30,
          connectionsPage: 1,
          connectionsLength: 0,
          connectionsList: [],
          oriConnectionsList: [],
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
          isCollectUserList: [],
          alertBoxState: false,
          alertBoxMsg: "",
          loadingState: false,
          userSelfName: "",
          userSelfMail: "",
        };
        localStorage.setItem(
          "fcco-cache",
          JSON.stringify(defaultStoreCacheStr)
        );
      }
    },
    logOut() {
      localStorage.removeItem("fcco-cache");
      this.connectionsCount = 30;
      this.connectionsPage = 1;
      this.connectionsLength = 0;
      this.connectionsList = [];
      this.oriConnectionsList = [];
      this.oriConnectionsLength = 0;
      this.connectionsMode = "card";
      this.isCollectUserList = [];
      this.userSelfName = "";
      this.userSelfMail = "";
      router.push("/login");
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
      const actionPai = state.connectionsPage;
      const totalLength = state.connectionsLength;
      const viewCount = state.connectionsCount;
      const calTotalPagi = Math.ceil(totalLength / viewCount);
      // console.log(`
      // actionPai:      ${actionPai}
      // calTotalPagi:   ${calTotalPagi}
      // `);
      if (actionPai <= 3) {
        // 前 3 頁
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
        // 結尾 3 頁
        const lastArray = [
          calTotalPagi - 4,
          calTotalPagi - 3,
          calTotalPagi - 2,
          calTotalPagi - 1,
          calTotalPagi,
        ];
        const newLastArray = lastArray.filter((item) => item > 0);
        return newLastArray;
      } else {
        // 前後兩頁都有的情況
        const calcArray = [
          actionPai - 2,
          actionPai - 1,
          actionPai,
          actionPai + 1,
          actionPai + 2,
        ];
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
    get_alertBoxState: (state) => {
      return state.alertBoxState;
    },
    get_alertBoxMsg: (state) => {
      return state.alertBoxMsg;
    },
    get_userSelfName: (state) => {
      return state.userSelfName;
    },
    get_userSelfMail: (state) => {
      return state.userSelfMail;
    },
  },
});
