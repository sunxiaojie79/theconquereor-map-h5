// API使用示例
import { ref, readonly } from "vue";
import { userApi, sportApi, mapApi, challengeApi } from "@/api/modules";
import { useUserStore } from "@/stores/user";

// 1. 用户登录示例（使用Store）
export async function loginExample() {
  try {
    const response = await userApi.login({
      username: "test@example.com",
      password: "123456",
    });

    // 使用Store保存登录信息
    const userStore = useUserStore();
    userStore.login(response.data.token, response.data.user);

    console.log("登录成功:", response.data);
  } catch (error) {
    console.error("登录失败:", error);
  }
}

// 2. 获取运动记录示例
export async function getSportRecordsExample() {
  try {
    const response = await sportApi.getSportRecords({
      page: 1,
      pageSize: 10,
      type: "running",
    });

    console.log("运动记录:", response.data.list);
    console.log("总数:", response.data.total);
  } catch (error) {
    console.error("获取运动记录失败:", error);
  }
}

// 3. 创建运动记录示例
export async function createSportRecordExample() {
  try {
    const response = await sportApi.createSportRecord({
      type: "running",
      source: "manual",
      distance: "5.0",
      duration: 30,
      calories: 200,
      date: "2025-01-23",
      description: "今天的跑步训练",
    });

    console.log("创建运动记录成功:", response.data);
  } catch (error) {
    console.error("创建运动记录失败:", error);
  }
}

// 4. 获取地图点位示例
export async function getMapPointsExample() {
  try {
    const response = await mapApi.getMapPoints({
      type: "viewpoint",
      unlocked: true,
    });

    console.log("地图点位:", response.data);
  } catch (error) {
    console.error("获取地图点位失败:", error);
  }
}

// 5. 参加挑战项目示例
export async function joinChallengeExample(challengeId: string) {
  try {
    const response = await challengeApi.joinChallenge(challengeId);

    console.log("参加挑战成功:", response.data);
  } catch (error) {
    console.error("参加挑战失败:", error);
  }
}

// 6. Vue Composition API 中的使用示例（集成Store）
export function useApiExample() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const userStore = useUserStore();

  const fetchUserInfo = async () => {
    // 检查登录状态
    if (!userStore.isLoggedIn) {
      error.value = "用户未登录";
      throw new Error("用户未登录");
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await userApi.getUserInfo();
      // 更新Store中的用户信息
      userStore.setUserInfo(response.data);
      return response.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "未知错误";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchSportProgress = async () => {
    // 检查登录状态
    if (!userStore.isLoggedIn) {
      error.value = "用户未登录";
      throw new Error("用户未登录");
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await sportApi.getSportProgress();
      return response.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "未知错误";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading: readonly(loading),
    error: readonly(error),
    userStore,
    fetchUserInfo,
    fetchSportProgress,
  };
}

// 7. 文件上传示例
export async function uploadAvatarExample(file: File) {
  try {
    const response = await userApi.uploadAvatar(file);
    console.log("头像上传成功:", response.data.url);
    return response.data.url;
  } catch (error) {
    console.error("头像上传失败:", error);
    throw error;
  }
}

// 8. 错误处理示例
export async function apiWithErrorHandling() {
  try {
    const response = await sportApi.getSportRecords({
      page: 1,
      pageSize: 10,
    });
    return response.data;
  } catch (error) {
    // 可以根据不同的错误类型进行处理
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        // 未授权，跳转到登录页
        console.log("需要重新登录");
      } else if (error.message.includes("403")) {
        // 权限不足
        console.log("权限不足");
      } else if (error.message.includes("网络")) {
        // 网络错误
        console.log("网络连接异常，请检查网络");
      } else {
        // 其他错误
        console.log("操作失败，请稍后重试");
      }
    }
    throw error;
  }
}
