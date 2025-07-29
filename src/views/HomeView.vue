<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <!-- 地图容器 -->
    <div id="map" ref="mapContainer" class="w-full h-full"></div>

    <div
      class="absolute top-[586px] right-[16px] z-10 w-[32px] h-[32px] flex items-center justify-center"
      @click="setLayers"
    >
      <img
        class="w-[20px] h-[21px] object-cover"
        src="@/assets/stack-fill.png"
        alt=""
      />
    </div>
    <!-- 浮动面板 -->
    <FloatingPanel
      :anchors="anchors"
      :initial-position="0"
      :content-draggable="true"
      @change="handlePanelChange"
      @height-change="handleHeightChange"
    >
      <!-- 头部区域 -->
      <template #header>
        <!-- 项目标题区域 -->
        <div
          class="absolute -top-[40px] left-[16px] w-[343px] h-[76px] border-[2px] border-[#242A36] rounded-[8px] flex items-center px-[12px] py-[14px] bg-[#fff] z-10"
        >
          <div
            class="w-[48px] h-[48px] rounded-full overflow-hidden mr-[9px] flex-shrink-0"
          >
            <img
              :src="imgBaseUrl + challengeDetail.productCover"
              alt="项目头像"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1">
            <h3
              class="text-[17px] font-[500] text-[rgba(0, 0, 0, 0.85)] mb-[4px]"
            >
              {{ challengeDetail.challengeTitle }}
            </h3>
            <div
              class="flex items-center text-[14px] text-[rgba(0, 0, 0, 0.65)]"
            >
              <span class="flex items-center mr-[16px]"
                >目标距离(公里)
                <span class="text-[#7B412D] text-[17px] font-[600] ml-[4px]">{{
                  challengeDetail.distance
                }}</span></span
              >
              <!-- <span class="flex items-center"
                >目标时间(天)
                <span class="text-[#00778A] text-[17px] font-[600] ml-[4px]">{{
                  challengeDetail.days || "暂无"
                }}</span></span
              > -->
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <div class="w-full h-full overflow-y-auto">
          <!-- 进度卡片区域 -->
          <div
            class="w-full h-[184px] p-[16px] flex justify-between mb-[8px] bg-[#fff]"
          >
            <div
              class="w-[80px] h-[152px] flex flex-col justify-between mr-[12px]"
            >
              <!-- 里程进度卡片 -->
              <div
                class="flex flex-col items-center justify-center bg-[#7B412D] w-[80px] h-[72px] rounded-[4px] text-white"
              >
                <div class="text-[14px] opacity-95">里程</div>
                <div class="text-[22px] font-[600]">
                  {{ challengeDetail.process }}%
                </div>
              </div>

              <!-- 时间进度卡片 -->
              <div
                class="flex flex-col items-center justify-center bg-[#00778A] w-[80px] h-[72px] rounded-[4px] text-white"
              >
                <div class="text-[14px] opacity-95">时间</div>
                <div class="text-[22px] font-[600]">
                  {{ challengeDetail.durationDays || 0 }} days
                </div>
              </div>
            </div>
            <div class="h-full flex-1 flex flex-col justify-between">
              <!-- 进度条 -->
              <div class="w-full h-[36px] flex flex-col justify-between">
                <div class="flex items-center">
                  <img
                    src="@/assets/position.png"
                    alt="里程"
                    class="w-[12px] h-[16px] mr-[10px] ml-[2px]"
                  />
                  <van-progress
                    class="w-full"
                    color="#7B412D"
                    :percentage="challengeDetail.process"
                    :show-pivot="false"
                    stroke-width="8"
                  />
                </div>
                <!-- <div class="flex items-center">
                  <img
                    src="@/assets/time.png"
                    alt="时间"
                    class="w-[14px] h-[14px] mr-[10px] ml-[2px]"
                  />
                  <van-progress
                    class="w-full"
                    color="#00778A"
                    :percentage="challengeDetail.timeProgress || 0"
                    :show-pivot="false"
                    stroke-width="8"
                  />
                </div> -->
              </div>
              <!-- 详细进度信息 -->
              <div class="w-full h-[68px] flex flex-row justify-between">
                <!-- 已完成 -->
                <div class="flex-1 flex flex-col justify-between">
                  <span class="text-[rgba(0, 0, 0, 0.65)] text-[14px]"
                    >已完成</span
                  >
                  <div class="text-[17px] font-[600] text-[#7B412D]">
                    {{
                      (
                        (challengeDetail.process / 100) *
                        challengeDetail.distance
                      ).toFixed(2) || ""
                    }}
                    <span class="text-[12px] ml-[2px]">km</span>
                  </div>
                  <!-- <div class="text-[17px] font-[600] text-[#00778A]">
                    {{ challengeDetail.completedDays || "" }}
                    <span class="text-[12px] ml-[2px]">days</span>
                  </div> -->
                </div>

                <!-- 剩余 -->
                <div class="flex-1 flex flex-col justify-between">
                  <span class="text-[rgba(0, 0, 0, 0.65)] text-[14px]"
                    >剩余</span
                  >
                  <div class="text-[17px] font-[600] text-[#7B412D]">
                    {{
                      (
                        challengeDetail.distance -
                        (challengeDetail.process / 100) *
                          challengeDetail.distance
                      ).toFixed(2)
                    }}
                    <span class="text-[12px] ml-[2px]">km</span>
                  </div>
                  <!-- <div class="text-[17px] font-[600] text-[#00778A]">
                    {{
                      challengeDetail.days - challengeDetail.completedDays || ""
                    }}
                    <span class="text-[12px] ml-[2px]">days</span>
                  </div> -->
                </div>
              </div>

              <!-- 运动图标 -->
              <div class="flex justify-start mt-[12px]">
                <div
                  v-if="activityRecordListMap['游泳']"
                  class="w-[24px] h-[24px] bg-[#FADB47] rounded-[4px] flex items-center justify-center mr-[4px]"
                >
                  <img
                    src="@/assets/icon-swimming.png"
                    alt="游泳"
                    class="w-[20px] h-[13px]"
                  />
                </div>
                <div
                  v-if="activityRecordListMap['骑行']"
                  class="w-[24px] h-[24px] bg-[#FADB47] rounded-[4px] flex items-center justify-center mr-[4px]"
                >
                  <img
                    src="@/assets/icon-cycling.png"
                    alt="骑行"
                    class="w-[18px] h-[16px]"
                  />
                </div>
                <div
                  v-if="activityRecordListMap['步行']"
                  class="w-[24px] h-[24px] bg-[#FADB47] rounded-[4px] flex items-center justify-center mr-[4px]"
                >
                  <img
                    src="@/assets/icon-walking.png"
                    alt="步行"
                    class="w-[13px] h-[20px]"
                  />
                </div>
                <div
                  v-if="activityRecordListMap['室内步行']"
                  class="w-[24px] h-[24px] bg-[#FADB47] rounded-[4px] flex items-center justify-center mr-[4px]"
                >
                  <img
                    src="@/assets/icon-walking-indoor.png"
                    alt="室内步行"
                    class="w-[19px] h-[15px]"
                  />
                </div>
                <div
                  v-if="activityRecordListMap['跑步']"
                  class="w-[24px] h-[24px] bg-[#FADB47] rounded-[4px] flex items-center justify-center mr-[4px]"
                >
                  <img
                    src="@/assets/icon-running.png"
                    alt="跑步"
                    class="w-[16px] h-[19px]"
                  />
                </div>
                <div
                  v-if="activityRecordListMap['室内跑步']"
                  class="w-[24px] h-[24px] bg-[#FADB47] rounded-[4px] flex items-center justify-center mr-[4px]"
                >
                  <img
                    src="@/assets/icon-running-indoor.png"
                    alt="室内跑步"
                    class="w-[19px] h-[15px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 我的旅程模块 -->
          <div class="bg-[#fff] w-full p-[16px] mb-[8px]">
            <h3 class="text-[17px] text-[#242A36] font-[500] mb-[12px]">
              我的旅程
            </h3>
            <div class="relative">
              <div
                class="w-full h-[160px] bg-[linear-gradient(180deg,#EBEBED_0%,rgba(235,235,237,0)_100%)] rounded-t-[4px]"
              ></div>
              <div
                class="w-full h-[80px] bg-[linear-gradient(180deg,rgba(235,235,237,0.65)_0%,rgba(235,235,237,0.3)_100%)] rounded-b-[4px]"
              ></div>
              <div
                ref="scrollContainer"
                class="w-full absolute top-[24px] left-[0px] pl-[120px] pr-[140px] h-[223px] overflow-x-scroll flex"
                @scroll="handleScroll"
              >
                <div class="h-[223px] w-auto flex">
                  <div v-for="item in activityList" :key="item.id">
                    <div v-if="item.type === 'number'">
                      <!-- 号码牌 -->
                      <div
                        class="w-[120px] h-[80px] mx-[12px] mt-[45px]"
                        data-snap-center
                      >
                        <img
                          src="@/assets/number-plate.png"
                          alt="号码牌"
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div v-if="item.type === 'start'" data-snap-center>
                      <!-- 开始 -->
                      <div class="w-[100px] h-[156px] mt-[8px]">
                        <img
                          src="@/assets/start.png"
                          alt=" 开始"
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div v-else-if="item.type === 'end'" data-snap-center>
                      <!-- 结束 -->
                      <div class="w-[100px] h-[145px] mt-[13px]">
                        <img
                          src="@/assets/finish.png"
                          alt="结束"
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div v-else-if="item.type === 'activity'" data-snap-center>
                      <!-- 活动 -->
                      <ActiveCard
                        :name="item.name"
                        :type="item.challengeType"
                        :distance="item.distance"
                        :date="item.duration"
                      />
                    </div>
                    <div v-else-if="item.type === '0'" data-snap-center>
                      <!-- 风景点 -->
                      <div class="w-[170px] h-[140px] mt-[16px]">
                        <img
                          src="@/assets/view.png"
                          alt="风景点"
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div v-else-if="item.type === '1'" data-snap-center>
                      <!-- 明信片 -->
                      <div class="w-[84px] h-[171px]">
                        <img
                          src="@/assets/post-card.png"
                          alt="明信片"
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div v-else-if="item.type === 'arrow'">
                      <!-- 箭头 -->
                      <ArrowCard :distance="item.distance" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col items-center justify-center mt-[12px] w-[64px] h-[40px] absolute bottom-[0] right-[50%] translate-x-[50%]"
              >
                <img
                  src="@/assets/icon-top.png"
                  alt="顶部"
                  class="w-[12px] h-[16px] object-cover"
                />
                <span class="text-[17px] text-[#7B412D]"
                  >{{ currentCenterItem.distanceToEnd }}km</span
                >
              </div>
            </div>
          </div>

          <!-- 成就奖励模块 -->
          <div class="bg-white p-[16px] w-full mb-[8px]">
            <h3 class="text-[17px] text-[#242A36] font-[500] mb-[12px]">
              成就奖励
            </h3>
            <div class="flex flex-col h-[727px]">
              <!-- 解锁明信片 -->
              <div
                class="w-full h-[204px] flex flex-col py-[16px] justify-between mb-[12px]"
              >
                <div
                  class="flex flex-col justify-between items-center h-[48px]"
                >
                  <span class="text-[17px] text-[#242A36] font-[500]"
                    >{{ finishedPostList.length }}/{{
                      totalPostList.length
                    }}解锁明信片</span
                  >
                  <span class="text-[14px] text-[#242A36]"
                    >你已解锁{{ finishedPostList.length }}张明信片</span
                  >
                </div>
                <div class="h-[100px] flex flex-row overflow-x-auto">
                  <div
                    v-for="item in finishedPostList"
                    :key="item.id"
                    class="w-[140px] h-[100px]"
                  >
                    <PostCard
                      class="scale-[0.3] rotate-[-15deg] translate-x-[-100px] translate-y-[-70px]"
                      @click="handlePostCardClick(item)"
                    />
                  </div>
                </div>
              </div>

              <!-- 解锁风景点 -->
              <div
                class="w-full h-[182px] py-[24px] flex flex-col justify-between mb-[12px]"
              >
                <div
                  class="flex flex-col justify-between items-center h-[48px]"
                >
                  <span class="text-[17px] text-[#242A36] font-[500]"
                    >{{ finishedViewList.length }}/{{
                      totalViewList.length
                    }}解锁风景点</span
                  >
                  <span class="text-[14px] text-[#242A36]"
                    >你已解锁{{ finishedViewList.length }}个风景点</span
                  >
                </div>
                <div class="w-full h-[70px] flex flex-row overflow-x-auto">
                  <div
                    v-for="item in finishedViewList"
                    :key="item.id"
                    class="w-[133px] h-[70px] mr-[16px]"
                  >
                    <ViewCard
                      :name="item.title"
                      :image="item.image"
                      @click="handleScenicSpotClick(item)"
                    />
                  </div>
                </div>
              </div>

              <!-- 号码牌模块 -->
              <div
                class="w-full h-[317px] py-[24px] flex flex-col justify-between items-center"
              >
                <h3 class="text-[17px] text-[#242A36] font-[500]">号码牌</h3>
                <div
                  class="w-full h-[229px] bg-[url('@/assets/number-bg.png')] bg-cover flex items-center justify-center"
                >
                  <div
                    class="w-[240px] h-[160px] bg-[url('@/assets/number-card.png')] bg-cover flex items-center justify-center"
                  >
                    <div
                      class="w-[165px] h-[73px] bg-[#fff] text-[52px] font-[600]"
                    >
                      99999
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 运动动态模块 -->
          <div class="bg-white p-[16px] w-full mb-[8px]">
            <h3 class="text-[17px] font-[500] text-[#242A36] mb-[12px]">
              运动动态
            </h3>
            <SportCard
              v-for="item in sportList"
              :key="item.id"
              :type="item.challengeType"
              :source="item.source || '手动录入'"
              :distance="item.distance"
              :time="item.duration"
            />
          </div>
        </div>
      </template>
    </FloatingPanel>

    <van-action-sheet v-model:show="showLayers">
      <div class="h-[430px]">
        <div class="px-[16px] py-[24px]">
          <div class="text-[17px] font-[500] mb-[12px]">地图类型</div>
          <div
            class="w-[200px] h-[84px] flex flex-row items-center justify-between"
          >
            <div
              class="w-[96px] h-[84px] flex flex-col items-center justify-between"
              @click="toggleMapStyle(1)"
            >
              <img
                src="@/assets/map-style.png"
                alt=""
                :class="isSatellite === 1 ? 'opacity-100' : 'opacity-50'"
              />
              <span>标准地图</span>
            </div>
            <div
              class="w-[96px] h-[84px] flex flex-col items-center justify-between"
              @click="toggleMapStyle(2)"
            >
              <img
                src="@/assets/map-style.png"
                alt=""
                :class="isSatellite === 2 ? 'opacity-100' : 'opacity-50'"
              />
              <span>卫星地图</span>
            </div>
          </div>
        </div>
        <div class="px-[16px] mb-[24px]">
          <div class="text-[17px] font-[500] mb-[12px]">人群选择</div>
          <div class="w-[343px] h-[112px] flex flex-col items-center">
            <div
              class="w-[343px] h-[56px] flex flex-row items-center justify-between border-b border-gray-200"
            >
              <span class="text-[17px]">所有人</span>
              <div class="w-[24px] h-[24px]" @click="handleCellClick(1)">
                <img
                  v-if="activeCell === 1"
                  src="@/assets/cell-on.png"
                  alt=""
                />
                <img v-else src="@/assets/cell-off.png" alt="" />
              </div>
            </div>
            <div
              class="w-[343px] h-[56px] flex flex-row items-center justify-between border-b border-gray-200"
            >
              <span class="text-[17px]">我/我的团队</span>
              <div class="w-[24px] h-[24px]" @click="handleCellClick(2)">
                <img
                  v-if="activeCell === 2"
                  src="@/assets/cell-on.png"
                  alt=""
                />
                <img v-else src="@/assets/cell-off.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row p-[16px] justify-between">
          <div
            class="w-[139px] h-[40px] rounded-[4px] border border-[#000000] text-[17px] text-[#242A36] flex items-center justify-center"
          >
            取消
          </div>
          <div
            class="w-[196px] h-[40px] rounded-[4px] bg-[#FADB47] text-[17px] text-[#242A36] flex items-center justify-center"
          >
            确认
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import FloatingPanel from "../components/FloatingPanel.vue";
import PostCard from "../components/PostCard.vue";
import ViewCard from "../components/ViewCard.vue";
import SportCard from "../components/SportCard.vue";
import ActiveCard from "../components/ActiveCard.vue";
import ArrowCard from "../components/ArrowCard.vue";
// 导入API模块
import { challengeApi } from "@/api/modules";
import { imgBaseUrl, mapConfig } from "@/config";
// 导入Store
import { useUserStore } from "@/stores/user";
// 导入起点终点图标
import startIcon from "@/assets/start.png";
import finishIcon from "@/assets/finish.png";
const route = useRoute();
const challengeDetail = ref({});
const activityRecordListMap = {};
const activityList = ref([]);
const pureActivityList = ref([]);
const finishedPostList = ref([]);
const totalPostList = ref([]);
const finishedViewList = ref([]);
const totalViewList = ref([]);
const sportList = ref([]);
const mapContainer = ref(null);
const scrollContainer = ref(null);
const isSatellite = ref(1);
const showLayers = ref(false);
const activeCell = ref(1);

