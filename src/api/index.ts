import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStore } from "@/stores/user";

// 请求和响应的通用类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 创建axios实例
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 从store获取token
      try {
        const userStore = useUserStore();
        const token = userStore.token;
        console.log("🚀 ~ createAxiosInstance ~ token:", token);
        if (token) {
          config.headers["X-WX-TOKEN"] = token;
        }
      } catch (error) {
        // 如果store还未初始化，回退到localStorage
        console.warn("Store未初始化，使用localStorage获取token:", error);
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["X-WX-TOKEN"] = token;
        }
      }

      console.log("请求发送:", config);
      return config;
    },
    (error) => {
      console.error("请求错误:", error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const { data } = response;

      // 统一处理响应
      if (data.code === 200 || response.status === 200) {
        return response;
      } else {
        console.error("业务错误:", data.message);
        return Promise.reject(new Error(data.message || "请求失败"));
      }
    },
    (error) => {
      console.error("响应错误:", error);

      // 统一错误处理
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 401:
            // 未授权，清除token并跳转登录
            try {
              const userStore = useUserStore();
              userStore.logout();
            } catch (error) {
              // 如果store未初始化，回退到localStorage
              localStorage.removeItem("token");
            }
            // 这里可以添加路由跳转逻辑
            break;
          case 403:
            console.error("权限不足");
            break;
          case 404:
            console.error("请求的资源不存在");
            break;
          case 500:
            console.error("服务器内部错误");
            break;
          default:
            console.error(`请求错误: ${status}`);
        }

        return Promise.reject(new Error(data?.message || "网络错误"));
      } else if (error.request) {
        console.error("网络错误，请检查网络连接");
        return Promise.reject(new Error("网络错误，请检查网络连接"));
      } else {
        console.error("请求配置错误:", error.message);
        return Promise.reject(error);
      }
    }
  );

  return instance;
};

// 导出axios实例
export const http = createAxiosInstance();

// 封装常用的请求方法
export const request = {
  get: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await http.get(url, config);
    return response.data;
  },

  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await http.post(url, data, config);
    return response.data;
  },

  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await http.put(url, data, config);
    return response.data;
  },

  delete: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await http.delete(url, config);
    return response.data;
  },

  patch: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await http.patch(url, data, config);
    return response.data;
  },
};

export default request;
