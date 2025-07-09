<template>
  <div id="app">
    <div id="map" ref="mapContainer"></div>
    <button class="toggle-style" @click="toggleMapStyle">
      切换为{{ isSatellite ? "街道图" : "卫星图" }}
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const mapContainer = ref(null);
const isSatellite = ref(false);
let map;

const styles = {
  street: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  satellite:
    "https://api.maptiler.com/maps/hybrid/style.json?key=DpIVwCOpBp3YJ9IRulHS", // 替换为你自己的 MapTiler Key
};

const toggleMapStyle = () => {
  isSatellite.value = !isSatellite.value;
  map.setStyle(isSatellite.value ? styles.satellite : styles.street);
};
const addRouteLayer = () => {
  if (map.getSource("route")) return;
  console.log("addRouteLayer");
  // 添加轨迹线
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
onMounted(() => {
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: styles.street,
    center: [2.352222, 48.856613],
    zoom: 12,
  });

  map.on("load", () => {
    // 添加 marker（头像）
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
    addRouteLayer(); // 每次 setStyle 后都重新加
  });
});
</script>

<style>
#map {
  width: 100vw;
  height: 100vh;
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
</style>