// 初始化Store
const userStore = useUserStore();
// 定义锚点位置
const anchors = [
  200,
  // Math.round(0.6 * window.innerHeight),
  Math.round(0.8 * window.innerHeight),
];

const handlePanelChange = (position) => {
  console.log("Panel position changed:", position);
};

const handleHeightChange = (height) => {
  console.log("Panel height changed:", height);
};

let map;
let mapReady = false; // 地图是否已准备好
let dataReady = false; // 数据是否已准备好
let isRestoringData = false; // 防止循环调用标志
let hasInitialLoad = false; // 是否已完成初始加载

const toggleMapStyle = (index) => {
  if (index === isSatellite.value) {
    return;
  }
  isSatellite.value = index;

  // 重置初始加载标志，允许在样式切换后重新加载数据
  hasInitialLoad = false;

  map.setStyle(
    isSatellite.value === 2
      ? mapConfig.styles.satellite
      : mapConfig.styles.street
  );
};

// 回显路线数据到地图
const restoreLines = (route) => {
  console.log("开始回显路线数据", route);

  if (!map || !route || route.length === 0) {
    console.warn("地图未初始化或路线数据为空");
    return;
  }

  // 移除现有的路线图层和数据源
  try {
    if (map.getLayer("route-line")) {
      console.log("移除现有路线图层");
      map.removeLayer("route-line");
    }
    if (map.getSource("route")) {
      console.log("移除现有路线数据源");
      map.removeSource("route");
    }
  } catch (error) {
    console.warn("移除现有路线图层时出错:", error);
  }

  // 转换路线数据格式 - 假设route是坐标点数组 [[lng, lat], [lng, lat], ...]
  const coordinates = route.map((point) => {
    // 处理不同的数据格式
    if (Array.isArray(point)) {
      return [parseFloat(point[0]), parseFloat(point[1])];
    } else if (point.lng && point.lat) {
      return [parseFloat(point.lng), parseFloat(point.lat)];
    } else if (point.longitude && point.latitude) {
      return [parseFloat(point.longitude), parseFloat(point.latitude)];
    }
    return point;
  });

  console.log("转换后的路线坐标", coordinates);

  // 添加路线数据源
  try {
    if (!map.getSource("route")) {
      console.log("添加路线数据源");
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {
            name: "挑战路线",
          },
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      });
    }

    // 添加路线图层
    if (!map.getLayer("route-line")) {
      console.log("添加路线图层");
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#7B412D", // 使用主题色
          "line-width": 4,
          "line-opacity": 0.8,
        },
      });
    }
  } catch (error) {
    console.error("添加路线图层时出错:", error);
  }

  console.log("路线数据回显完成");
};

