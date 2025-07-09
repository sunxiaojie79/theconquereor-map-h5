<template>
  <div class="map-page">
    <!-- 地图容器 -->
    <div id="map" ref="mapContainer"></div>

    <!-- 切换按钮 -->
    <button class="toggle-style" @click="toggleMapStyle">
      切换为{{ isSatellite ? "街道图" : "卫星图" }}
    </button>

    <!-- 自定义浮动面板 -->
    <div
      class="floating-panel"
      :style="{ transform: `translateY(${panelOffset}px)` }"
    >
      <!-- 拖拽指示器 -->
      <div class="drag-indicator">
        <div class="drag-bar"></div>
      </div>

      <!-- 面板内容 -->
      <div class="challenge-panel">
        <!-- 项目标题区域 -->
        <div
          class="project-header"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div class="avatar-container">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center"
              alt="项目头像"
              class="avatar-image"
            />
          </div>
          <div class="project-info">
            <h3 class="project-title">挑战项目标题名称</h3>
            <div class="project-targets">
              <span class="target-item"
                >目标距离(公里) <span class="target-value">160</span></span
              >
              <span class="target-item"
                >目标时间(天) <span class="target-value">14</span></span
              >
            </div>
          </div>
        </div>

        <!-- 进度卡片区域 -->
        <div class="progress-section">
          <div class="progress-cards">
            <!-- 里程进度卡片 -->
            <div class="progress-card progress-card-brown">
              <div class="card-label">里程</div>
              <div class="card-percentage">80%</div>
            </div>

            <!-- 时间进度卡片 -->
            <div class="progress-card progress-card-teal">
              <div class="card-label">时间</div>
              <div class="card-percentage">70%</div>
            </div>
          </div>

          <!-- 详细进度信息 -->
          <div class="progress-details">
            <!-- 已完成 -->
            <div class="detail-item">
              <div class="detail-header">
                <div class="detail-dot detail-dot-brown"></div>
                <span class="detail-label">已完成</span>
              </div>
              <div class="detail-distance">
                78.121 <span class="unit">km</span>
              </div>
              <div class="detail-time">
                7 <span class="time-unit">days</span>
              </div>
            </div>

            <!-- 剩余 -->
            <div class="detail-item">
              <div class="detail-header">
                <div class="detail-dot detail-dot-teal"></div>
                <span class="detail-label">剩余</span>
              </div>
              <div class="detail-distance">
                78.121 <span class="unit">km</span>
              </div>
              <div class="detail-time">
                7 <span class="time-unit">days</span>
              </div>
            </div>
          </div>

          <!-- 进度条 -->
          <div class="progress-bars">
            <div class="progress-bar-row">
              <div class="progress-dot progress-dot-brown"></div>
              <div class="progress-bar-container">
                <div class="progress-bar">
                  <div
                    class="progress-fill progress-fill-brown"
                    style="width: 80%"
                  ></div>
                </div>
              </div>
            </div>
            <div class="progress-bar-row">
              <div class="progress-dot progress-dot-teal"></div>
              <div class="progress-bar-container">
                <div class="progress-bar">
                  <div
                    class="progress-fill progress-fill-teal"
                    style="width: 70%"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 运动图标 -->
          <div class="activity-icons">
            <div class="activity-icon">🏊‍♀️</div>
            <div class="activity-icon">🚴‍♀️</div>
            <div class="activity-icon">🚶‍♀️</div>
            <div class="activity-icon">🏃‍♀️</div>
            <div class="activity-icon">🏃‍♂️</div>
            <div class="activity-icon">⛰️</div>
          </div>
        </div>

        <!-- 我的旅程模块 -->
        <div class="journey-section">
          <h3 class="section-title">我的旅程</h3>
          <div class="journey-card">
            <div class="journey-header">
              <span class="journey-label">活动1</span>
            </div>
            <div class="journey-content">
              <div class="journey-distance-left">22.2km</div>
              <div class="journey-center">
                <div class="bike-icon">🚴</div>
                <div class="journey-activity">骑行</div>
                <div class="journey-duration">20km</div>
                <div class="journey-date">2025.06.11</div>
              </div>
              <div class="journey-distance-right">22.2km</div>
            </div>
            <div class="journey-total">
              <div class="total-arrow">↑</div>
              <div class="total-distance">50.2km</div>
            </div>
          </div>
        </div>

        <!-- 成就奖励模块 -->
        <div class="achievement-section">
          <h3 class="section-title">成就奖励</h3>

          <!-- 6/10解锁明信片 -->
          <div class="achievement-item">
            <div class="achievement-header">
              <span class="achievement-count">6/10解锁明信片</span>
              <span class="achievement-desc">你已解锁6张明信片</span>
            </div>
            <div class="postcard-grid">
              <div class="postcard-item">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=60&fit=crop"
                  alt="明信片"
                  class="postcard-image"
                />
              </div>
              <div class="postcard-item">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=60&fit=crop"
                  alt="明信片"
                  class="postcard-image"
                />
              </div>
              <div class="postcard-item">
                <img
                  src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=80&h=60&fit=crop"
                  alt="明信片"
                  class="postcard-image"
                />
              </div>
            </div>
          </div>

          <!-- 9/10解锁风景点 -->
          <div class="achievement-item">
            <div class="achievement-header">
              <span class="achievement-count">9/10解锁风景点</span>
              <span class="achievement-desc">你已解锁9个风景点</span>
            </div>
            <div class="scenery-grid">
              <div class="scenery-item">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=60&fit=crop"
                  alt="风景点"
                  class="scenery-image"
                />
                <span class="scenery-label">风景名称</span>
              </div>
              <div class="scenery-item">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=60&fit=crop"
                  alt="风景点"
                  class="scenery-image"
                />
                <span class="scenery-label">风景名称</span>
              </div>
              <div class="scenery-item">
                <img
                  src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=80&h=60&fit=crop"
                  alt="风景点"
                  class="scenery-image"
                />
                <span class="scenery-label">风景名称</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 号码牌模块 -->
        <div class="number-plate-section">
          <h3 class="section-title">号码牌</h3>
          <div class="number-plate-card">
            <div class="plate-header">
              <div class="plate-brown-bar"></div>
              <div class="plate-teal-ribbon"></div>
            </div>
            <div class="plate-number">99999</div>
          </div>
        </div>

        <!-- 运动动态模块 -->
        <div class="activity-log-section">
          <h3 class="section-title">运动动态</h3>
          <div class="activity-log-list">
            <div class="activity-log-item">
              <div class="log-distance">
                78.121 <span class="log-unit">km</span>
              </div>
              <div class="log-date">2025.06.11</div>
              <div class="log-status-completed">平台随机运动</div>
            </div>
            <div class="activity-log-item">
              <div class="log-icon walking">🚶</div>
              <div class="log-content">
                <div class="log-distance">
                  78.121 <span class="log-unit">km</span>
                </div>
                <div class="log-activity">步行运动</div>
              </div>
              <div class="log-date">2025.06.11</div>
            </div>
            <div class="activity-log-item">
              <div class="log-icon running">🏃</div>
              <div class="log-content">
                <div class="log-distance">
                  78.121 <span class="log-unit">km</span>
                </div>
                <div class="log-activity">奔跑随机运动</div>
              </div>
              <div class="log-date">2025.06.11</div>
            </div>
            <div class="activity-log-item">
              <div class="log-icon cycling">🚴</div>
              <div class="log-content">
                <div class="log-distance">
                  78.121 <span class="log-unit">km</span>
                </div>
                <div class="log-activity">系统随机运动</div>
              </div>
              <div class="log-date">2025.06.11</div>
            </div>
            <div class="activity-log-item">
              <div class="log-icon swimming">🏊</div>
              <div class="log-content">
                <div class="log-distance">
                  78.121 <span class="log-unit">km</span>
                </div>
                <div class="log-activity">系统随机运动</div>
              </div>
              <div class="log-date">2025.06.11</div>
            </div>
            <div class="activity-log-item">
              <div class="log-icon climbing">⛰️</div>
              <div class="log-content">
                <div class="log-distance">
                  78.121 <span class="log-unit">km</span>
                </div>
                <div class="log-activity">奔跑随机运动</div>
              </div>
              <div class="log-date">2025.06.11</div>
            </div>
            <div class="activity-log-item">
              <div class="log-icon other">🤸</div>
              <div class="log-content">
                <div class="log-distance">
                  78.121 <span class="log-unit">km</span>
                </div>
                <div class="log-activity">奔跑随机运动</div>
              </div>
              <div class="log-date">2025.06.11</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const mapContainer = ref(null);
