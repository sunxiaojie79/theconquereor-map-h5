import { request } from "../index";

// 挑战项目API接口
export const challengeApi = {
  // 获取挑战项目详情
  getChallenge: (id: string): Promise<any> => {
    return request.get(`/prod-api/wx/app/my/challengeProject/detail/${id}`);
  },

  // 获取挑战项目列表
  getChallenges: (params?: any): Promise<any> => {
    return request.get("/challenges", { params });
  },

  // 参加挑战项目
  joinChallenge: (id: string): Promise<any> => {
    return request.post(`/challenges/${id}/join`);
  },

  // 获取我的挑战项目
  getMyChallenges: (params?: any): Promise<any> => {
    return request.get("/challenges/my", { params });
  },

  // 提交挑战进度
  submitProgress: (id: string, params: any): Promise<any> => {
    return request.post(`/challenges/${id}/progress`, params);
  },

  // 获取挑战排行榜
  getChallengeLeaderboard: (id: string, params?: any): Promise<any> => {
    return request.get(`/challenges/${id}/leaderboard`, { params });
  },
};
