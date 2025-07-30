# 路线位置计算工具

根据用户进度百分比计算在路线上的坐标位置的工具集。

## 功能特性

- 🎯 根据用户进度百分比精确计算在路线上的坐标位置
- 📏 考虑真实地理距离与设定距离的比例关系
- 🗺️ 支持多种坐标格式（数组、对象）
- 📊 批量计算多个用户的位置
- 🔧 类型安全的 TypeScript 支持

## 核心原理

1. **距离校准**：计算路线上各段的真实地理距离，然后根据设定的总距离进行比例调整
2. **线性插值**：在找到目标点所在的线段后，使用线性插值计算精确的坐标位置
3. **格式兼容**：自动处理不同格式的坐标数据

## API 文档

### calculateUserPosition

根据用户进度百分比计算在路线上的坐标位置。

```typescript
function calculateUserPosition(
  userProcess: number, // 用户进度百分比 (0-100)
  routeData: string | any[], // 路线坐标数据
  totalDistance: number // 路线总距离（公里）
): Coordinate | null;
```

**参数说明：**

- `userProcess`: 用户完成的进度百分比，范围 0-100
- `routeData`: 路线坐标数据，支持 JSON 字符串或坐标数组
- `totalDistance`: 路线的总距离（公里）

**返回值：**

- 成功：`[经度, 纬度]` 格式的坐标数组
- 失败：`null`

### calculateAllUsersPositions

批量计算多个用户在路线上的位置。

```typescript
function calculateAllUsersPositions(
  userInfoList: any[], // 用户信息列表
  routeData: string | any[], // 路线坐标数据
  totalDistance: number // 路线总距离
): UserWithPosition[];
```

### getPositionByRatio

根据距离比例获取路线上的坐标点（适用于动画等场景）。

```typescript
function getPositionByRatio(
  routeData: string | any[],
  distanceRatio: number // 距离比例 (0-1)
): Coordinate | null;
```

### calculateProgressDistance

计算用户相对于起点的进度距离。

```typescript
function calculateProgressDistance(
  userProcess: number, // 用户进度百分比
  totalDistance: number // 路线总距离
): number; // 返回进度距离（公里）
```

## 使用示例

### 基本使用

```typescript
import {
  calculateUserPosition,
  calculateAllUsersPositions,
} from "@/utils/route-position";

// 单个用户位置计算
const userPosition = calculateUserPosition(51, routeData, 10);
console.log("用户位置:", userPosition); // [116.402477, 39.906632]

// 多个用户位置计算
const usersWithPositions = calculateAllUsersPositions(
  userInfoList,
  routeData,
  10
);
```

### 在 Vue 组件中使用

```vue
<script setup>
import { ref, computed } from "vue";
import { calculateAllUsersPositions } from "@/utils/route-position";

const challengeDetail = ref({});
const userInfoList = ref([]);

// 计算所有用户位置
const usersWithPositions = computed(() => {
  if (!challengeDetail.value.route || !challengeDetail.value.distance) {
    return [];
  }

  return calculateAllUsersPositions(
    userInfoList.value,
    challengeDetail.value.route,
    challengeDetail.value.distance
  );
});

// 在地图上显示用户
const showUsersOnMap = () => {
  usersWithPositions.value.forEach((user) => {
    if (user.position) {
      addUserMarkerToMap(user);
    }
  });
};
</script>
```

### 支持的路线数据格式

```typescript
// 格式1：数组格式
const route1 = [
  [116.397428, 39.90923],
  [116.407526, 39.90403],
];

// 格式2：对象格式（lng, lat）
const route2 = [
  { lng: 116.397428, lat: 39.90923 },
  { lng: 116.407526, lat: 39.90403 },
];

// 格式3：对象格式（longitude, latitude）
const route3 = [
  { longitude: 116.397428, latitude: 39.90923 },
  { longitude: 116.407526, latitude: 39.90403 },
];

// 格式4：JSON字符串
const route4 = JSON.stringify(route1);

// 所有格式都可以正常使用
const position = calculateUserPosition(50, route1, 10);
```

## 用户数据格式

```typescript
interface UserInfo {
  id: string;
  userNickname: string;
  process: number; // 进度百分比 (0-100)
  avatar?: string;
  params?: any;
}

// 示例数据
const userInfoList = [
  {
    id: "1944668554736496642",
    userNickname: "tyl",
    process: 51,
    avatar: "wxfile://...",
  },
];
```

## 注意事项

1. **距离校准**：函数会自动计算路线各段的真实地理距离，并根据设定的总距离进行比例调整
2. **边界处理**：
   - 进度 ≤ 0%：返回起点坐标
   - 进度 ≥ 100%：返回终点坐标
3. **数据验证**：在计算前会验证输入数据的完整性
4. **错误处理**：遇到错误时返回 `null`，并在控制台输出错误信息

## 实际应用场景

1. **地图标记**：在地图上显示用户当前位置
2. **进度可视化**：实时更新用户在路线上的位置
3. **排行榜**：显示用户相对位置关系
4. **动画效果**：创建用户移动的动画效果
5. **统计分析**：分析用户分布情况

## 性能优化建议

1. 对于大量用户，考虑使用防抖或节流来限制计算频率
2. 缓存路线数据解析结果，避免重复计算
3. 使用 Web Workers 进行大量计算以避免阻塞主线程