const isSatellite = ref(false);
// 定义锚点位置
const anchors = [
  200,
  // Math.round(0.6 * window.innerHeight),
  Math.round(0.9 * window.innerHeight),
];
// 初始化面板偏移量为 window.innerHeight - anchors[0]，使面板高度等于第一个锚点值
const panelOffset = ref(window.innerHeight - anchors[0]); // 设置初始偏移量，使面板高度为100px
const isDragging = ref(false);
const startY = ref(0);
const startOffset = ref(0);

// 找到最近的锚点位置
const findNearestAnchor = (offset) => {
  const currentPosition = window.innerHeight - offset;
  return anchors.reduce((prev, curr) => {
    return Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition)
      ? curr
      : prev;
  });
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

// 触摸事件处理
const handleTouchStart = (e) => {
  isDragging.value = true;
  startY.value = e.touches[0].clientY;
  startOffset.value = panelOffset.value;
};

const handleTouchMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();

  const currentY = e.touches[0].clientY;
  const deltaY = currentY - startY.value;
  const newOffset = startOffset.value + deltaY;

  // 限制拖拽范围
  const maxHeight = Math.max(...anchors);
  const minOffset = window.innerHeight - maxHeight;
  panelOffset.value = Math.max(
    minOffset,
    Math.min(window.innerHeight - 100, newOffset)
  );
};

