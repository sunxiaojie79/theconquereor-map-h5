# Store 状态管理使用说明

## 概述

本项目使用 Pinia 进行状态管理，目前包含用户 Store 模块，用于管理用户认证和基础信息。

## 目录结构

```
src/stores/
├── index.ts     # Store统一导出
├── user.ts      # 用户Store模块
└── README.md    # 本文档
```

## 用户 Store (useUserStore)

### 功能特性

- ✅ 从 URL 参数自动获取 token
- ✅ Token 持久化存储（localStorage 备份）
- ✅ 自动清理 URL 中的敏感信息
- ✅ 用户登录状态管理
- ✅ 与 API 模块集成

### 状态管理

#### 状态属性

```typescript
const userStore = useUserStore();

// 状态
userStore.token; // string | null - 用户token
userStore.userInfo; // UserInfo | null - 用户信息
userStore.isLoggedIn; // boolean - 是否已登录（计算属性）
```

#### 方法

```typescript
// 设置token
userStore.setToken("your-token-here");

// 设置用户信息
userStore.setUserInfo({
  id: "123",
  username: "john",
  email: "john@example.com",
});

// 用户登录（同时设置token和用户信息）
userStore.login("token", userInfo);

// 用户登出（清除所有信息）
userStore.logout();

// 从URL获取token
userStore.getTokenFromUrl();

// 初始化Store（优先从URL获取token，否则从localStorage恢复）
userStore.init();
```

## 使用方法

### 1. 在组件中使用

```vue
<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

// 在onMounted中初始化
onMounted(() => {
  userStore.init();
});

// 检查登录状态
if (userStore.isLoggedIn) {
  console.log("用户已登录，token:", userStore.token);
}
</script>

<template>
  <div>
    <div v-if="userStore.isLoggedIn">
      欢迎，{{ userStore.userInfo?.username }}！
    </div>
    <div v-else>请先登录</div>
  </div>
</template>
```

### 2. URL 参数获取 Token

当页面 URL 包含 token 参数时，Store 会自动获取并存储：

```
https://yourapp.com/?token=your-jwt-token-here
```

访问后：

- token 会被自动提取并存储到 Store
- URL 会被清理，移除 token 参数（出于安全考虑）
- token 同时备份到 localStorage

### 3. 与 API 模块集成

API 模块会自动从 Store 获取 token：

```typescript
// API请求会自动包含Authorization头
const response = await userApi.getUserInfo();
```

如果 token 过期（401 错误），Store 会自动清除 token 并登出用户。

### 4. 手动管理 Token

```typescript
// 设置token
userStore.setToken("new-token");

// 清除token
userStore.logout();

// 检查登录状态
if (userStore.isLoggedIn) {
  // 用户已登录
}
```

## 初始化流程

Store 的初始化流程如下：

1. **URL 检查**: 首先检查 URL 参数中是否包含 token
2. **URL 清理**: 如果找到 token，提取后清理 URL
3. **本地恢复**: 如果 URL 中没有 token，从 localStorage 恢复
4. **状态同步**: 确保 Store 状态与存储保持同步

```typescript
// 在应用入口或主要组件中调用
userStore.init();
```

## 最佳实践

### 1. 组件初始化

在主要组件的`onMounted`中调用 init：

```vue
<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(() => {
  userStore.init();
});
</script>
```

### 2. 路由守卫中使用

```typescript
// router/index.ts
import { useUserStore } from "@/stores/user";

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});
```

### 3. 登录处理

```typescript
// 登录成功后
const handleLogin = async (credentials) => {
  try {
    const response = await userApi.login(credentials);
    userStore.login(response.data.token, response.data.user);

    console.log("登录成功");
  } catch (error) {
    console.error("登录失败:", error);
  }
};
```

### 4. 登出处理

```typescript
const handleLogout = async () => {
  try {
    await userApi.logout();
  } finally {
    userStore.logout();
    // 可以重定向到登录页
  }
};
```

## 调试信息

开发环境下，Store 会输出调试信息：

```javascript
// 控制台会显示：
// 从URL获取到token: your-token-here
// 当前token: your-token-here
// 是否已登录: true
```

## 注意事项

1. **安全性**: token 从 URL 中提取后会立即清理 URL，避免敏感信息泄露
2. **持久化**: token 同时存储在 Store 和 localStorage，刷新页面不会丢失
3. **自动清理**: API 返回 401 错误时会自动清除 token
4. **初始化**: 建议在应用入口调用`userStore.init()`确保正确初始化
5. **响应式**: 所有状态都是响应式的，可以直接在模板中使用
