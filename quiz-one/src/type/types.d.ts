type singleUser = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
  collect: boolean;
};

type pageReqInfo = {
  page: number;
  results: number;
  seed: string;
  version: string;
};

export type singleUserType = singleUser;

export type pageReqInfoType = pageReqInfo;

export type userListType = {
  info?: pageReqInfo;
  results?: singleUserType[];
};

export interface ResponseUserListType {
  info?: pageReqInfo;
  results?: singleUserType[];
}

export interface ResponseData {
  code: number;
  data?: any;
  msg: string;
}
