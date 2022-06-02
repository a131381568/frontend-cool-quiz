import axios from "./index";
import {
  // singleUserType,
  ResponseData,
  ResponseUserListType,
} from "@/type/types";

import { AxiosPromise } from "axios";

export const totalUserReq = () => {
  return axios.request({
    // url: "https://randomuser.me/api/?page=3&results=10&seed=abc",
    url: `https://randomuser.me/api/?page=1&results=300&nat=us&inc=name,picture,email,location,cell`,
    method: "GET",
  });
};

export const topoListReq = () => {
  return axios.request({
    url: "https://private-2afaaa-toponet.apiary-mock.com/list",
    method: "GET",
  });
};
