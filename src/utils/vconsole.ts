import VConsole from "vconsole";

// vConsole 实例
let vConsoleInstance: VConsole | null = null;

/**
 * 检查是否在小程序环境中
 */
export const isInMiniProgram = (): boolean => {
  return (
    typeof window !== "undefined" && window.__wxjs_environment === "miniprogram"
  );
};

/**
 * 检查是否在开发环境
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV || import.meta.env.MODE === "development";
};

/**
 * 检查是否应该启用 vConsole
 * 条件：小程序环境 或 开发环境 或 URL参数包含 vconsole=true
 */
export const shouldEnableVConsole = (): boolean => {
  // 检查 URL 参数
  const urlParams = new URLSearchParams(window.location.search);
  const forceEnable = urlParams.get("vconsole") === "true";

  // 检查 localStorage 设置
  const localStorageEnable =
    localStorage.getItem("vconsole_enabled") === "true";

  return (
    forceEnable || localStorageEnable || isInMiniProgram() || isDevelopment()
  );
};

/**
 * 初始化 vConsole
 * @param options vConsole 配置选项
 */
export const initVConsole = (options?: {
  theme?: "light" | "dark";
  defaultPlugins?: string[];
  maxLogNumber?: number;
  onReady?: () => void;
}): VConsole | null => {
  // 如果已经初始化过，则直接返回
  if (vConsoleInstance) {
    console.log("📱 vConsole 已经初始化，跳过重复初始化");
    return vConsoleInstance;
  }

  // 检查是否应该启用
  if (!shouldEnableVConsole()) {
    console.log("📱 当前环境不需要启用 vConsole");
    return null;
  }

  try {
    // 默认配置
    const defaultOptions = {
      theme: "light" as const,
      defaultPlugins: ["system", "network", "element", "storage"],
      maxLogNumber: 1000,
      ...options,
    };

    // 创建 vConsole 实例
    vConsoleInstance = new VConsole(defaultOptions);

    // 添加自定义样式
    addCustomStyles();

    // 添加环境信息
    logEnvironmentInfo();

    console.log("📱 vConsole 初始化成功");

    // 执行回调
    if (options?.onReady) {
      options.onReady();
    }

    return vConsoleInstance;
  } catch (error) {
    console.error("📱 vConsole 初始化失败:", error);
    return null;
  }
};

/**
 * 销毁 vConsole
 */
export const destroyVConsole = (): void => {
  if (vConsoleInstance) {
    vConsoleInstance.destroy();
    vConsoleInstance = null;
    console.log("📱 vConsole 已销毁");
  }
};

/**
 * 切换 vConsole 显示/隐藏
 */
export const toggleVConsole = (): void => {
  if (vConsoleInstance) {
    // vConsole 没有直接的 toggle 方法，但我们可以通过重新初始化来实现
    const isVisible = document.querySelector("#__vconsole");
    if (isVisible) {
      destroyVConsole();
    } else {
      initVConsole();
    }
  } else {
    initVConsole();
  }
};

/**
 * 启用 vConsole（保存到 localStorage）
 */
export const enableVConsole = (): void => {
  localStorage.setItem("vconsole_enabled", "true");
  if (!vConsoleInstance) {
    initVConsole();
  }
  console.log("📱 vConsole 已启用并保存到本地存储");
};

/**
 * 禁用 vConsole（从 localStorage 移除）
 */
export const disableVConsole = (): void => {
  localStorage.removeItem("vconsole_enabled");
  destroyVConsole();
  console.log("📱 vConsole 已禁用并从本地存储移除");
};

/**
 * 添加自定义样式
 */
const addCustomStyles = (): void => {
  const style = document.createElement("style");
  style.textContent = `
    /* vConsole 自定义样式 */
    #__vconsole {
      z-index: 10000 !important;
    }
    
    /* 小程序环境中的特殊样式 */
    .vc-switch {
      background: rgba(0, 0, 0, 0.8) !important;
      backdrop-filter: blur(10px);
    }
    
    /* 优化移动端显示 */
    @media (max-width: 768px) {
      .vc-panel {
        font-size: 12px !important;
      }
      
      .vc-tabbox {
        height: 35px !important;
      }
      
      .vc-tab {
        line-height: 35px !important;
        font-size: 12px !important;
      }
    }
  `;
  document.head.appendChild(style);
};

/**
 * 输出环境信息到控制台
 */
const logEnvironmentInfo = (): void => {
  const info = {
    "🌐 环境信息": {
      是否小程序环境: isInMiniProgram(),
      是否开发环境: isDevelopment(),
      当前环境模式: import.meta.env.MODE,
      当前时间: new Date().toLocaleString(),
      用户代理: navigator.userAgent,
      页面URL: window.location.href,
    },
    "📱 设备信息": {
      屏幕尺寸: `${window.screen.width}x${window.screen.height}`,
      视窗尺寸: `${window.innerWidth}x${window.innerHeight}`,
      设备像素比: window.devicePixelRatio,
      语言: navigator.language,
      平台: navigator.platform,
    },
  };

  console.group("📊 系统信息");
  console.table(info["🌐 环境信息"]);
  console.table(info["📱 设备信息"]);
  console.groupEnd();
};

/**
 * 添加测试日志
 */
export const addTestLogs = (): void => {
  if (!vConsoleInstance) {
    console.warn("vConsole 未初始化，无法添加测试日志");
    return;
  }

  console.log("📋 这是一条普通日志");
  console.info("ℹ️ 这是一条信息日志");
  console.warn("⚠️ 这是一条警告日志");
  console.error("❌ 这是一条错误日志");

  // 测试网络请求日志
  fetch("/api/test").catch(() => {
    console.log("🌐 网络请求测试（预期失败）");
  });

  // 测试对象输出
  console.log("📦 测试对象输出:", {
    用户信息: { id: 123, name: "测试用户" },
    配置信息: { theme: "light", debug: true },
    数组数据: [1, 2, 3, { nested: "object" }],
  });
};

/**
 * vConsole 工具对象
 */
export const vConsoleUtils = {
  // 初始化
  init: initVConsole,
  // 销毁
  destroy: destroyVConsole,
  // 切换显示
  toggle: toggleVConsole,
  // 启用
  enable: enableVConsole,
  // 禁用
  disable: disableVConsole,
  // 检查是否应该启用
  shouldEnable: shouldEnableVConsole,
  // 检查是否在小程序中
  isInMiniProgram,
  // 检查是否在开发环境
  isDevelopment,
  // 添加测试日志
  addTestLogs,
  // 获取实例
  getInstance: () => vConsoleInstance,
};

// 默认导出
export default vConsoleUtils;

// TypeScript 类型声明扩展
declare global {
  interface Window {
    __wxjs_environment?: string;
    vConsoleUtils?: typeof vConsoleUtils;
  }
}

// 将工具挂载到 window 对象（方便调试时使用）
if (typeof window !== "undefined") {
  window.vConsoleUtils = vConsoleUtils;
}
