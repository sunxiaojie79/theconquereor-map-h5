import { request } from "../index";

// 挑战项目API接口
export const challengeApi = {
  // 获取挑战项目详情
  getChallenge: (id: string): Promise<any> => {
    return request.get(`/prod-api/wx/app/my/challengeProject/detail/${id}`);
  },
  // 获取用户信息
  getUserInfo: (userId: string): Promise<any> => {
    return request.get(`/prod-api/wx/app/update/userInfo/${userId}`);
  },
};
