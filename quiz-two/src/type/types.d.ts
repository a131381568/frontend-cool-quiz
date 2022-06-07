export type treeDataType = {
  id: string;
  text: string;
  children?: Array<treeDataType>;
};

export type pairInputType = {
  pairKey: string;
  pairVal: string;
};

export type nodeUnitType = {
  [key: string]: {
    nid: string;
    id: string;
    parentId: string;
    text: string;
    children: any[];
  };
};

export type childrenUnitType = {
  [key: string]: string[];
};
