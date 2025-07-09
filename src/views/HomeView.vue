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
          class="absolute -top-[52px] left-[27px] border border-gray-800 rounded-lg flex items-center p-4 bg-white"
        >
          <div
            class="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0"
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center"
              alt="项目头像"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800 mb-1">
              挑战项目标题名称
            </h3>
            <div class="flex gap-4 text-sm text-gray-600">
              <span
                >目标距离(公里)
                <span class="text-orange-600 font-bold">160</span></span
              >
              <span
                >目标时间(天)
                <span class="text-orange-600 font-bold">14</span></span
              >
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <!-- 进度卡片区域 -->
        <div class="bg-gray-50 p-5">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <!-- 里程进度卡片 -->
            <div class="bg-amber-900 text-white p-4 rounded-xl">
              <div class="text-sm opacity-90 mb-1">里程</div>
              <div class="text-3xl font-bold">80%</div>
            </div>

            <!-- 时间进度卡片 -->
            <div class="bg-teal-800 text-white p-4 rounded-xl">
              <div class="text-sm opacity-90 mb-1">时间</div>
              <div class="text-3xl font-bold">70%</div>
            </div>
          </div>

          <!-- 详细进度信息 -->
          <div class="grid grid-cols-2 gap-6 mb-4">
            <!-- 已完成 -->
            <div>
              <div class="flex items-center mb-2">
                <div class="w-4 h-4 rounded-full bg-amber-900 mr-2"></div>
                <span class="text-gray-600 text-sm">已完成</span>
              </div>
              <div class="text-xl font-bold text-gray-900 mb-1">
                78.121 <span class="text-sm font-normal">km</span>
              </div>
              <div class="text-base font-semibold text-teal-800">
                7 <span class="font-normal">days</span>
              </div>
            </div>

            <!-- 剩余 -->
            <div>
              <div class="flex items-center mb-2">
                <div class="w-4 h-4 rounded-full bg-teal-800 mr-2"></div>
                <span class="text-gray-600 text-sm">剩余</span>
              </div>
              <div class="text-xl font-bold text-gray-900 mb-1">
                78.121 <span class="text-sm font-normal">km</span>
              </div>
              <div class="text-base font-semibold text-teal-800">
                7 <span class="font-normal">days</span>
              </div>
            </div>
          </div>

          <!-- 进度条 -->
          <div class="space-y-3 mb-4">
            <div class="flex items-center">
              <div class="w-4 h-4 rounded-full bg-amber-900 mr-3"></div>
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-amber-900 rounded-full"
                  style="width: 80%"
                ></div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 rounded-full bg-teal-800 mr-3"></div>
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-teal-800 rounded-full"
                  style="width: 70%"
                ></div>
              </div>
            </div>
          </div>

          <!-- 运动图标 -->
          <div class="flex justify-center gap-2 mt-2">
            <div
              class="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-2xl"
            >
              🏊‍♀️
            </div>
            <div
              class="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-2xl"
            >
              🚴‍♀️
            </div>
            <div
              class="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-2xl"
            >
              🚶‍♀️
            </div>
            <div
              class="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-2xl"
            >
              🏃‍♀️
            </div>
            <div
              class="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-2xl"
            >
              🏃‍♂️
            </div>
            <div
              class="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-2xl"
            >
              ⛰️
            </div>
          </div>
        </div>

        <!-- 内容区域 -->

        <div class="challenge-panel">
          <!-- 我的旅程模块 -->
          <div class="bg-white p-4 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">我的旅程</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex justify-between items-center mb-3">
                <span
                  class="bg-amber-900 text-white px-3 py-1 rounded-md text-sm font-medium"
                  >活动1</span
                >
              </div>
              <div class="flex items-center justify-between mb-3">
                <div class="text-sm text-gray-600">22.2km</div>
                <div class="flex items-center">
                  <div class="text-2xl mr-2">🚴</div>
                  <div class="text-sm font-semibold text-gray-800">骑行</div>
                  <div class="text-sm text-gray-600 ml-2">20km</div>
                  <div class="text-xs text-gray-500 ml-2">2025.06.11</div>
                </div>
                <div class="text-sm text-gray-600">22.2km</div>
              </div>
              <div class="flex justify-between items-center">
                <div class="text-sm text-gray-600">50.2km</div>
                <div class="text-sm text-gray-600">↑</div>
              </div>
            </div>
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
  Math.round(0.9 * window.innerHeight),
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
