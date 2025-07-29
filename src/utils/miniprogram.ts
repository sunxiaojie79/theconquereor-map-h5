// 小程序跳转工具类
export class MiniProgramNavigator {
  /**
   * 检查是否在小程序环境中
   */
  static isInMiniProgram(): boolean {
    return (
      typeof window !== "undefined" &&
      window.__wxjs_environment === "miniprogram"
    );
  }

  /**
   * 跳转到小程序页面
   * @param url 小程序页面路径
   * @param params 传递的参数对象
   */
  static navigateTo(url: string, params?: Record<string, any>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isInMiniProgram()) {
        console.warn("当前不在小程序环境中");
        reject(new Error("Not in miniprogram environment"));
        return;
      }

      // 构建完整的跳转URL
      let fullUrl = url;
      if (params && Object.keys(params).length > 0) {
        const queryString = Object.entries(params)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
          )
          .join("&");
        fullUrl += (url.includes("?") ? "&" : "?") + queryString;
      }

      console.log("跳转到小程序页面:", fullUrl);

      if (typeof wx !== "undefined" && wx.miniProgram) {
        wx.miniProgram.navigateTo({
          url: fullUrl,
          success: () => {
            console.log("跳转成功");
            resolve();
          },
          fail: (err: any) => {
            console.error("跳转失败:", err);
            reject(err);
          },
        });
      } else {
        reject(new Error("wx.miniProgram is not available"));
      }
    });
  }

  /**
   * 切换到小程序页面（会关闭当前页面）
   * @param url 小程序页面路径
   * @param params 传递的参数对象
   */
  static switchTab(url: string, params?: Record<string, any>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isInMiniProgram()) {
        console.warn("当前不在小程序环境中");
        reject(new Error("Not in miniprogram environment"));
        return;
      }

      // switchTab 不支持参数，需要通过其他方式传递
      console.log("切换到小程序Tab页面:", url);

      if (typeof wx !== "undefined" && wx.miniProgram) {
        wx.miniProgram.switchTab({
          url: url,
          success: () => {
            console.log("切换成功");
            resolve();
          },
          fail: (err: any) => {
            console.error("切换失败:", err);
            reject(err);
          },
        });
      } else {
        reject(new Error("wx.miniProgram is not available"));
      }
    });
  }

  /**
   * 返回小程序
   * @param delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页
   */
  static navigateBack(delta: number = 1): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isInMiniProgram()) {
        console.warn("当前不在小程序环境中");
        reject(new Error("Not in miniprogram environment"));
        return;
      }

      if (typeof wx !== "undefined" && wx.miniProgram) {
        wx.miniProgram.navigateBack({
          delta: delta,
          success: () => {
            console.log("返回成功");
            resolve();
          },
          fail: (err: any) => {
            console.error("返回失败:", err);
            reject(err);
          },
        });
      } else {
        reject(new Error("wx.miniProgram is not available"));
      }
    });
  }

  /**
   * 向小程序发送数据
   * @param data 要发送的数据
   */
  static postMessage(data: any): void {
    if (!this.isInMiniProgram()) {
      console.warn("当前不在小程序环境中");
      return;
    }

    if (typeof wx !== "undefined" && wx.miniProgram) {
      wx.miniProgram.postMessage({
        data: data,
      });
      console.log("向小程序发送数据:", data);
    }
  }

  /**
   * 获取小程序环境信息
   */
  static getEnv(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isInMiniProgram()) {
        reject(new Error("Not in miniprogram environment"));
        return;
      }

      if (typeof wx !== "undefined" && wx.miniProgram) {
        wx.miniProgram.getEnv((res: any) => {
          console.log("小程序环境信息:", res);
          resolve(res);
        });
      } else {
        reject(new Error("wx.miniProgram is not available"));
      }
    });
  }
}

// 便捷的导出函数
export const miniProgram = {
  // 跳转到小程序页面
  navigateTo: MiniProgramNavigator.navigateTo.bind(MiniProgramNavigator),
  // 切换到Tab页面
  switchTab: MiniProgramNavigator.switchTab.bind(MiniProgramNavigator),
  // 返回上一页
  navigateBack: MiniProgramNavigator.navigateBack.bind(MiniProgramNavigator),
  // 发送数据给小程序
  postMessage: MiniProgramNavigator.postMessage.bind(MiniProgramNavigator),
  // 检查是否在小程序中
  isInMiniProgram:
    MiniProgramNavigator.isInMiniProgram.bind(MiniProgramNavigator),
  // 获取环境信息
  getEnv: MiniProgramNavigator.getEnv.bind(MiniProgramNavigator),
};

// TypeScript 类型声明
declare global {
  interface Window {
    __wxjs_environment?: string;
  }

  interface WxMiniProgram {
    navigateTo(options: {
      url: string;
      success?: () => void;
      fail?: (err: any) => void;
    }): void;

    switchTab(options: {
      url: string;
      success?: () => void;
      fail?: (err: any) => void;
    }): void;

    navigateBack(options: {
      delta: number;
      success?: () => void;
      fail?: (err: any) => void;
    }): void;

    postMessage(options: { data: any }): void;

    getEnv(callback: (res: any) => void): void;
  }

  interface Wx {
    miniProgram: WxMiniProgram;
  }

  const wx: Wx;
}
