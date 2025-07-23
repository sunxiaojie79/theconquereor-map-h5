// 通用响应类型
export interface BaseResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 分页查询参数
export interface PageParams {
  page: number;
  pageSize: number;
}

// 分页响应数据
export interface PageResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 用户相关类型
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  phone?: string;
  createTime: string;
  updateTime: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  phone?: string;
}

// 运动相关类型
export interface SportRecord {
  id: string;
  type:
    | "swimming"
    | "running"
    | "walking"
    | "cycling"
    | "walking-indoor"
    | "running-indoor";
  source: "wechat" | "manual";
  distance: string;
  duration: number; // 运动时长（分钟）
  calories?: number; // 消耗卡路里
  date: string;
  createTime: string;
}

export interface SportProgress {
  totalDistance: number; // 总距离
  targetDistance: number; // 目标距离
  completedDays: number; // 已完成天数
  targetDays: number; // 目标天数
  distanceProgress: number; // 距离完成百分比
  timeProgress: number; // 时间完成百分比
}

// 地图相关类型
export interface MapPoint {
  id: string;
  name: string;
  type: "start" | "finish" | "viewpoint" | "postcard" | "activity";
  coordinates: [number, number]; // [经度, 纬度]
  description?: string;
  image?: string;
  unlocked: boolean;
}

export interface Route {
  id: string;
  name: string;
  description?: string;
  coordinates: [number, number][];
  distance: number;
  type: string;
}

// 明信片相关类型
export interface Postcard {
  id: string;
  name: string;
  image: string;
  description?: string;
  unlocked: boolean;
  unlockCondition?: string;
}

// 风景点相关类型
export interface Viewpoint {
  id: string;
  name: string;
  image: string;
  description?: string;
  coordinates: [number, number];
  unlocked: boolean;
  unlockCondition?: string;
}

// 挑战项目类型
export interface Challenge {
  id: string;
  title: string;
  description?: string;
  avatar: string;
  targetDistance: number;
  targetDays: number;
  startDate: string;
  endDate: string;
  status: "not_started" | "in_progress" | "completed" | "expired";
  participants: number;
}

// 文件上传响应
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
}
