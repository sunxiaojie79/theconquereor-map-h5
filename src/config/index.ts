// 应用配置文件

// 图片基础URL - 根据环境设置
export const imgBaseUrl =
  import.meta.env.VITE_IMG_BASE_URL || "https://theconqueror.cn/prod-api";

// API基础URL
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

// 地图配置
export const mapConfig = {
  // 默认中心点（北京）
  defaultCenter: [116.4074, 39.9042] as [number, number],
  defaultZoom: 10,

  // 地图样式
  styles: {
    street: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    satellite:
      "https://api.maptiler.com/maps/hybrid/style.json?key=DpIVwCOpBp3YJ9IRulHS",
  },

  // 地图主题色
  themeColors: {
    primary: "#7B412D",
    secondary: "#00778A",
    accent: "#FADB47",
    text: "#242A36",
  },
};

// 微信相关配置
export const wechatConfig = {
  appId: import.meta.env.VITE_WECHAT_APP_ID || "",
};