// 回显景点数据到地图
const restorePoints = (scenicSpotList) => {
  console.log("开始回显景点数据", scenicSpotList);

  if (!map || !scenicSpotList || scenicSpotList.length === 0) {
    console.warn("地图未初始化或景点数据为空");
    return;
  }

  // 清除现有的景点标记
  if (window.scenicMarkers) {
    window.scenicMarkers.forEach((marker) => marker.remove());
  }
  window.scenicMarkers = [];

  // 移除现有的景点图层和数据源（注意顺序：先移除图层，再移除数据源）
  try {
    // 移除景点标签图层
    if (map.getLayer("scenic-labels")) {
      console.log("移除景点标签图层");
      map.removeLayer("scenic-labels");
    }

    // 移除景点圆点图层
    if (map.getLayer("scenic-points")) {
      console.log("移除景点圆点图层");
      map.removeLayer("scenic-points");
    }

    // 移除数据源
    if (map.getSource("scenic-points")) {
      console.log("移除景点数据源");
      map.removeSource("scenic-points");
    }
  } catch (error) {
    console.warn("移除现有景点图层时出错:", error);
  }

  // 准备景点数据
  const features = scenicSpotList.map((point, index) => {
    let coordinates;

    // 处理不同的数据格式
    if (Array.isArray(point)) {
      coordinates = [parseFloat(point[0]), parseFloat(point[1])];
    } else if (point.lng && point.lat) {
      coordinates = [parseFloat(point.lng), parseFloat(point.lat)];
    } else if (point.longitude && point.latitude) {
      coordinates = [parseFloat(point.longitude), parseFloat(point.latitude)];
    } else {
      coordinates = point;
    }

    return {
      type: "Feature",
      properties: {
        id: index,
        name: point.name || `景点${index + 1}`,
        description: point.description || "",
      },
      geometry: {
        type: "Point",
        coordinates: coordinates,
      },
    };
  });

  console.log("转换后的景点数据", features);

  // 添加景点数据源和图层
  try {
    // 添加景点数据源
    if (!map.getSource("scenic-points")) {
      console.log("添加景点数据源");
      map.addSource("scenic-points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: features,
        },
      });
    }

    // 添加景点圆点图层
    if (!map.getLayer("scenic-points")) {
      console.log("添加景点圆点图层");
      map.addLayer({
        id: "scenic-points",
        type: "circle",
        source: "scenic-points",
        paint: {
          "circle-radius": 8,
          "circle-color": "#FADB47", // 使用主题黄色
          "circle-stroke-width": 2,
          "circle-stroke-color": "#7B412D", // 使用主题棕色
        },
      });
    }

    // 添加景点标签图层
    if (!map.getLayer("scenic-labels")) {
      console.log("添加景点标签图层");
      map.addLayer({
        id: "scenic-labels",
        type: "symbol",
        source: "scenic-points",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Open Sans Regular"],
          "text-offset": [0, 1.5],
          "text-anchor": "top",
          "text-size": 12,
        },
        paint: {
          "text-color": "#00778A",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
        },
      });
    }
  } catch (error) {
    console.error("添加景点图层时出错:", error);
  }

  // 移除现有的事件监听器（避免重复绑定）
  try {
    map.off("click", "scenic-points");
    map.off("mouseenter", "scenic-points");
    map.off("mouseleave", "scenic-points");
  } catch (error) {
    // 忽略错误，因为图层可能不存在
  }

  // 为每个景点添加点击事件
  map.on("click", "scenic-points", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["scenic-points"],
    });

    if (features.length > 0) {
      const feature = features[0];
      const coordinates = feature.geometry.coordinates.slice();
      const { name, description } = feature.properties;

      // 创建弹窗
      new maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `
          <div class="scenic-popup">
            <h3 style="margin: 0 0 8px 0; color: #7B412D; font-size: 16px;">${name}</h3>
            ${
              description
                ? `<p style="margin: 0; color: #666; font-size: 14px;">${description}</p>`
                : ""
            }
          </div>
        `
        )
        .addTo(map);
    }
  });

  // 鼠标悬停效果
  map.on("mouseenter", "scenic-points", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "scenic-points", () => {
    map.getCanvas().style.cursor = "";
  });

  console.log("景点数据回显完成");
};
// 跳转景点详情
const handleScenicSpotClick = (item) => {
  console.log("跳转景点详情", item);
};
// 跳转游记详情
const handlePostCardClick = (item) => {
  console.log("跳转游记详情", item);
// 添加路线起点和终点标记
const addStartMarker = async (route) => {
  console.log("开始添加起点和终点标记", route);
  let image = await map.loadImage(startIcon);
  map.addImage("start-icon", image.data);
  map.addSource("start-point", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [route[0][0], route[0][1]],
          },
        },
      ],
    },
  });
  map.addLayer({
    id: "start-points",
    type: "symbol",
    source: "start-point",
    layout: {
      "icon-image": "start-icon",
      "icon-size": 0.2,
      "icon-anchor": "bottom",
    },
  });
  console.log("添加起点和终点标记完成");
};
const addEndMarker = async (route) => {
  console.log("开始添加起点和终点标记", route);
  let image = await map.loadImage(finishIcon);
  map.addImage("end-icon", image.data);
  map.addSource("end-point", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              route[route.length - 1][0],
              route[route.length - 1][1],
            ],
          },
        },
      ],
    },
  });
  map.addLayer({
    id: "end-points",
    type: "symbol",
    source: "end-point",
    layout: {
      "icon-image": "end-icon",
      "icon-size": 0.2,
      "icon-anchor": "bottom",
    },
  });
  console.log("添加起点和终点标记完成");
};
// 自动调整地图视野以适应所有数据
const fitMapView = () => {
  console.log("开始调整地图视野");

  if (!map) {
    console.warn("地图未初始化");
    return;
  }

  // 设置标志，防止视野调整触发循环
  const wasRestoringData = isRestoringData;
  isRestoringData = true;

  // 收集所有坐标点
  const allCoordinates = [];

  // 添加路线坐标（包括起点终点）
  if (challengeDetail.value.route) {
    const route = JSON.parse(challengeDetail.value.route);
    route.forEach((point) => {
      let coordinates;
      if (Array.isArray(point)) {
        coordinates = [parseFloat(point[0]), parseFloat(point[1])];
      } else if (point.lng && point.lat) {
        coordinates = [parseFloat(point.lng), parseFloat(point.lat)];
      } else if (point.longitude && point.latitude) {
        coordinates = [parseFloat(point.longitude), parseFloat(point.latitude)];
      } else {
        coordinates = point;
      }
      allCoordinates.push(coordinates);
    });
  }

  // 添加景点坐标
  if (challengeDetail.value.scenicSpotList) {
    challengeDetail.value.scenicSpotList.forEach((item) => {
      const point = JSON.parse(item.coordinatePoint);
      let coordinates;
      if (Array.isArray(point)) {
        coordinates = [parseFloat(point[0]), parseFloat(point[1])];
      } else if (point.lng && point.lat) {
        coordinates = [parseFloat(point.lng), parseFloat(point.lat)];
      } else if (point.longitude && point.latitude) {
        coordinates = [parseFloat(point.longitude), parseFloat(point.latitude)];
      } else {
        coordinates = point;
      }
      allCoordinates.push(coordinates);
    });
  }

  console.log("所有坐标点", allCoordinates);

  if (allCoordinates.length === 0) {
    console.warn("没有坐标数据，无法调整视野");
    return;
  }

  if (allCoordinates.length === 1) {
    // 只有一个点，直接定位到该点
    map.flyTo({
      center: allCoordinates[0],
      zoom: 15,
      duration: 2000,
    });
  } else {
    // 计算边界
    const bounds = new maplibregl.LngLatBounds();

    allCoordinates.forEach((coord) => {
      bounds.extend(coord);
    });

    // 调整地图视野
    map.fitBounds(bounds, {
      padding: {
        top: 50,
        bottom: 300, // 为底部面板留出空间
        left: 50,
        right: 50,
      },
      duration: 2000, // 动画时长
      maxZoom: 16, // 最大缩放级别
    });
  }

  console.log("地图视野调整完成");

  // 恢复标志状态
  isRestoringData = wasRestoringData;
};

