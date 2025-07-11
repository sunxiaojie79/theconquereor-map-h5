<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <!-- 地图容器 -->
    <div id="map" ref="mapContainer" class="w-full h-full"></div>

    <!-- 切换按钮 -->
    <button
      class="absolute top-5 right-5 z-10 px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm"
      @click="toggleMapStyle"
    >
      切换为{{ isSatellite ? "街道图" : "卫星图" }}
    </button>

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
          class="absolute -top-[40px] left-[16px] w-[343px] h-[76px] border-[2px] border-[#242A36] rounded-[8px] flex items-center px-[12px] py-[14px] bg-[#fff]"
        >
          <div
            class="w-[48px] h-[48px] rounded-full overflow-hidden mr-[9px] flex-shrink-0"
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center"
              alt="项目头像"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1">
            <h3
              class="text-[17px] font-[500] text-[rgba(0, 0, 0, 0.85)] mb-[4px]"
            >
              挑战项目标题名称
            </h3>
            <div
              class="flex items-center text-[14px] text-[rgba(0, 0, 0, 0.65)]"
            >
              <span class="flex items-center mr-[16px]"
                >目标距离(公里)
                <span class="text-[#7B412D] text-[17px] font-[600] ml-[4px]"
                  >160</span
                ></span
              >
              <span class="flex items-center"
                >目标时间(天)
                <span class="text-[#00778A] text-[17px] font-[600] ml-[4px]"
                  >14</span
                ></span
              >
            </div>
          </div>
        </div>
      </template>
      <template #content>
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
              <div class="text-[22px] font-[600]">80%</div>
            </div>

            <!-- 时间进度卡片 -->
            <div
              class="flex flex-col items-center justify-center bg-[#00778A] w-[80px] h-[72px] rounded-[4px] text-white"
            >
              <div class="text-[14px] opacity-95">时间</div>
              <div class="text-[22px] font-[600]">70%</div>
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
                  :percentage="80"
                  :show-pivot="false"
                  stroke-width="8"
                />
              </div>
              <div class="flex items-center">
                <img
                  src="@/assets/time.png"
                  alt="时间"
                  class="w-[14px] h-[14px] mr-[10px] ml-[2px]"
                />
                <van-progress
                  class="w-full"
                  color="#00778A"
                  :percentage="70"
                  :show-pivot="false"
                  stroke-width="8"
                />
              </div>
            </div>
            <!-- 详细进度信息 -->
            <div class="w-full h-[68px] flex flex-row justify-between">
              <!-- 已完成 -->
              <div class="flex-1 flex flex-col justify-between">
                <span class="text-[rgba(0, 0, 0, 0.65)] text-[14px]"
                  >已完成</span
                >
                <div class="text-[17px] font-[600] text-[#7B412D]">
                  78.121
                  <span class="text-[12px] ml-[2px]">km</span>
                </div>
                <div class="text-[17px] font-[600] text-[#00778A]">
                  7 <span class="text-[12px] ml-[2px]">days</span>
                </div>
              </div>

              <!-- 剩余 -->
              <div class="flex-1 flex flex-col justify-between">
                <span class="text-[rgba(0, 0, 0, 0.65)] text-[14px]">剩余</span>
                <div class="text-[17px] font-[600] text-[#7B412D]">
                  78.121
                  <span class="text-[12px] ml-[2px]">km</span>
                </div>
                <div class="text-[17px] font-[600] text-[#00778A]">
                  7 <span class="text-[12px] ml-[2px]">days</span>
                </div>
              </div>
            </div>

            <!-- 运动图标 -->
            <div class="flex justify-start mt-[12px]">
              <div
                class="w-[24px] h-[24px] bg-[#FADB47] rounded-[4px] flex items-center justify-center mr-[4px]"
              >
                <img
                  src="@/assets/icon-swimming.png"
                  alt="游泳"
                  class="w-[20px] h-[13px]"
                />
              </div>
              <div
                class="w-[24px] h-[24px] bg-[#FADB47] rounded-[4px] flex items-center justify-center mr-[4px]"
              >
                <img
                  src="@/assets/icon-cycling.png"
                  alt="骑行"
                  class="w-[18px] h-[16px]"
                />
              </div>
              <div
                class="w-[24px] h-[24px] bg-[#FADB47] rounded-[4px] flex items-center justify-center mr-[4px]"
              >
                <img
                  src="@/assets/icon-walking.png"
                  alt="步行"
                  class="w-[13px] h-[20px]"
                />
              </div>
              <div
                class="w-[24px] h-[24px] bg-[#FADB47] rounded-[4px] flex items-center justify-center mr-[4px]"
              >
                <img
                  src="@/assets/icon-walking-indoor.png"
                  alt="室内步行"
                  class="w-[19px] h-[15px]"
                />
              </div>
              <div
                class="w-[24px] h-[24px] bg-[#FADB47] rounded-[4px] flex items-center justify-center mr-[4px]"
              >
                <img
                  src="@/assets/icon-running.png"
                  alt="跑步"
                  class="w-[16px] h-[19px]"
                />
              </div>
              <div
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

        <!-- 内容区域 -->

        <div class="bg-[#eee]">
          <!-- 我的旅程模块 -->
          <div class="bg-[#fff] w-full h-[308px] p-[16px] mb-[8px]">
            <h3 class="text-[17px] text-[#242A36] mb-[12px]">我的旅程</h3>
            <div
              class="w-full h-[160px] bg-[linear-gradient(180deg,#EBEBED_0%,rgba(235,235,237,0)_100%)] rounded-t-[4px] relative"
            >
              <div class="w-full h-[208px] absolute top-[24px] left-0"></div>
            </div>
            <div
              class="w-full h-[80px] bg-[linear-gradient(180deg,rgba(235,235,237,0.65)_0%,rgba(235,235,237,0.3)_100%)] rounded-b-[4px]"
            ></div>
          </div>

          <!-- 成就奖励模块 -->
          <div class="bg-white p-4 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">成就奖励</h3>

            <!-- 6/10解锁明信片 -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-semibold text-gray-800"
                  >6/10解锁明信片</span
                >
                <span class="text-sm text-gray-600">你已解锁6张明信片</span>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div class="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=60&fit=crop"
                    alt="明信片"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=60&fit=crop"
                    alt="明信片"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=80&h=60&fit=crop"
                    alt="明信片"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <!-- 9/10解锁风景点 -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-semibold text-gray-800"
                  >9/10解锁风景点</span
                >
                <span class="text-sm text-gray-600">你已解锁9个风景点</span>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div class="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=60&fit=crop"
                    alt="风景点"
                    class="w-full h-full object-cover"
                  />
                  <span class="text-xs text-gray-500 block mt-2">风景名称</span>
                </div>
                <div class="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=60&fit=crop"
                    alt="风景点"
                    class="w-full h-full object-cover"
                  />
                  <span class="text-xs text-gray-500 block mt-2">风景名称</span>
                </div>
                <div class="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=80&h=60&fit=crop"
                    alt="风景点"
                    class="w-full h-full object-cover"
                  />
                  <span class="text-xs text-gray-500 block mt-2">风景名称</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 号码牌模块 -->
          <div class="bg-white p-4 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">号码牌</h3>
            <div class="bg-amber-900 rounded-lg p-4 text-center text-white">
              <div class="flex justify-center mb-2">
                <div class="w-full h-1 bg-white rounded-full mb-2"></div>
                <div class="w-full h-1 bg-white rounded-full mb-2"></div>
              </div>
              <div class="text-4xl font-bold">99999</div>
            </div>
          </div>

          <!-- 运动动态模块 -->
          <div class="bg-white p-4 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">运动动态</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <div
                class="flex items-center justify-between mb-3 border-b border-gray-200 pb-3"
              >
                <div class="text-sm text-gray-600">78.121 km</div>
                <div class="text-xs text-gray-500">2025.06.11</div>
                <div class="text-sm text-green-600">平台随机运动</div>
              </div>
              <div
                class="flex items-center justify-between mb-3 border-b border-gray-200 pb-3"
              >
                <div
                  class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg mr-3"
                >
                  🚶
                </div>
                <div class="flex-1">
                  <div class="text-sm text-gray-600">78.121 km</div>
                  <div class="text-sm text-gray-800 font-semibold">
                    步行运动
                  </div>
                </div>
                <div class="text-xs text-gray-500">2025.06.11</div>
              </div>
              <div
                class="flex items-center justify-between mb-3 border-b border-gray-200 pb-3"
              >
                <div
                  class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg mr-3"
                >
                  🏃
                </div>
                <div class="flex-1">
                  <div class="text-sm text-gray-600">78.121 km</div>
                  <div class="text-sm text-gray-800 font-semibold">
                    奔跑随机运动
                  </div>
                </div>
                <div class="text-xs text-gray-500">2025.06.11</div>
              </div>
              <div
                class="flex items-center justify-between mb-3 border-b border-gray-200 pb-3"
              >
                <div
                  class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg mr-3"
                >
                  🚴
                </div>
                <div class="flex-1">
                  <div class="text-sm text-gray-600">78.121 km</div>
                  <div class="text-sm text-gray-800 font-semibold">
                    系统随机运动
                  </div>
                </div>
                <div class="text-xs text-gray-500">2025.06.11</div>
              </div>
              <div
                class="flex items-center justify-between mb-3 border-b border-gray-200 pb-3"
              >
                <div
                  class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg mr-3"
                >
                  🏊
                </div>
                <div class="flex-1">
                  <div class="text-sm text-gray-600">78.121 km</div>
                  <div class="text-sm text-gray-800 font-semibold">
                    系统随机运动
                  </div>
                </div>
                <div class="text-xs text-gray-500">2025.06.11</div>
              </div>
              <div
                class="flex items-center justify-between mb-3 border-b border-gray-200 pb-3"
              >
                <div
                  class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg mr-3"
                >
                  ⛰️
                </div>
                <div class="flex-1">
                  <div class="text-sm text-gray-600">78.121 km</div>
                  <div class="text-sm text-gray-800 font-semibold">
                    奔跑随机运动
                  </div>
                </div>
                <div class="text-xs text-gray-500">2025.06.11</div>
              </div>
              <div
                class="flex items-center justify-between mb-3 border-b border-gray-200 pb-3"
              >
                <div
                  class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg mr-3"
                >
                  🤸
                </div>
                <div class="flex-1">
                  <div class="text-sm text-gray-600">78.121 km</div>
                  <div class="text-sm text-gray-800 font-semibold">
                    奔跑随机运动
                  </div>
                </div>
                <div class="text-xs text-gray-500">2025.06.11</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </FloatingPanel>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import FloatingPanel from "../components/FloatingPanel.vue";

