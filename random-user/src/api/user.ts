import axios from "./index";
export const totalUserReq = () => {
  return axios.request({
    url: `/api?page=1&results=3010&nat=us&inc=name,picture,email,location,cell`,
    method: "GET",
  });
};
