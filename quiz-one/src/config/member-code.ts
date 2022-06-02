import { loginMemberArryResType, loginMemberSingleResType } from "@/type/types";

const registerMemberList = [
  {
    code: 1,
    msg: "註冊成功",
  },
  {
    code: -1,
    msg: "信箱重複",
  },
  {
    code: -2,
    msg: "不明原因錯誤",
  },
];

const loginMemberList = [
  {
    code: 1,
    msg: "登入成功",
  },
  {
    code: -1,
    msg: "無此帳號",
  },
  {
    code: -2,
    msg: "密碼錯誤",
  },
  {
    code: -3,
    msg: "不明原因錯誤",
  },
];

const transformMemberMsgFunction = (actionName: string, code: number) => {
  let array: loginMemberSingleResType[] = [];
  if (actionName === "registerMember") {
    array = registerMemberList;
  }
  if (actionName === "loginMember") {
    array = loginMemberList;
  }
  let res: loginMemberSingleResType[] = [];
  res = array.filter((item) => item.code === code);
  if (res.length > 0) {
    return res[0].msg;
  } else {
    return String("系統錯誤");
  }
};

export default {
  registerMember: registerMemberList,
  loginMember: loginMemberList,
  // transformMemberMsg: (array: loginMemberSingleResType[], code: number) => {
  //   let res: loginMemberSingleResType[] = [];
  //   res = array.filter((item) => item.code === code);
  //   return res[0];
  // },
  transformMemberMsg: transformMemberMsgFunction,
};
