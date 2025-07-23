import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, UserInfo } from "@/api/types";

export const useUserStore = defineStore("user", () => {
  // 状态
  const token = ref<string | null>(null);
  const userInfo = ref<UserInfo | null>(null);
  const isLoggedIn = computed(() => !!token.value);

  // 设置token
  const setToken = (newToken: string | null) => {
    token.value = newToken;

    // 同时保存到localStorage作为备份
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  // 设置用户信息
  const setUserInfo = (info: UserInfo | null) => {
    userInfo.value = info;

    // 同时保存到localStorage
    if (info) {
      localStorage.setItem("userInfo", JSON.stringify(info));
    } else {
      localStorage.removeItem("userInfo");
    }
  };

  // 从localStorage初始化
  const initFromStorage = () => {
    const storedToken = localStorage.getItem("token");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedToken) {
      token.value = storedToken;
    }

    if (storedUserInfo) {
      try {
        userInfo.value = JSON.parse(storedUserInfo);
      } catch (error) {
        console.error("解析用户信息失败:", error);
        localStorage.removeItem("userInfo");
      }
    }
  };

  // 登录
  const login = (newToken: string, user: UserInfo) => {
    setToken(newToken);
    setUserInfo(user);
  };

  // 登出
  const logout = () => {
    setToken(null);
    setUserInfo(null);
  };

  // 清除数据
  const clearData = () => {
    logout();
  };

  // 从URL参数获取token
  const getTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      console.log("从URL获取到token:", urlToken);
      setToken(urlToken);

      // 清除URL中的token参数，避免敏感信息暴露
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.toString());

      return urlToken;
    }

    return null;
  };

  // 初始化store
  const init = () => {
    // 首先尝试从URL获取token
    const urlToken = getTokenFromUrl();

    // 如果URL中没有token，则从localStorage初始化
    if (!urlToken) {
      initFromStorage();
    }
  };

  return {
    // 状态
    token,
    userInfo,
    isLoggedIn,

    // 方法
    setToken,
    setUserInfo,
    login,
    logout,
    clearData,
    getTokenFromUrl,
    initFromStorage,
    init,
  };
});
