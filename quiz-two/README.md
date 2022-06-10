# Quiz 2 - Nested Key-Value Pair Tree Viewer

Demo 連結: [https://dev.puraliena.com/](https://dev.puraliena.com/)


## 一、問題敘述與解決

### A. 資料結構 CRCD 問題

此題目的功能為夠無限生長的樹狀結構，所以一開始做的時候，是直接把使用者輸入的文字陣列，轉換成可以給 Vue 渲染的樹結構，但是，這樣子更新和刪除會有問題，沒辦法好好管理，所以做了第一版，發現了當下的資料結構不好維護這個問題。<p>
> 查了資料以後，將資料架構改為**二維陣列**的父子關係：

- **子層物件** - 子層則只需要管好自己的值
  ``` javascript 
  const nodes = {
    node001:{
      nid: "node001";
      id: "common";
      parentId: "node005";
      text: "Lorem ipsum";
      children: []
    }
    // node002 ...
  }
  ```

- **父層陣列** - 父層只要知道小孩
  ``` javascript 
  const childrenOf = {
    node001:[],
    node002:[],
    node003:[],
    node004:[],
    node005: ["node001","node002","node003","node004"]
    // node006 ... 
  }
  ```

  > 這樣的資料結構比較好管理，只要依據這兩張表，就能算出想要渲染出來的樹資料，詳情可查看下方[邏輯圖](https://github.com/a131381568/frontend-cool-quiz/tree/main/quiz-two#b-%E9%82%8F%E8%BC%AF%E5%9C%96)，但是中間的新增、更新、刪除、重複的判斷，就需要花時間去解決了。


### B. 效能瓶頸

因為是樹狀無窮層級，所以組件跟部分函式，是採用遞迴的方式去設計，加上使用者在輸入框內任意輸入和更改，會造成 Store 內的 Getters 會一直運算，遞迴組件也一直渲染，記憶體會被吃光，無法正常運作。

> 尚未完全解決，目前是針對**新增**跟**刪除**有鎖按鍵時間，還有輸入框加上**防抖**的功能，但是有時候還是會發生，記憶體全部被吃光，瀏覽器無法繼續運作的情況。

因為使用者可以任意操作，造成目前的系統無法負荷，所以針對範例網站有的基本功能，在下方文件說明有列出幾個[測試案例](https://github.com/a131381568/frontend-cool-quiz/tree/main/quiz-two#c-%E6%B8%AC%E8%A9%A6%E6%A1%88%E4%BE%8B)，能夠正常運作。



## 二、文件說明

## A. 組件架構圖
![tree-architecture](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/tree-architecture.jpg)

## B. 邏輯圖
![tree-architecture](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/tree-logic.jpg)



## C. 測試案例

#### 1. 節點中輸入文字，子區塊的內容會消失
![test-1-1](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test-1-1.jpg)
![test-1-2](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test-1-2.jpg)

#### 2. 後面輸入的文字，會把前面的給蓋掉
![test-2-1](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test-2-1.jpg)
![test-2-2](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test-2-2.jpg)

#### 3. 節點可開合子區塊
![test-3-1](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test-3-1.jpg)
![test-3-2](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test-3-2.jpg)
![test-3-3](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test-3-3.jpg)

#### 4. 新增輸入相關
- 可新增輸入框
![test-4-1](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test-4-1.jpg)
- 只輸入 VAL 並不會新增
![test-4-2](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test-4-2.jpg)
- 只輸入 KEY 會新增節點
![test-4-3](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test-4-3.jpg)
- 可刪除
![test-4-3](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test-4-3.jpg)

## 三、其它說明

- SCSS 管理 - /src/assets/scss
- 型別管理 - /type/types


## 本機運行
安裝 NPM 依賴並運行。
```shell
npm install
npm run dev
# 顯示 > Local: http://localhost:3000/
```
