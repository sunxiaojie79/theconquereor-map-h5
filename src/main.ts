import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import VueAMap, { initAMapApiLoader } from "@vuemap/vue-amap";
import "@vuemap/vue-amap/dist/style.css";

import "./style.css";

// 导入 vConsole 工具
import vConsoleUtils from "@/utils/vconsole";

// 初始化 vConsole（自动检测环境）
vConsoleUtils.init({
  theme: "light",
  onReady: () => {
    console.log("📱 vConsole 准备就绪！");
    console.log("💡 使用 window.vConsoleUtils 来控制 vConsole");

    // 在小程序环境中添加一些测试日志
    if (vConsoleUtils.isInMiniProgram()) {
      console.log("🎉 当前在小程序环境中，vConsole 已自动启用");
      setTimeout(() => {
        vConsoleUtils.addTestLogs();
      }, 1000);
    }
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAMap);

app.mount("#app");