const handleTouchEnd = () => {
  if (!isDragging.value) return;
  isDragging.value = false;

  // 自动吸附到最近的锚点位置
  const nearestAnchor = findNearestAnchor(panelOffset.value);
  panelOffset.value = window.innerHeight - nearestAnchor;
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

.toggle-style {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 999;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.avatar-marker {
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.info-card {
  font-size: 14px;
}

/* 浮动面板样式 */
.floating-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90vh;
  background: white;
  /* border-radius: 20px 20px 0 0; */
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: transform 0.3s ease;
  transform: translateY(300px);
}

.drag-indicator {
  display: flex;
  justify-content: center;
  padding: 12px 0 8px 0;
  cursor: grab;
}

.drag-bar {
  background: transparent;
  width: 40px;
  height: 4px;
  background: #d1d5db;
  border-radius: 2px;
}

.challenge-panel {
  padding: 0;
  height: calc(100% - 32px);
  overflow-y: auto;
}

/* 项目头部 */
.project-header {
  position: absolute;
  top: -52px;
  left: 27px;
  border: 1px solid #333;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: white;
}

.avatar-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-info {
  flex: 1;
}

.project-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.project-targets {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #6b7280;
}

.target-value {
  color: #f97316;
  font-weight: 700;
}

/* 进度区域 */
.progress-section {
  padding: 16px 20px 20px 20px;
  background: #f9fafb;
}

.progress-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.progress-card {
  padding: 16px;
  border-radius: 12px;
  color: white;
}

.progress-card-brown {
  background: #92400e;
}

.progress-card-teal {
  background: #0f766e;
}

.card-label {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 4px;
}

.card-percentage {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

/* 详细进度 */
.progress-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 16px;
}

.detail-item {
  text-align: left;
}

.detail-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.detail-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
}

.detail-dot-brown {
  background: #92400e;
}

.detail-dot-teal {
  background: #0f766e;
}

.detail-label {
  font-size: 14px;
  color: #6b7280;
}

.detail-distance {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
}

.unit {
  font-size: 14px;
  font-weight: 400;
}

.detail-time {
  font-size: 16px;
  font-weight: 600;
  color: #0f766e;
}

.time-unit {
  font-size: 14px;
  font-weight: 400;
}

/* 进度条 */
.progress-bars {
  margin-bottom: 16px;
}

.progress-bar-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.progress-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
}

.progress-dot-brown {
  background: #92400e;
}

.progress-dot-teal {
  background: #0f766e;
}