// 检查地图和数据是否都准备好，如果是则回显数据
const checkAndRestoreData = () => {
  console.log("检查数据回显条件:");
  console.log("- mapReady:", mapReady);
  console.log("- dataReady:", dataReady);
  console.log("- challengeDetail存在:", !!challengeDetail.value);

  if (mapReady && dataReady && challengeDetail.value) {
    console.log("✅ 地图和数据都准备好，开始回显");
    setTimeout(() => {
      restoreMapData();
    }, 300);
  } else {
    console.log("❌ 等待条件满足...");
  }
};

const initMap = () => {
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: mapConfig.styles.street,
    center: mapConfig.defaultCenter,
    zoom: mapConfig.defaultZoom,
  });

  map.on("load", async () => {
    console.log("地图加载完成");
    mapReady = true;
    checkAndRestoreData();
    // addStartEndMarkers()
  });

  map.on("styledata", () => {
    console.log("地图样式加载完成");

    // 避免在数据回显过程中循环调用
    if (isRestoringData) {
      console.log("正在回显数据，跳过此次样式变更");
      return;
    }

    // 只在初始加载或用户切换地图样式时回显数据
    // if (mapReady && dataReady && !hasInitialLoad) {
    //   console.log("地图样式加载，开始回显数据");
    //   hasInitialLoad = true;
    //   setTimeout(() => {
    //     restoreMapData();
    //   }, 200);
    // } else if (mapReady && dataReady && hasInitialLoad) {
    //   console.log("地图样式变更，数据已加载，跳过回显");
    // }
  });
};

