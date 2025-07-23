export { challengeApi } from "./challenge";

// 也可以作为默认导出的对象
export default {
  challenge: () => import("./challenge").then((m) => m.challengeApi),
};