const mapContainer = ref(null);
const isSatellite = ref(false);

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

const styles = {
  street: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  satellite:
    "https://api.maptiler.com/maps/hybrid/style.json?key=DpIVwCOpBp3YJ9IRulHS",
};

const toggleMapStyle = () => {
  isSatellite.value = !isSatellite.value;
  map.setStyle(isSatellite.value ? styles.satellite : styles.street);
};

const addRouteLayer = () => {
  if (map.getSource("route")) return;
  console.log("addRouteLayer");

  map.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [2.352222, 48.856613],
          [2.353223, 48.857614],
          [2.355224, 48.858615],
        ],
      },
    },
  });

  map.addLayer({
    id: "route-line",
    type: "line",
    source: "route",
    layout: { "line-join": "round", "line-cap": "round" },
    paint: {
      "line-color": "#007aff",
      "line-width": 4,
    },
  });
};

const initMap = () => {
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: styles.street,
    center: [2.352222, 48.856613],
    zoom: 12,
  });

  map.on("load", () => {
    const avatar = document.createElement("div");
    avatar.className = "avatar-marker";
    avatar.style.backgroundImage = "url('https://i.pravatar.cc/50')";
    avatar.style.width = "40px";
    avatar.style.height = "40px";
    avatar.style.borderRadius = "50%";
    avatar.style.backgroundSize = "cover";

    const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
      <div class="info-card">
        <strong>医生张三</strong><br/>
        心血管内科 | 门诊 9:00-17:00<br/>
        <button>预约</button>
      </div>
    `);

    new maplibregl.Marker(avatar)
      .setLngLat([2.352222, 48.856613])
      .setPopup(popup)
      .addTo(map);

    addRouteLayer();
  });

  map.on("styledata", () => {
    console.log("style.load");
    addRouteLayer();
  });
};

onMounted(() => {
  initMap();
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
</style>