.progress-bar-container {
  flex: 1;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-fill-brown {
  background: #92400e;
}

.progress-fill-teal {
  background: #0f766e;
}

/* 运动图标 */
.activity-icons {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.activity-icon {
  width: 48px;
  height: 48px;
  background: #fbbf24;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

/* 通用标题样式 */
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
  padding: 0 20px;
}

/* 我的旅程模块 */
.journey-section {
  background: white;
  padding: 16px 0;
  border-bottom: 8px solid #f3f4f6;
}

.journey-card {
  background: #f9fafb;
  margin: 0 20px;
  border-radius: 12px;
  padding: 16px;
  position: relative;
}

.journey-header {
  text-align: center;
  margin-bottom: 12px;
}

.journey-label {
  background: #92400e;
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.journey-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.journey-distance-left,
.journey-distance-right {
  background: #92400e;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
}

.journey-center {
  text-align: center;
  flex: 1;
  margin: 0 16px;
}

.bike-icon {
  font-size: 32px;
  margin-bottom: 4px;
}

.journey-activity {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2px;
}

.journey-duration {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 2px;
}

.journey-date {
  font-size: 10px;
  color: #9ca3af;
  background: #92400e;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
}

.journey-total {
  text-align: center;
}

.total-arrow {
  color: #0f766e;
  font-size: 16px;
  margin-bottom: 4px;
}

.total-distance {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

/* 成就奖励模块 */
.achievement-section {
  background: white;
  padding: 16px 0;
  border-bottom: 8px solid #f3f4f6;
}

.achievement-item {
  margin: 0 20px 20px 20px;
}

.achievement-item:last-child {
  margin-bottom: 0;
}

.achievement-header {
  margin-bottom: 12px;
}

.achievement-count {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  display: block;
  margin-bottom: 4px;
}

.achievement-desc {
  font-size: 12px;
  color: #6b7280;
}

.postcard-grid,
.scenery-grid {
  display: flex;
  gap: 12px;
}

.postcard-item,
.scenery-item {
  flex: 1;
  text-align: center;
}

.postcard-image,
.scenery-image {
  width: 100%;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
}

.scenery-label {
  display: block;
  font-size: 10px;
  color: #6b7280;
  margin-top: 4px;
}

/* 号码牌模块 */
.number-plate-section {
  background: white;
  padding: 16px 0;
  border-bottom: 8px solid #f3f4f6;
}

.number-plate-card {
  margin: 0 20px;
  background: linear-gradient(135deg, #d2691e 0%, #cd853f 100%);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.plate-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  display: flex;
}

.plate-brown-bar {
  flex: 1;
  background: #92400e;
}

.plate-teal-ribbon {
  width: 20px;
  background: #0f766e;
  position: relative;
}

.plate-teal-ribbon::after {
  content: "";
  position: absolute;
  top: 100%;
  right: 0;
  width: 0;
  height: 0;
  border-left: 10px solid #0f766e;
  border-right: 10px solid transparent;
  border-top: 8px solid #0f766e;
}

.plate-number {
  font-size: 48px;
  font-weight: 700;
  color: #1f2937;
  background: white;
  margin: 16px auto 0 auto;
  padding: 16px 24px;
  border-radius: 8px;
  display: inline-block;
  border: 3px solid #92400e;
}

/* 运动动态模块 */
.activity-log-section {
  background: white;
  padding: 16px 0 32px 0;
}

.activity-log-list {
  padding: 0 20px;
}

.activity-log-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
  position: relative;
}

.activity-log-item:last-child {
  border-bottom: none;
}

.log-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 12px;
  flex-shrink: 0;
}

.log-icon.walking,
.log-icon.running {
  background: #fbbf24;
}

.log-icon.cycling {
  background: #fbbf24;
}

.log-icon.swimming {
  background: #fbbf24;
}

.log-icon.climbing,
.log-icon.other {
  background: #fbbf24;
}

.log-content {
  flex: 1;
}

.log-distance {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2px;
}

.log-unit {
  font-size: 12px;
  font-weight: 400;
}

.log-activity {
  font-size: 12px;
  color: #10b981;
  margin-bottom: 2px;
}

.log-date {
  font-size: 12px;
  color: #6b7280;
  margin-left: auto;
  flex-shrink: 0;
}

.log-status-completed {
  font-size: 12px;
  color: #10b981;
  margin-left: auto;
  flex-shrink: 0;
}

/* 第一个运动动态项目的特殊样式 */
.activity-log-item:first-child {
  background: #fef3c7;
  margin: 0 -20px;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.activity-log-item:first-child .log-distance {
  color: #92400e;
}

.activity-log-item:first-child::after {
  content: "🔴";
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
}
</style>
