/**
 * 路线位置计算工具
 * 根据用户进度百分比计算在路线上的坐标位置
 */

// 坐标点类型定义
export interface Coordinate {
  0: number; // 经度
  1: number; // 纬度
}

export interface UserWithPosition {
  id: string;
  userNickname: string;
  process: number;
  avatar?: string;
  params?: any;
  position?: Coordinate | null;
  coordinates?: Coordinate | null;
}

/**
 * 计算两个经纬度坐标之间的距离（使用Haversine公式）
 * @param coord1 第一个坐标点 [经度, 纬度]
 * @param coord2 第二个坐标点 [经度, 纬度]
 * @returns 距离（公里）
 */
export const calculateRealDistance = (
  coord1: Coordinate,
  coord2: Coordinate
): number => {
  const R = 6371; // 地球半径（公里）
  const dLat = ((coord2[1] - coord1[1]) * Math.PI) / 180;
  const dLon = ((coord2[0] - coord1[0]) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1[1] * Math.PI) / 180) *
      Math.cos((coord2[1] * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * 标准化坐标格式
 * @param point 原始坐标点（可能是数组或对象格式）
 * @returns 标准化的坐标数组 [经度, 纬度]
 */
export const normalizeCoordinate = (point: any): Coordinate => {
  if (Array.isArray(point)) {
    return [parseFloat(point[0]), parseFloat(point[1])];
  } else if (point.lng && point.lat) {
    return [parseFloat(point.lng), parseFloat(point.lat)];
  } else if (point.longitude && point.latitude) {
    return [parseFloat(point.longitude), parseFloat(point.latitude)];
  }
  return point;
};

/**
 * 根据用户进度百分比计算在路线上的坐标位置
 * @param userProcess 用户进度百分比 (0-100)
 * @param routeData 路线坐标数据（JSON字符串或坐标数组）
 * @param totalDistance 路线总距离（公里）
 * @returns 计算出的坐标位置 [经度, 纬度] 或 null
 */
export const calculateUserPosition = (
  userProcess: number,
  routeData: string | any[],
  totalDistance: number
): Coordinate | null => {
  try {
    // 获取路线数据
    if (!routeData || !totalDistance) {
      console.warn("路线数据或距离信息不完整");
      return null;
    }

    // 解析路线数据
    let route: any[];
    if (typeof routeData === "string") {
      route = JSON.parse(routeData);
    } else {
      route = routeData;
    }

    if (!route || route.length < 2) {
      console.warn("路线坐标点数量不足");
      return null;
    }

    // 标准化坐标格式
    const coordinates: Coordinate[] = route.map(normalizeCoordinate);

    // 计算目标距离
    const targetDistance = (userProcess / 100) * totalDistance;

    // 如果进度为0或负数，返回起点
    if (targetDistance <= 0) {
      return coordinates[0];
    }

    // 如果进度为100%或超过，返回终点
    if (targetDistance >= totalDistance) {
      return coordinates[coordinates.length - 1];
    }

    // 计算每段的真实距离
    const segmentRealDistances: number[] = [];
    let totalRealDistance = 0;

    for (let i = 0; i < coordinates.length - 1; i++) {
      const realDist = calculateRealDistance(
        coordinates[i],
        coordinates[i + 1]
      );
      segmentRealDistances.push(realDist);
      totalRealDistance += realDist;
    }

    // 计算比例因子（真实距离与设定距离的比例）
    const scaleFactor = totalDistance / totalRealDistance;

    // 根据比例因子调整每段距离
    const adjustedSegmentDistances = segmentRealDistances.map(
      (dist) => dist * scaleFactor
    );

    // 沿路线查找目标位置
    let accumulatedDistance = 0;

    for (let i = 0; i < adjustedSegmentDistances.length; i++) {
      const segmentDistance = adjustedSegmentDistances[i];

      if (accumulatedDistance + segmentDistance >= targetDistance) {
        // 目标点在当前线段内
        const remainingDistance = targetDistance - accumulatedDistance;
        const ratio = remainingDistance / segmentDistance;

        // 线性插值计算精确坐标
        const startCoord = coordinates[i];
        const endCoord = coordinates[i + 1];

        const interpolatedLng =
          startCoord[0] + (endCoord[0] - startCoord[0]) * ratio;
        const interpolatedLat =
          startCoord[1] + (endCoord[1] - startCoord[1]) * ratio;

        return [interpolatedLng, interpolatedLat];
      }

      accumulatedDistance += segmentDistance;
    }

    // 如果没有找到，返回终点
    return coordinates[coordinates.length - 1];
  } catch (error) {
    console.error("计算用户位置时出错:", error);
    return null;
  }
};

/**
 * 根据用户信息列表计算所有用户的位置
 * @param userInfoList 用户信息列表
 * @param routeData 路线坐标数据
 * @param totalDistance 路线总距离
 * @returns 包含位置信息的用户数组
 */
export const calculateAllUsersPositions = (
  userInfoList: any[],
  routeData: string | any[],
  totalDistance: number
): UserWithPosition[] => {
  try {
    if (!userInfoList || userInfoList.length === 0) {
      console.warn("用户信息列表为空");
      return [];
    }

    const usersPositions = userInfoList.map((user) => {
      const position = calculateUserPosition(
        user.process,
        routeData,
        totalDistance
      );
      return {
        ...user,
        position: position,
        coordinates: position, // 添加coordinates字段方便使用
      };
    });

    console.log("所有用户位置计算完成:", usersPositions);
    return usersPositions;
  } catch (error) {
    console.error("计算所有用户位置时出错:", error);
    return [];
  }
};

/**
 * 根据距离比例获取路线上的坐标点
 * @param routeData 路线坐标数据
 * @param distanceRatio 距离比例 (0-1)
 * @returns 坐标位置 [经度, 纬度] 或 null
 */
export const getPositionByRatio = (
  routeData: string | any[],
  distanceRatio: number
): Coordinate | null => {
  // 将比例转换为百分比，然后使用总距离为1来计算
  return calculateUserPosition(distanceRatio * 100, routeData, 1);
};

/**
 * 计算用户相对于起点的进度距离
 * @param userProcess 用户进度百分比
 * @param totalDistance 路线总距离
 * @returns 进度距离（公里）
 */
export const calculateProgressDistance = (
  userProcess: number,
  totalDistance: number
): number => {
  return (userProcess / 100) * totalDistance;
};
