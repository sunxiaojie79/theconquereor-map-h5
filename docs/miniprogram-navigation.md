# 小程序 web-view 跳转功能使用指南

## 概述

本文档介绍如何在小程序 web-view 嵌套的 H5 页面中实现跳转到小程序页面并传递参数的功能。

## 功能特性

- ✅ 跳转到小程序指定页面
- ✅ 支持参数传递
- ✅ 支持 Tab 页面切换
- ✅ 支持返回上一页
- ✅ 支持向小程序发送数据
- ✅ 环境检测（判断是否在小程序中）
- ✅ 完整的错误处理
- ✅ TypeScript 类型支持

## 安装依赖

确保在 HTML 中引入了微信 JS-SDK：

```html
<script
  type="text/javascript"
  src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"
></script>
```

## 基础用法

### 1. 导入跳转工具

```typescript
import { miniProgram } from "@/utils/miniprogram";
```

### 2. 跳转到小程序页面

```typescript
// 基础跳转
await miniProgram.navigateTo("/pages/profile/profile");

// 带参数跳转
await miniProgram.navigateTo("/pages/profile/profile", {
  userId: "123",
  source: "map",
});
```

### 3. 切换到 Tab 页面

```typescript
await miniProgram.switchTab("/pages/index/index");
```

### 4. 返回上一页

```typescript
await miniProgram.navigateBack(); // 返回上一页
await miniProgram.navigateBack(2); // 返回上两页
```

### 5. 向小程序发送数据

```typescript
miniProgram.postMessage({
  type: "share_data",
  data: {
    challengeId: "123",
    challengeName: "挑战名称",
  },
});
```

### 6. 环境检测

```typescript
if (miniProgram.isInMiniProgram()) {
  console.log("当前在小程序环境中");
} else {
  console.log("当前不在小程序环境中");
}
```

## 高级用法

### 1. 完整的跳转示例

```typescript
const navigateToProfile = async () => {
  try {
    await miniProgram.navigateTo("/pages/profile/profile", {
      userId: userStore.userInfo?.id || "",
      source: "map",
    });
  } catch (error) {
    console.error("跳转失败:", error);
    // 处理跳转失败的情况
    if (!miniProgram.isInMiniProgram()) {
      // 不在小程序环境中的回退处理
      console.log("当前不在小程序环境中，无法跳转");
    }
  }
};
```

### 2. 带数据发送的跳转

```typescript
const navigateToShare = async () => {
  try {
    // 先发送数据给小程序
    miniProgram.postMessage({
      type: "share_data",
      data: {
        challengeId: challengeDetail.value.id,
        challengeName: challengeDetail.value.name,
        progress: challengeDetail.value.userProgress,
      },
    });

    // 然后跳转到分享页面
    await miniProgram.navigateTo("/pages/share/share", {
      challengeId: challengeDetail.value.id || "",
      source: "map",
    });
  } catch (error) {
    console.error("跳转到分享页面失败:", error);
  }
};
```

### 3. 环境检测和信息获取

```typescript
const checkMiniProgramEnv = () => {
  const isInMiniProgram = miniProgram.isInMiniProgram();
  console.log("是否在小程序环境中:", isInMiniProgram);

  if (isInMiniProgram) {
    // 获取小程序环境信息
    miniProgram
      .getEnv()
      .then((env) => {
        console.log("小程序环境信息:", env);
      })
      .catch((error) => {
        console.error("获取环境信息失败:", error);
      });
  }

  return isInMiniProgram;
};
```

## API 参考

### MiniProgramNavigator 类

#### 静态方法

| 方法                       | 描述                   | 参数                                        | 返回值          |
| -------------------------- | ---------------------- | ------------------------------------------- | --------------- |
| `isInMiniProgram()`        | 检查是否在小程序环境中 | 无                                          | `boolean`       |
| `navigateTo(url, params?)` | 跳转到小程序页面       | `url: string, params?: Record<string, any>` | `Promise<void>` |
| `switchTab(url)`           | 切换到 Tab 页面        | `url: string`                               | `Promise<void>` |
| `navigateBack(delta?)`     | 返回上一页             | `delta?: number`                            | `Promise<void>` |
| `postMessage(data)`        | 向小程序发送数据       | `data: any`                                 | `void`          |
| `getEnv()`                 | 获取小程序环境信息     | 无                                          | `Promise<any>`  |

### miniProgram 对象

便捷的导出对象，包含上述所有方法：

```typescript
export const miniProgram = {
  navigateTo: MiniProgramNavigator.navigateTo,
  switchTab: MiniProgramNavigator.switchTab,
  navigateBack: MiniProgramNavigator.navigateBack,
  postMessage: MiniProgramNavigator.postMessage,
  isInMiniProgram: MiniProgramNavigator.isInMiniProgram,
  getEnv: MiniProgramNavigator.getEnv,
};
```

## 在 Vue 组件中使用

### 1. 模板中的条件渲染

```vue
<template>
  <!-- 只在小程序环境中显示跳转按钮 -->
  <div v-if="miniProgram.isInMiniProgram()">
    <button @click="navigateToProfile">跳转到个人中心</button>
    <button @click="navigateToShare">分享挑战</button>
    <button @click="backToMiniProgram">返回小程序</button>
  </div>
</template>
```

### 2. 组件中的方法定义

```vue
<script setup>
import { miniProgram } from "@/utils/miniprogram";

// 跳转方法
const navigateToProfile = async () => {
  await miniProgram.navigateTo("/pages/profile/profile", {
    userId: userStore.userInfo?.id || "",
    source: "map",
  });
};

const navigateToShare = async () => {
  await miniProgram.navigateTo("/pages/share/share", {
    challengeId: challengeDetail.value.id || "",
  });
};

const backToMiniProgram = async () => {
  await miniProgram.switchTab("/pages/index/index");
};
</script>
```

## 错误处理

### 常见错误类型

1. **环境错误**: 不在小程序环境中
2. **跳转错误**: 页面路径不存在或参数错误
3. **权限错误**: 没有跳转权限

### 错误处理示例

```typescript
const handleNavigation = async () => {
  try {
    await miniProgram.navigateTo("/pages/profile/profile");
  } catch (error) {
    if (error.message === "Not in miniprogram environment") {
      // 处理非小程序环境
      console.log("请在小程序中打开此页面");
    } else {
      // 处理其他错误
      console.error("跳转失败:", error);
    }
  }
};
```

## 注意事项

1. **环境检测**: 总是先检查是否在小程序环境中
2. **参数编码**: 参数会自动进行 URL 编码
3. **Tab 页面**: `switchTab` 不支持参数传递
4. **页面路径**: 确保跳转的页面路径在小程序中存在
5. **权限问题**: 确保小程序已经配置了相应的页面权限

## 调试技巧

1. **控制台日志**: 查看跳转过程中的日志输出
2. **环境检测**: 使用 `checkMiniProgramEnv()` 函数检查环境
3. **参数验证**: 确保传递的参数格式正确
4. **小程序调试**: 在小程序开发者工具中调试

## 示例项目

在 `src/views/HomeView.vue` 中可以看到完整的使用示例，包括：

- 环境检测
- 多种跳转方式
- 参数传递
- 错误处理
- UI 条件渲染

运行项目后，在小程序 web-view 中打开页面即可看到跳转功能演示。
