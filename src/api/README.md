# API 接口模块使用说明

## 概述

本项目提供了完整的 API 接口模块，使用 axios 进行 HTTP 请求封装，支持请求/响应拦截、错误处理、TypeScript 类型支持等功能。

## 目录结构

```
src/api/
├── index.ts              # axios 配置和基础请求封装
├── types.ts              # TypeScript 类型定义
├── modules/              # API 模块
│   ├── index.ts          # 模块统一导出
│   ├── user.ts           # 用户相关 API
│   ├── sport.ts          # 运动相关 API
│   ├── map.ts            # 地图相关 API
│   └── challenge.ts      # 挑战项目相关 API
└── README.md             # 本文档
```

## 环境配置

### 1. 创建环境变量文件

在项目根目录创建以下环境变量文件：

**`.env.development`** (开发环境)

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=征服者地图H5
VITE_MAP_API_KEY=your_map_api_key_here
VITE_WECHAT_APP_ID=your_wechat_app_id_here
```

**`.env.production`** (生产环境)

```env
VITE_API_BASE_URL=https://api.yourapp.com/api
VITE_APP_TITLE=征服者地图H5
VITE_MAP_API_KEY=your_production_map_api_key
VITE_WECHAT_APP_ID=your_production_wechat_app_id
```

## 基本使用

### 1. 导入 API

```typescript
// 导入单个模块
import { userApi } from "@/api/modules/user";
import { sportApi } from "@/api/modules/sport";

// 或者批量导入
import { userApi, sportApi, mapApi, challengeApi } from "@/api/modules";
```

### 2. 基本请求示例

```typescript
// 用户登录
const loginUser = async () => {
  try {
    const response = await userApi.login({
      username: "user@example.com",
      password: "123456",
    });

    // 保存token
    localStorage.setItem("token", response.data.token);
    console.log("登录成功:", response.data.user);
  } catch (error) {
    console.error("登录失败:", error);
  }
};

// 获取运动记录
const getSportRecords = async () => {
  try {
    const response = await sportApi.getSportRecords({
      page: 1,
      pageSize: 10,
      type: "running",
    });

    console.log("运动记录:", response.data.list);
  } catch (error) {
    console.error("获取运动记录失败:", error);
  }
};
```

### 3. 在 Vue 组件中使用

```vue
<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="record in sportRecords" :key="record.id">
        {{ record.type }} - {{ record.distance }}km
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { sportApi } from "@/api/modules";
import type { SportRecord } from "@/api/types";

const loading = ref(false);
const error = ref<string | null>(null);
const sportRecords = ref<SportRecord[]>([]);

const fetchSportRecords = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await sportApi.getSportRecords({
      page: 1,
      pageSize: 10,
    });
    sportRecords.value = response.data.list;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "获取数据失败";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSportRecords();
});
</script>
```

## API 模块说明

### 用户模块 (userApi)

- `login(params)` - 用户登录
- `register(params)` - 用户注册
- `getUserInfo()` - 获取用户信息
- `updateUserInfo(params)` - 更新用户信息
- `uploadAvatar(file)` - 上传头像
- `changePassword(params)` - 修改密码
- `logout()` - 用户登出

### 运动模块 (sportApi)

- `getSportRecords(params)` - 获取运动记录列表
- `createSportRecord(params)` - 创建运动记录
- `updateSportRecord(id, params)` - 更新运动记录
- `deleteSportRecord(id)` - 删除运动记录
- `getSportProgress()` - 获取运动进度
- `getSportStatistics(params)` - 获取运动统计

### 地图模块 (mapApi)

- `getMapPoints(params)` - 获取地图点位
- `getRoutes()` - 获取路线信息
- `getPostcards(params)` - 获取明信片列表
- `getViewpoints(params)` - 获取风景点列表
- `getUserLocation()` - 获取用户位置
- `updateUserLocation(params)` - 更新用户位置

### 挑战模块 (challengeApi)

- `getChallenges(params)` - 获取挑战项目列表
- `getChallenge(id)` - 获取挑战详情
- `joinChallenge(id)` - 参加挑战
- `getMyChallenges(params)` - 获取我的挑战
- `submitProgress(id, params)` - 提交挑战进度

## 错误处理

API 模块提供了统一的错误处理机制：

```typescript
try {
  const response = await userApi.getUserInfo();
  return response.data;
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes("401")) {
      // 处理未授权错误
      console.log("需要重新登录");
    } else if (error.message.includes("403")) {
      // 处理权限不足错误
      console.log("权限不足");
    } else if (error.message.includes("网络")) {
      // 处理网络错误
      console.log("网络连接异常");
    }
  }
}
```

## TypeScript 类型支持

所有 API 接口都提供了完整的 TypeScript 类型支持：

```typescript
import type {
  User,
  SportRecord,
  MapPoint,
  Challenge,
  LoginParams,
  BaseResponse,
} from "@/api/types";

// 类型推断
const user: User = response.data.user;
const records: SportRecord[] = response.data.list;
```

## 文件上传

支持文件上传功能：

```typescript
// 头像上传
const uploadAvatar = async (file: File) => {
  try {
    const response = await userApi.uploadAvatar(file);
    console.log("上传成功:", response.data.url);
  } catch (error) {
    console.error("上传失败:", error);
  }
};

// 地图截图上传
const uploadScreenshot = async (file: File, coordinates: [number, number]) => {
  try {
    const response = await mapApi.uploadMapScreenshot(file, {
      coordinates,
      description: "我的位置截图",
    });
    console.log("截图上传成功:", response.data.url);
  } catch (error) {
    console.error("截图上传失败:", error);
  }
};
```

## 请求拦截器

API 模块会自动处理以下功能：

- **Token 添加**: 自动从 localStorage 获取 token 并添加到请求头
- **请求日志**: 开发环境下打印请求信息
- **响应处理**: 统一处理响应数据格式
- **错误处理**: 统一处理不同类型的错误

## 注意事项

1. **Token 管理**: 登录成功后需要手动保存 token 到 localStorage
2. **错误处理**: 建议在组件中添加适当的错误处理逻辑
3. **类型安全**: 充分利用 TypeScript 类型检查，避免类型错误
4. **环境变量**: 不同环境使用不同的 API 基础地址
5. **网络状态**: 在移动端应用中注意处理网络异常情况
