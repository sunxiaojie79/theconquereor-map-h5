import { request } from "../index";
import type {
  Challenge,
  PageParams,
  PageResponse,
  BaseResponse,
} from "../types";

// 挑战项目API接口
export const challengeApi = {
  // 获取挑战项目列表
  getChallenges: (
    params: PageParams & {
      status?: string;
      keyword?: string;
    }
  ): Promise<BaseResponse<PageResponse<Challenge>>> => {
    return request.get("/challenges", { params });
  },

  // 获取挑战项目详情
  getChallenge: (
    id: string
  ): Promise<
    BaseResponse<
      Challenge & {
        description: string;
        rules: string[];
        rewards: Array<{
          type: string;
          name: string;
          description: string;
          image?: string;
        }>;
        route: {
          coordinates: [number, number][];
          distance: number;
          points: Array<{
            id: string;
            name: string;
            type: string;
            coordinates: [number, number];
            distance: number;
          }>;
        };
      }
    >
  > => {
    return request.get(`/prod-api/wx/app/my/challengeProject/detail/${id}`);
  },

  // 参加挑战项目
  joinChallenge: (
    id: string
  ): Promise<
    BaseResponse<{
      success: boolean;
      userChallenge: {
        id: string;
        challengeId: string;
        userId: string;
        joinDate: string;
        status: "active" | "completed" | "abandoned";
        progress: {
          distance: number;
          percentage: number;
          currentDay: number;
        };
      };
    }>
  > => {
    return request.post(`/challenges/${id}/join`);
  },

  // 退出挑战项目
  leaveChallenge: (id: string): Promise<BaseResponse<null>> => {
    return request.delete(`/challenges/${id}/leave`);
  },

  // 获取我的挑战项目
  getMyChallenges: (params: {
    status?: "active" | "completed" | "abandoned";
  }): Promise<
    BaseResponse<
      Array<{
        id: string;
        challenge: Challenge;
        joinDate: string;
        status: "active" | "completed" | "abandoned";
        progress: {
          distance: number;
          percentage: number;
          currentDay: number;
          remainingDays: number;
        };
        rank?: number;
      }>
    >
  > => {
    return request.get("/challenges/my", { params });
  },

  // 获取挑战排行榜
  getChallengeLeaderboard: (
    id: string,
    params: {
      period?: "all" | "week" | "month";
      limit?: number;
    }
  ): Promise<
    BaseResponse<
      Array<{
        rank: number;
        userId: string;
        username: string;
        avatar: string;
        distance: number;
        percentage: number;
        completedDate?: string;
      }>
    >
  > => {
    return request.get(`/challenges/${id}/leaderboard`, { params });
  },

  // 提交挑战进度
  submitProgress: (
    id: string,
    params: {
      distance: number;
      activityId?: string;
      description?: string;
      photos?: string[];
    }
  ): Promise<
    BaseResponse<{
      newProgress: {
        distance: number;
        percentage: number;
        currentDay: number;
      };
      achievements: Array<{
        type: string;
        name: string;
        description: string;
        image?: string;
      }>;
      unlockedRewards: Array<{
        type: string;
        name: string;
        description: string;
        image?: string;
      }>;
    }>
  > => {
    return request.post(`/challenges/${id}/progress`, params);
  },

  // 获取挑战统计
  getChallengeStats: (
    id: string
  ): Promise<
    BaseResponse<{
      totalParticipants: number;
      completedParticipants: number;
      averageProgress: number;
      topDistance: number;
      dailyStats: Array<{
        date: string;
        newParticipants: number;
        activeParticipants: number;
        totalDistance: number;
      }>;
    }>
  > => {
    return request.get(`/challenges/${id}/stats`);
  },

  // 获取挑战动态
  getChallengeActivities: (
    id: string,
    params: PageParams
  ): Promise<
    BaseResponse<
      PageResponse<{
        id: string;
        userId: string;
        username: string;
        avatar: string;
        type: "join" | "progress" | "complete" | "achievement";
        content: string;
        distance?: number;
        photos?: string[];
        createTime: string;
      }>
    >
  > => {
    return request.get(`/challenges/${id}/activities`, { params });
  },

  // 点赞挑战动态
  likeActivity: (activityId: string): Promise<BaseResponse<null>> => {
    return request.post(`/challenges/activities/${activityId}/like`);
  },

  // 取消点赞
  unlikeActivity: (activityId: string): Promise<BaseResponse<null>> => {
    return request.delete(`/challenges/activities/${activityId}/like`);
  },

  // 评论挑战动态
  commentActivity: (
    activityId: string,
    params: {
      content: string;
    }
  ): Promise<
    BaseResponse<{
      id: string;
      content: string;
      createTime: string;
    }>
  > => {
    return request.post(
      `/challenges/activities/${activityId}/comments`,
      params
    );
  },
};