const setLayers = () => {
  console.log("setLayer");
  showLayers.value = true;
};

const handleCellClick = (index) => {
  console.log("handleCellClick", index);
  activeCell.value = index;
};

// 滚动相关变量
let scrollTimer = null;
let isAutoScrolling = false;

// 当前居中的item数据
const currentCenterItem = ref({
  distanceToEnd: 0,
});

// 处理滚动事件
const handleScroll = () => {
  if (isAutoScrolling) return; // 如果正在自动滚动，忽略滚动事件

  // 清除之前的定时器
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }

  // 设置新的定时器，300ms后执行居中逻辑
  scrollTimer = setTimeout(() => {
    centerNearestItem();
  }, 300);
};

// 获取当前居中的item
const getCurrentCenterItem = () => {
  if (!scrollContainer.value) return null;

  const container = scrollContainer.value;
  const containerRect = container.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;

  const innerContainer = container.querySelector(".h-\\[223px\\].w-auto.flex");
  if (!innerContainer) return null;

  const items = innerContainer.querySelectorAll("[data-snap-center]");

  let nearestItem = null;
  let minDistance = Infinity;

  items.forEach((item) => {
    const itemRect = item.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2;
    const distance = Math.abs(itemCenter - containerCenter);

    if (distance < minDistance) {
      minDistance = distance;
      nearestItem = item;
    }
  });

  if (nearestItem) {
    const itemIndex = Array.from(items).indexOf(nearestItem);
    if (itemIndex >= 0 && itemIndex < activityList.value.length) {
      return {
        item: activityList.value[itemIndex],
        index: itemIndex,
        element: nearestItem,
      };
    }
  }

  return null;
};

