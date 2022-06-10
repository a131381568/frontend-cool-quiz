# Quiz 1 - Random User

Demo 連結: [https://project.puraliena.com/](https://project.puraliena.com/)


---


## 一、問題敘述與解決


### A. 環境
  - Pug - 第一次使用 pug 整合在開發環境，所以遇到很多問題，像是 tailwind 的標籤，`w-1/2` 沒辦法直接在`template`使用，要自己另外註冊成其它標籤，才能夠使用，還有如何將 Vue 的版型語法應用在 Pug .....等。
  - Firebase - 目前的版本為`web-version-9`，和以前版本使用的函式不太一樣，引入的函式也不同，用以前的方式製作會出問題。
> 都是多花時間，查資料嘗試，像是 Firebase 只能看著官方文件去慢慢測試。

### B. 技術
  - **分頁設計** - 因為資料量很大，必須設計完善的分頁機制，由於全部的資料都存在前端，都需要由前端計算，計算參數和資料的總數、顯示數量有關，需要讓分頁模組依據`不同的總數`跟`顯示數量`變化。<p>
    > Store 設置**假資料**模擬不同情境，做**小型測試**，這裡是設計成僅顯示 5 頁主要是前 3 頁和結尾 3 頁的邏輯需要多加嘗試。
  - **組件共用** - `首頁全部資料`和`已收藏資料`要共用組件，導致不同情境時，會吃到彼此的資料。<p>
    > 釐清彼此的耦合關係，就能夠比較清楚的撰寫邏輯，下方文件說明有[組件路由架構圖](https://github.com/a131381568/frontend-cool-quiz/tree/main/quiz-one#1-%E7%B5%84%E4%BB%B6%E8%B7%AF%E7%94%B1%E6%9E%B6%E6%A7%8B%E5%9C%96)和[邏輯說明圖](https://github.com/a131381568/frontend-cool-quiz/tree/main/quiz-one#2-%E9%82%8F%E8%BC%AF%E8%AA%AA%E6%98%8E%E5%9C%96)。
  - **使用者情境** - 因為要重新整理、關掉後再打開資料還是存在，所以會延伸很多情境，導致資料有問題。<p>
    > 將情境全部列出來，才有辦法確保前面製作好的功能沒問題，下方文件說明有全部的[功能測試案例](https://github.com/a131381568/frontend-cool-quiz/tree/main/quiz-one#b-%E5%8A%9F%E8%83%BD%E6%B8%AC%E8%A9%A6%E6%A1%88%E4%BE%8B)。


---



## 二、文件說明


### A. 圖表說明

#### 1. 組件路由架構圖
![architecture](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-one/doc/architecture.jpg)

#### 2. 邏輯說明圖
![logic](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-one/doc/logic-2.jpg)

#### 3. Firebase 集合
![firebasedata](https://raw.githubusercontent.com/a131381568/frontend-cool-quiz/main/quiz-one/doc/firebasedata.gif)


### B. 功能測試案例

#### 1. 註冊
1. 進入登入頁面
2. 點選註冊按鈕
3. 輸入姓名、信箱、密碼
4. 顯示註冊成功
> *如果信箱重複則會回傳"__信箱重複__"。

#### 2. 登入
1. 進入登入頁面
2. 輸入信箱、密碼
3. 顯示登入成功，並點選確定
4. 跳轉至 /connections (首頁)
> *如果用非會員信箱登入則會回傳"**無此帳號**"；如果用信箱正確、密碼錯誤登入則會回傳"__密碼錯誤__"。

#### 3. 加入收藏 + 查看收藏
1. 登入狀態下，至 /connections
2. 點選 grid 右下角空心的愛心
3. 成功的話就會變成實心愛心
4. 再點選上方的已收藏
5. 就會看到剛剛已收藏的 grid 了

#### 4. 取消收藏
1. 登入狀態下至 /connections 或 /facorite
2. 點選 grid 右下角實心的愛心
3. 成功的話就會變成空心愛心

#### 5. 顯示 Grid 詳細資料燈箱
1. 登入狀態下至 /connections 或 /facorite
2. 點選 grid 的圖片
3. 就會顯示詳細資料燈箱
> *點擊"**右上角的 X**"或"__點擊燈箱外__"的任意處皆可關閉此燈箱。

#### 6. 全部資料(顯示列表)
1. 登入狀態下至 /connections
2. 點選右上角的三條線的 Icon
3. 就能夠顯示列表模式

#### 7. 全部資料(切換分頁)
1. 登入狀態下至 /connections
2. 點選下方的分頁，即可切換分頁。

#### 8. 全部資料(切換單頁顯示數目)
1. 登入狀態下至 /connections
2. 點選右上角 30v 的選單，選擇想要顯示的數量
3. 即可切換顯示數量

#### 9. 查看收藏(顯示列表)
1. 登入狀態下至 /facorite
2. 點選右上角的三條線的 Icon
3. 就能夠顯示目前資料的列表模式。

#### 10. 查看收藏(切換分頁)
1. 登入狀態下至 /facorite，點選下方的分頁
2. 即可切換分頁

#### 11. 查看收藏(切換單頁顯示數目)
1. 登入狀態下至 /facorite
2. 點選右上角 30v 的選單，選擇想要顯示的數量
3. 即可切換顯示數量

#### 12. 全部資料(重新整理)
1. 登入狀態下至 /connections
2. 點選右上角 30v 的選單切換成 10，並將下方的頁數切換成 3
3. 重新整理後，右上角是 10v，下方頁數則是停在第 3 頁。

#### 13. 查看收藏(重新整理)
1. 登入狀態下且收藏數量有 11 項的情況，至 /facorite
2. 點選右上角 30v 的選單切換成 10
3. 並將下方的頁數切換成 2
4. 重新整理
5. 右上角是 10v，下方頁數則是 2

#### 14. 全部資料-列表狀態(重新整理)
1. 登入狀態下至 /connections
2. 點選右上角的三條線的 Icon 切換成列表狀態
3. 並點選右上角 30v 的選單切換成 10
4. 將下方的頁數切換成 3
5. 重新整理
6. 右上角是 10v
7. 下方頁數則是停在第 3 頁

#### 15. 查看收藏
1. 登入狀態下且收藏數量有 11 項的情況，至 /facorite
2. 點選右上角的三條線的 Icon 切換成列表狀態
3. 並點選右上角 30v 的選單切換成 10
4. 將下方的頁數切換成 2
5. 重新整理後
6. 右上角是 10v
7. 下方頁數則是 2

#### 16. 登出
1. 點選右上角登出
2. 跳回登入頁
> *此狀態下鍵入除了 **/login ( public=false )** 以外的頁面，都會彈回登入頁。



### C. 技術與其它說明
- 除了指定的工具：Vite、Vue3、Pug、TailwindCSS 以外，還使用以下工具：
  - vee-validate - 表單驗證套件
  - throttle-debounce - 防抖和節流套件
  - bcryptjs - 密碼加密
- 型別管理 - /type/types
- 樣式管理：
  - /tailwind.config
  - /src/assets/index.postcss
- API 管理：
  - /src/config/index
  - /src/api
- 登入邏輯設計：
  - 錯誤代碼管理 - /src/config/member-code
  - 無權限強制轉跳登入頁 ( public 判斷 ) - /src/router
- 針對使用者瀏覽器開多分頁，後續的非同步操作行為，暫存資料的讀取判斷
- 全部環境變數說明 ( .env.development / .env.production )：
  - `VITE_APP_API_KEY` - 連結 Firebase 資料庫參數
  - `VITE_APP_AUTH_DOMAIN` - 連結 Firebase 資料庫參數
  - `VITE_APP_PROJECT_ID` - 連結 Firebase 資料庫參數
  - `VITE_APP_STORAGEBUCKET` - 連結 Firebase 資料庫參數
  - `VITE_APP_MESSAGINGSENDERID` - 連結 Firebase 資料庫參數
  - `VITE_APP_APPID` - 連結 Firebase 資料庫參數
  - `VITE_APP_FIREBASE_COLLECTION` - Firebase 集合物件
  - `VITE_APP_SALTROUNDS` - 密碼加密次數
  - `VITE_APP_API_PATH` - API 網域 ( ex: https://randomuser.me )



## D. 本機運行
確定環境變數都正確的狀態下，安裝 NPM 依賴並運行。
```shell
npm install
npm run dev
# 顯示 > Local: http://localhost:3000/
```
