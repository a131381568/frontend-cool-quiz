# Quiz 2 - Nested Key-Value Pair Tree Viewer

Demo 連結: [https://dev.puraliena.com/](https://dev.puraliena.com/)


## 一、問題敘述與解決

### A. 資料結構與維護

此題目的功能為夠無限生長的樹狀結構，一開始做**第一版**的時候，是直接把使用者輸入的文字陣列，轉換成可以給 Vue 渲染的樹結構，但是，這樣子更新和刪除會有問題，沒辦法好好管理。<p>

為了解決當下的資料結構不好維護的問題，查了資料以後做了**第二版**，將資料架構改為[二維陣列](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/tree-architecture.jpg)的父子關係：

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

這樣的資料結構比較好管理，只要依據這兩張表，就能算出想要渲染出來的樹資料，只是還是會遇到問題 **B. 效能瓶頸**。




### B. 效能瓶頸

因為是樹狀無窮層級，所以組件跟部分函式，是採用遞迴的方式去設計，加上使用者在輸入框內任意輸入和更改，會造成 Store 內的 Getters 會一直運算，[遞迴組件](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/tree-architecture.jpg)也一直渲染，儘管經過鎖按鍵、防抖，記憶體還是會被吃光，無法正常運作。<p>

> 以上問題，最後還是決定：__限定範圍__ + **簡化結構**，才有辦法讓系統穩定運作。

#### 1. 限定範圍

**第二版**的作法是藉由使用者隨意輸入字串，再統一將**每行字串**都算過一輪，而且還是經過父子陣列構築，系統運作的不是很穩定。<p>

**第三版**，是藉由縮小、限定輸入字串的範圍，拉出預先運算的空間。
- [環境變數說明](https://github.com/a131381568/frontend-cool-quiz/tree/main/quiz-two#%E4%B8%89%E5%85%B6%E5%AE%83%E8%AA%AA%E6%98%8E)
- [邏輯圖說明](https://###)

#### 2. 簡化結構

**第三版**最後還是放棄採用**二維陣列**，父子結構的管理方式，而是改採取只有**一種**活動陣列、另外**原始**陣列為輔的機制。

- [邏輯圖說明](https://###)


## 二、文件說明

## A. 組件架構圖
...

## B. 邏輯圖
...



## C. 測試案例

#### 1. 畫面分為兩側 - 輸入區 / 預覽區

- 預設為下圖
  ![test-1-1](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test2/test-1-1.jpg)
- 新增資料後
  ![test-1-2](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test2/test-1-2.jpg)


#### 2. 輸入區中，每行的 Key / Value 輸入框內容，可與預覽區相對應

![test-2-1](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test2/test-2-1.jpg)


#### 3. 使用者可自行增減行數。
- 新增行數
  ![test-3-1](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test2/test-3-1.jpg)
- 刪除行數
  ![test-3-2](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test2/test-3-2.jpg)


#### 4. 有無輸入 Key / Value

- 有輸入 Key，未輸入 Value 時，瀏覽區預設為空字串
  ![test-4-1](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test2/test-4-1.jpg)
- 只輸入 Value，但 Key 為空，該行 (Pair) 不會顯示在預覽區
  ![test-4-1](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-two/doc/test2/test-4-2.jpg)


## 三、其它說明

- SCSS 管理 - /src/assets/scss
- 型別管理 - /type/types
- 環境變數說明 ( .env.development / .env.production )：
  - `NODE_ENV` - 運行模式 ( development / production ) 
  - `VITE_APP_BUILD_COUNT` - 每筆字符切割最大數 ( 預設為 **10** )

## 本機運行
確定環境變數正確後。
安裝 NPM 依賴並運行。
```shell
npm install
npm run dev
# 顯示 > Local: http://localhost:3000/
```
