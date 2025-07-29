# vConsole 移动端调试工具使用说明

## 📱 概述

vConsole 是一个轻量级、可拓展、针对手机网页的前端开发者调试面板。在本项目中，vConsole 被配置为自动检测环境并智能启用，特别适用于小程序 web-view 中的日志查看和调试。

## ✨ 功能特性

- 🔍 **控制台日志查看** - 在移动端查看 `console.log`、`console.error` 等日志
- 🌐 **网络请求监控** - 监控所有网络请求和响应
- 📱 **系统信息显示** - 查看设备信息、环境信息等
- 💾 **本地存储查看** - 查看 localStorage、sessionStorage 等
- 🎯 **元素检查** - 简单的 DOM 元素检查功能
- 🔧 **智能启用** - 根据环境自动启用或禁用

## 🚀 启用条件

vConsole 会在以下任一条件满足时自动启用：

1. **小程序环境** - 检测到在微信小程序 web-view 中运行
2. **开发环境** - 本地开发模式 (`npm run dev`)
3. **URL 参数** - URL 中包含 `?vconsole=true`
4. **本地存储** - localStorage 中设置了 `vconsole_enabled=true`
5. **调试参数** - URL 中包含 `?debug=true`

## 🎮 使用方法

### 1. 自动启用

在满足启用条件的环境中，vConsole 会自动初始化并显示在页面右下角。

### 2. 手动控制

在 HomeView 页面中，如果显示了 "vConsole 调试控制" 面板，您可以：

- **显示/隐藏 vConsole** - 切换调试面板的显示状态
- **添加测试日志** - 添加各种类型的测试日志用于验证功能
- **永久启用** - 将启用状态保存到本地存储
- **永久禁用** - 清除本地存储的启用状态

### 3. 编程方式控制

在浏览器控制台或代码中，您可以使用 `window.vConsoleUtils` 对象：

```javascript
// 显示/隐藏 vConsole
window.vConsoleUtils.toggle();

// 永久启用
window.vConsoleUtils.enable();

// 永久禁用
window.vConsoleUtils.disable();

// 添加测试日志
window.vConsoleUtils.addTestLogs();

// 检查是否在小程序环境
window.vConsoleUtils.isInMiniProgram();
```

## 📋 面板功能介绍

### Console 面板

- 显示所有 `console.*` 输出
- 支持不同级别的日志（log、info、warn、error）
- 可以执行 JavaScript 命令

### Network 面板

- 显示所有网络请求
- 查看请求和响应的详细信息
- 支持 XHR、Fetch、图片等类型的请求

### Element 面板

- 查看当前页面的 DOM 结构
- 简单的元素检查功能

### Storage 面板

- 查看 localStorage 和 sessionStorage
- 查看 Cookie 信息

### System 面板

- 显示设备信息（屏幕尺寸、用户代理等）
- 显示页面信息（URL、加载时间等）

## 🔧 配置选项

### 环境变量配置

在 `src/utils/vconsole.ts` 中可以配置：

```typescript
// 默认配置
const defaultOptions = {
  theme: "light", // 主题：light 或 dark
  defaultPlugins: [
    // 默认启用的插件
    "system",
    "network",
    "element",
    "storage",
  ],
  maxLogNumber: 1000, // 最大日志条数
};
```

### 样式自定义

vConsole 的样式会自动适配移动端，并针对小程序环境进行了特殊优化：

- 更高的 z-index 确保显示在最前面
- 适配移动端的字体大小和触控操作
- 半透明背景和毛玻璃效果

## 🐛 调试技巧

### 1. 在小程序中调试

```javascript
// 检测小程序环境
if (window.__wxjs_environment === "miniprogram") {
  console.log("当前在小程序环境中");
  // 添加小程序特有的调试信息
}
```

### 2. 网络请求调试

所有通过 Axios 发出的请求都会在 Network 面板中显示，包括：

- 请求 URL 和方法
- 请求头和请求体
- 响应状态和响应体
- 请求耗时

### 3. 地图相关调试

```javascript
// 地图事件调试
map.on("load", () => {
  console.log("地图加载完成");
});

// 地图错误调试
map.on("error", (e) => {
  console.error("地图错误:", e);
});
```

### 4. 性能调试

```javascript
// 使用 console.time 测量性能
console.time("地图初始化");
initMap();
console.timeEnd("地图初始化");
```

## 💡 注意事项

1. **性能影响** - vConsole 会对性能产生一定影响，建议仅在调试时启用
2. **日志数量** - 避免输出过多日志，设置了最大日志数量限制
3. **安全性** - 生产环境中确保敏感信息不会通过日志泄露
4. **移动端操作** - 在小屏幕设备上，vConsole 面板会占用一定空间

## 🚨 故障排除

### vConsole 没有显示

1. 检查是否满足启用条件
2. 查看浏览器控制台是否有错误信息
3. 尝试手动启用：`window.vConsoleUtils.enable()`

### 日志不显示

1. 确认 vConsole 已正确初始化
2. 检查日志级别设置
3. 清除浏览器缓存后重试

### 在小程序中无法使用

1. 确认小程序已允许 web-view 的调试功能
2. 检查小程序的域名配置
3. 确认微信 JS-SDK 已正确加载

## 📚 更多信息

- [vConsole 官方文档](https://github.com/Tencent/vConsole)
- [微信小程序 web-view 组件文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)

## 🎉 使用示例

### 在开发环境中

```bash
# 启动开发服务器
npm run dev

# vConsole 会自动启用
# 访问 http://localhost:3000 即可看到 vConsole 面板
```

### 在小程序中

```javascript
// 小程序页面中嵌入 web-view
<web-view src="https://yourdomain.com/map/?vconsole=true"></web-view>
```

### 手动控制

```javascript
// 在页面中手动控制 vConsole
if (window.vConsoleUtils) {
  // 启用 vConsole
  window.vConsoleUtils.enable();

  // 添加一些调试日志
  console.log("这是一条调试日志");
  console.error("这是一条错误日志");

  // 测试网络请求
  fetch("/api/test").then((response) => {
    console.log("请求响应:", response);
  });
}
```

---

**祝您调试愉快！** 🎯
