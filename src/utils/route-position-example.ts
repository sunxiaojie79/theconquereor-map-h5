/**
 * 路线位置计算工具使用示例
 */

import {
  calculateUserPosition,
  calculateAllUsersPositions,
  getPositionByRatio,
  calculateProgressDistance,
  type UserWithPosition,
} from "./route-position";

// 示例数据
const exampleRouteData = [
  [116.397428, 39.90923], // 北京天安门
  [116.407526, 39.90403], // 第二点
  [116.417624, 39.89883], // 第三点
  [116.427722, 39.89363], // 第四点
  [116.43782, 39.88843], // 终点
];

const exampleUserInfoList = [
  {
    id: "1944668554736496642",
    params: {},
    avatar:
      "wxfile://tmp_be1d8acab5b267fedc3c7df68b1568018bba4aa8d9f3cf58bca12e15987f6ff2.jpeg",
    userNickname: "tyl",
    process: 51,
  },
  {
    id: "1946041308949327873",
    params: {},
    avatar: "wxfile://tmp_c3cc44da6adb1a1558293d97e9c59be6.jpg",
    userNickname: "水木清华",
    process: 63,
  },
  {
    id: "1950521478367744001",
    params: {},
    userNickname: "匿名用户",
    process: 15,
  },
  {
    id: "1950544076060844033",
    params: {},
    userNickname: "匿名用户",
    process: 100,
  },
];

const totalDistance = 10; // 假设总距离为10公里

/**
 * 示例1：计算单个用户的位置
 */
export function exampleCalculateSingleUserPosition() {
  console.log("=== 示例1：计算单个用户的位置 ===");

  const user = exampleUserInfoList[0]; // 选择第一个用户（进度51%）
  const position = calculateUserPosition(
    user.process,
    exampleRouteData,
    totalDistance
  );

  console.log(`用户 ${user.userNickname} (进度: ${user.process}%)`);
  console.log("计算得到的坐标位置:", position);
  console.log(
    "已行走距离:",
    calculateProgressDistance(user.process, totalDistance),
    "公里"
  );
  console.log("");
}

/**
 * 示例2：计算所有用户的位置
 */
export function exampleCalculateAllUsersPositions() {
  console.log("=== 示例2：计算所有用户的位置 ===");

  const usersWithPositions = calculateAllUsersPositions(
    exampleUserInfoList,
    exampleRouteData,
    totalDistance
  );

  usersWithPositions.forEach((user: UserWithPosition) => {
    console.log(`用户: ${user.userNickname}`);
    console.log(`进度: ${user.process}%`);
    console.log(
      `位置: [${user.position?.[0]?.toFixed(6)}, ${user.position?.[1]?.toFixed(
        6
      )}]`
    );
    console.log(
      `已行走: ${calculateProgressDistance(user.process, totalDistance).toFixed(
        2
      )} 公里`
    );
    console.log("---");
  });
  console.log("");
}

/**
 * 示例3：根据比例获取位置（适用于动画等场景）
 */
export function exampleGetPositionByRatio() {
  console.log("=== 示例3：根据比例获取位置 ===");

  // 模拟一个动画，从0%到100%
  const ratios = [0, 0.25, 0.5, 0.75, 1.0];

  ratios.forEach((ratio) => {
    const position = getPositionByRatio(exampleRouteData, ratio);
    console.log(`进度比例: ${ratio * 100}%`);
    console.log(
      `位置: [${position?.[0]?.toFixed(6)}, ${position?.[1]?.toFixed(6)}]`
    );
  });
  console.log("");
}

/**
 * 示例4：在Vue组件中的使用
 */
export function exampleVueComponentUsage() {
  console.log("=== 示例4：Vue组件中的使用方法 ===");

  const codeExample = `
// 在Vue组件中的使用示例
import { calculateAllUsersPositions, calculateUserPosition } from '@/utils/route-position';

export default {
  setup() {
    const challengeDetail = ref({});
    const userInfoList = ref([]);
    
    // 计算所有用户位置
    const calculateUsersPositions = () => {
      if (!challengeDetail.value.route || !challengeDetail.value.distance) {
        return [];
      }
      
      return calculateAllUsersPositions(
        userInfoList.value,
        challengeDetail.value.route, // JSON字符串或数组
        challengeDetail.value.distance
      );
    };
    
    // 计算特定用户位置
    const calculateSpecificUserPosition = (userProcess) => {
      return calculateUserPosition(
        userProcess,
        challengeDetail.value.route,
        challengeDetail.value.distance
      );
    };
    
    // 在地图上显示用户位置
    const showUsersOnMap = () => {
      const usersWithPositions = calculateUsersPositions();
      
      usersWithPositions.forEach(user => {
        if (user.position && map) {
          // 在地图上添加用户标记
          const marker = new maplibregl.Marker()
            .setLngLat(user.position)
            .setPopup(new maplibregl.Popup().setHTML(
              \`<div>
                <h3>\${user.userNickname}</h3>
                <p>进度: \${user.process}%</p>
              </div>\`
            ))
            .addTo(map);
        }
      });
    };
    
    return {
      calculateUsersPositions,
      calculateSpecificUserPosition,
      showUsersOnMap
    };
  }
};
  `;

  console.log(codeExample);
}

/**
 * 示例5：处理不同格式的路线数据
 */
export function exampleHandleDifferentRouteFormats() {
  console.log("=== 示例5：处理不同格式的路线数据 ===");

  // 格式1：数组格式
  const routeArray = [
    [116.397428, 39.90923],
    [116.407526, 39.90403],
  ];

  // 格式2：对象格式（lng, lat）
  const routeObjectLngLat = [
    { lng: 116.397428, lat: 39.90923 },
    { lng: 116.407526, lat: 39.90403 },
  ];

  // 格式3：对象格式（longitude, latitude）
  const routeObjectLongLat = [
    { longitude: 116.397428, latitude: 39.90923 },
    { longitude: 116.407526, latitude: 39.90403 },
  ];

  // 格式4：JSON字符串
  const routeJsonString = JSON.stringify(routeArray);

  const testProcess = 50; // 50%进度
  const testDistance = 5; // 5公里

  console.log(
    "数组格式结果:",
    calculateUserPosition(testProcess, routeArray, testDistance)
  );
  console.log(
    "对象格式(lng,lat)结果:",
    calculateUserPosition(testProcess, routeObjectLngLat, testDistance)
  );
  console.log(
    "对象格式(longitude,latitude)结果:",
    calculateUserPosition(testProcess, routeObjectLongLat, testDistance)
  );
  console.log(
    "JSON字符串格式结果:",
    calculateUserPosition(testProcess, routeJsonString, testDistance)
  );
  console.log("");
}

/**
 * 运行所有示例
 */
export function runAllExamples() {
  console.log("🚀 路线位置计算工具使用示例");
  console.log("=====================================");

  exampleCalculateSingleUserPosition();
  exampleCalculateAllUsersPositions();
  exampleGetPositionByRatio();
  exampleVueComponentUsage();
  exampleHandleDifferentRouteFormats();

  console.log("✅ 所有示例运行完成");
}

// 如果直接运行此文件，执行示例
if (typeof window === "undefined") {
  // Node.js 环境
  runAllExamples();
}
