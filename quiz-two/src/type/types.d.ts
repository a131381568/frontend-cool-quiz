export type treeDataType = {
  id: string;
  text: string;
  children?: Array<treeDataType>;
};

export type pairInputType = {
  pairKey: string;
  pairVal: string;
};

export type nodeUnitValueType = {
  nid: string;
  id: string;
  parentId: string;
  text: string;
  children: any[];
};

export type nodeUnitType = {
  [key: string]: nodeUnitValueType;
};

export type childrenUnitType = {
  [key: string]: string[];
};

export type nodeItem = {
  nid: string;
  key: string;
  value: string;
  parentNid: string;
  inputFloor: number;
  inputOrder: number;
  children: any[];
};