// 让最接近中心的元素居中
const centerNearestItem = () => {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  const containerRect = container.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;

  // 获取所有可滚动的子元素
  const innerContainer = container.querySelector(".h-\\[223px\\].w-auto.flex");
  if (!innerContainer) return;

  const allItems = Array.from(innerContainer.children);

  // 获取所有标记为可居中的元素
  const items = innerContainer.querySelectorAll("[data-snap-center]");

  let nearestItem = null;
  let minDistance = Infinity;

  // 找到距离容器中心最近的元素
  items.forEach((item) => {
    const itemRect = item.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2;
    const distance = Math.abs(itemCenter - containerCenter);

    if (distance < minDistance) {
      minDistance = distance;
      nearestItem = item;
    }
  });

  if (nearestItem) {
    // 计算需要滚动的距离
    const nearestRect = nearestItem.getBoundingClientRect();
    const nearestCenter = nearestRect.left + nearestRect.width / 2;
    const scrollLeft = container.scrollLeft + (nearestCenter - containerCenter);

    // 获取当前居中元素对应的activityList数据
    const itemIndex = Array.from(items).indexOf(nearestItem);
    if (itemIndex >= 0 && itemIndex < pureActivityList.value.length) {
      currentCenterItem.value = pureActivityList.value[itemIndex];
    }

    // 执行平滑滚动到计算出的位置
    isAutoScrolling = true;

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });

    // 滚动完成后重置标志
    setTimeout(() => {
      isAutoScrolling = false;
    }, 500); // 给足够时间完成滚动动画
  }
};
// 获取活动列表
const getActivityList = (activityRecordList, scenicSpotList, distance) => {
  console.log("获取活动列表", activityRecordList, scenicSpotList);
  activityRecordList.forEach((item, index) => {
    item.type = "activity";
    item.name = "活动" + (index + 1);
    item.completionProgress =
      (item.distance / distance) * 100 > 100
        ? 100
        : (item.distance / distance) * 100;
  });
  const tempScenicSpotList = scenicSpotList.filter((item) => {
    return item.type !== "3";
  });
  const tempActivityList = [
    { type: "start", completionProgress: 0, distance: 0 },
    ...activityRecordList,
    ...tempScenicSpotList,
    { type: "end", completionProgress: 100, distance: distance },
  ].sort((a, b) => a.completionProgress - b.completionProgress);
  activityList.value = tempActivityList.flatMap((item, index) => [
    item,
    {
      type: "arrow",
      distance: 0,
    },
  ]);
  activityList.value.pop();
  for (let i = 0; i < activityList.value.length; i++) {
    if (activityList.value[i].type === "arrow") {
      activityList.value[i].distance = (
        ((activityList.value[i + 1].completionProgress -
          activityList.value[i - 1].completionProgress) *
          distance) /
        100
      ).toFixed(2);
    }
  }
  activityList.value.unshift({
    type: "number",
    completionProgress: 0,
    distance: 0,
  });
  console.log("activityList", activityList.value);
  pureActivityList.value = activityList.value.filter((item) => {
    return item.type !== "arrow";
  });
  pureActivityList.value.forEach((item, index) => {
    item.distanceToEnd = (
      distance -
      (item.completionProgress / 100) * distance
    ).toFixed(2);
  });
  console.log("pureActivityList", pureActivityList);
  // 延迟初始化当前居中的item（等待DOM更新）
  setTimeout(() => {
    const centerData = getCurrentCenterItem();
    if (centerData) {
      currentCenterItem.value = centerData.item;
    }
  }, 100);
};
// 获取挑战项目详情
const getChallengeDetail = async (id) => {
  try {
    const res = await challengeApi.getChallenge(id);
    console.log("获取挑战详情响应:", res);

    if (res && res.code === 200 && res.data) {
      challengeDetail.value = res.data;
      dataReady = true; // 标记数据已准备好
      console.log("✅ 挑战详情数据已更新:", challengeDetail.value);
      // 将活动记录列表转换为map
      challengeDetail.value.activityRecordList.forEach((item) => {
        activityRecordListMap[item.challengeType] = true;
      });
      // 获取活动列表
      getActivityList(
        challengeDetail.value.activityRecordList,
        challengeDetail.value.scenicSpotList,
        challengeDetail.value.distance
      );
      // 初始化postList
      finishedPostList.value = challengeDetail.value.scenicSpotList.filter(
        (item) => {
          return item.type === "1" && item.finishFlag === "1";
        }
      );
      totalPostList.value = challengeDetail.value.scenicSpotList.filter(
        (item) => {
          return item.type === "1";
        }
      );
      // 初始化viewList
      finishedViewList.value = challengeDetail.value.scenicSpotList.filter(
        (item) => {
          return item.type === "0" && item.finishFlag === "1";
        }
      );
      totalViewList.value = challengeDetail.value.scenicSpotList.filter(
        (item) => {
          return item.type === "0";
        }
      );
      // 初始化sportList
      sportList.value = challengeDetail.value.activityRecordList;
      // 检查是否可以回显数据
      // checkAndRestoreData();
    } else {
      console.error("❌ 获取挑战详情失败:", res);
      dataReady = false;
    }
  } catch (error) {
    console.error("❌ 获取挑战项目详情时发生错误:", error);
    dataReady = false;
  }
};
// 回显地图数据
const restoreMapData = async () => {
  console.log("开始回显地图数据");

  // 设置标志，防止循环调用
  isRestoringData = true;

  try {
    // 检查数据是否存在
    if (!challengeDetail.value || !map) {
      isRestoringData = false; // 重置标志
      return;
    }

    // 线路数据
    let route = [];
    if (challengeDetail.value.route) {
      try {
        route = JSON.parse(challengeDetail.value.route);
      } catch (error) {
        console.error("解析路线数据失败:", error);
        route = [];
      }
    }

    // 景点数据
    const scenicSpotList = [];
    if (
      challengeDetail.value.scenicSpotList &&
      Array.isArray(challengeDetail.value.scenicSpotList)
    ) {
      challengeDetail.value.scenicSpotList.forEach((item) => {
        try {
          if (item.coordinatePoint) {
            const point = JSON.parse(item.coordinatePoint);
            console.log(
              "🚀 ~ challengeDetail.value.scenicSpotList.forEach ~ point:",
              point
            );
            // 添加景点名称等额外信息
            if (typeof point === "object") {
              point.name = item.title || "";
              point.description = item.description || "";
            }
            scenicSpotList.push(point);
          }
        } catch (error) {
          console.error("解析景点坐标失败:", error, item);
        }
      });
    }

    // 回显路线数据
    if (route.length > 0) {
      restoreLines(route);
    }

    // 回显点数据
    if (scenicSpotList.length > 0) {
      restorePoints(scenicSpotList);
    }

    // 自动调整地图视野
    if (route.length > 0 || scenicSpotList.length > 0) {
      setTimeout(() => {
        fitMapView();
      }, 300);
    }

    // 添加起点和终点标记（在最后添加，确保在所有图层之上）
    if (route.length > 0) {
      setTimeout(async () => {
        await addStartMarker(route);
        await addEndMarker(route);
      }, 500); // 延迟添加，确保其他图层已完成
    }
    console.log("✅ 地图数据回显执行完成");
  } catch (error) {
    console.error("回显地图数据时发生错误:", error);
  } finally {
    // 重置标志
    isRestoringData = false;
  }
};
onMounted(() => {
  console.log("🚀 组件开始挂载");
  console.log("route.query.token", route.query.token, route.query.id);
  const token = route.query.token;
  const id = route.query.id;

  // 初始化用户Store（从URL参数获取token或从localStorage恢复）
  if (token) {
    userStore.setToken(token);
  }

  // 先初始化地图
  console.log("🗺️ 开始初始化地图");
  initMap();

  // 获取挑战详情数据
  if (id) {
    getChallengeDetail(id);
  } else {
    console.warn("⚠️ 没有提供挑战项目ID");
  }
});

// 组件卸载时清理定时器
onUnmounted(() => {
  if (scrollTimer) {
    clearTimeout(scrollTimer);
    scrollTimer = null;
  }
});
</script>

<style>
/* 保留地图相关样式 */
.map-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#map {
  width: 100%;
  height: 100%;
}

.avatar-marker {
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.info-card {
  font-size: 14px;
}

/* 景点弹窗样式 */
.scenic-popup {
  min-width: 200px;
  max-width: 300px;
  padding: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

.scenic-popup h3 {
  margin: 0 0 8px 0;
  color: #7b412d;
  font-size: 16px;
  font-weight: 600;
}

.scenic-popup p {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

/* MapLibre GL 弹窗样式覆盖 */
.maplibregl-popup-content {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e1e5e9;
}

.maplibregl-popup-tip {
  border-top-color: #e1e5e9;
}

/* 隐藏滚动条但保持滚动功能 */
.overflow-x-scroll {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.overflow-x-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
