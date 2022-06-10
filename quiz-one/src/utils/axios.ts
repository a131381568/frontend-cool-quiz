import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
  AxiosResponseHeaders,
} from "axios";
import config from "@/config";
const {
  api: { devApiBaseUrl, proApiBaseUrl },
} = config;
const apiBaseUrl =
  process.env.NODE_ENV === "production" ? proApiBaseUrl : devApiBaseUrl;

class HttpRequest {
  // 定義一個介面請求類，用於建立一個axios請求例項
  constructor(public baseUrl: string = apiBaseUrl) {
    // 這個類接收一個字串引數，是介面請求的基本路徑
    this.baseUrl = baseUrl;
  }
  public request(options: AxiosRequestConfig): AxiosPromise {
    // 我們實際呼叫介面的時候呼叫例項的這個方法，他返回一個AxiosPromise
    const instance: AxiosInstance = axios.create(); // 這裡使用axios.create方法建立一個axios例項，他是一個函式，同時這個函式包含多個屬性
    options = this.mergeConfig(options); // 合併基礎路徑和每個介面單獨傳入的配置，比如url、引數等
    this.interceptors(instance, options.url); // 呼叫interceptors方法使攔截器生效
    return instance(options); // 最後返回AxiosPromise
  }
  private interceptors(instance: AxiosInstance, url?: string) {
    // 定義這個函式用於新增全域性請求和響應攔截邏輯
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 介面請求的所有配置，都在這個config物件中，他的型別是AxiosRequestConfig，你可以看到他有哪些欄位
        console.log(config);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data, status, statusText } = res; // res的型別是AxiosResponse<any>，包含六個欄位，其中data是服務端返回的資料
        if (status !== 200) {
          console.error(statusText);
          switch (status) {
            case 404:
              alert("查無請求路徑");
              break;
            case 502:
              alert("伺服器錯誤");
              break;
            default:
              alert("不明原因錯誤");
              break;
          }
        }
        return data; // 返回資料 // data.data
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
    // 這個方法用於合併基礎路徑配置和介面單獨配置
    return Object.assign({ baseURL: this.baseUrl }, options);
  }
}
export default HttpRequest;
