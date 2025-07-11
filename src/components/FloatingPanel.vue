<template>
  <div
    ref="panelRef"
    class="fixed w-screen bottom-[60px] left-0 right-0 bg-[#eee] shadow-lg z-50"
    :style="{
      transform: `translateY(${offset}px)`,
      transition: isDragging ? 'none' : 'transform 0.3s ease',
    }"
  >
    <!-- 头部区域 - 始终可拖拽 -->
    <div
      class="cursor-grab active:cursor-grabbing bg-[#fff]"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
    >
      <!-- 拖拽指示器 -->
      <div class="flex justify-center py-3">
        <div class="w-10 h-1 bg-[#fff] rounded-full"></div>
      </div>

      <!-- 头部内容插槽 -->
      <div class="px-4 pb-2">
        <slot name="header"></slot>
      </div>
    </div>

    <!-- 内容区域 - 根据 contentDraggable 属性决定是否可拖拽 -->
    <div
      class="h-[calc(100vh-120px)] overflow-y-auto"
      :class="{ 'cursor-grab active:cursor-grabbing': contentDraggable }"
      @touchstart="contentDraggable ? handleTouchStart : null"
      @touchmove="contentDraggable ? handleTouchMove : null"
      @touchend="contentDraggable ? handleTouchEnd : null"
      @mousedown="contentDraggable ? handleMouseDown : null"
      @mousemove="contentDraggable ? handleMouseMove : null"
      @mouseup="contentDraggable ? handleMouseUp : null"
      @mouseleave="contentDraggable ? handleMouseUp : null"
    >
      <!-- 内容插槽 -->
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  // 自定义锚点位置，值为高度，单位 px
  anchors: {
    type: Array,
    default: () => [100, 400, 600],
  },
  // 初始位置，0 表示第一个锚点，1 表示第二个锚点，以此类推
  initialPosition: {
    type: Number,
    default: 0,
  },
  // 内容区域是否可拖拽
  contentDraggable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["change", "heightChange"]);

const panelRef = ref(null);
const isDragging = ref(false);
const startY = ref(0);
const startOffset = ref(0);

// 计算初始偏移量
const initialOffset = computed(() => {
  const initialAnchor =
    props.anchors[props.initialPosition] || props.anchors[0] || 100;
  return window.innerHeight - initialAnchor;
});

const offset = ref(initialOffset.value);

// 找到最近的锚点位置
const findNearestAnchor = (currentOffset) => {
  const currentPosition = window.innerHeight - currentOffset;
  return props.anchors.reduce((prev, curr) => {
    return Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition)
      ? curr
      : prev;
  });
};

// 触摸事件处理
const handleTouchStart = (e) => {
  console.log("Touch start detected");
  isDragging.value = true;
  startY.value = e.touches[0].clientY;
  startOffset.value = offset.value;
  e.preventDefault();
};

const handleTouchMove = (e) => {
  if (!isDragging.value) return;
  console.log("Touch move detected");

  e.preventDefault();
  e.stopPropagation();

  const currentY = e.touches[0].clientY;
  const deltaY = currentY - startY.value;
  const newOffset = startOffset.value + deltaY;

  // 限制拖拽范围
  const maxHeight = Math.max(...props.anchors);
  const minHeight = Math.min(...props.anchors);
  const minOffset = window.innerHeight - maxHeight;
  const maxOffset = window.innerHeight - minHeight;

  offset.value = Math.max(minOffset, Math.min(maxOffset, newOffset));

  // 发出高度变化事件
  emit("heightChange", window.innerHeight - offset.value);
};

const handleTouchEnd = (e) => {
  if (!isDragging.value) return;
  console.log("Touch end detected");

  isDragging.value = false;
  e.preventDefault();

  // 自动吸附到最近的锚点位置
  const nearestAnchor = findNearestAnchor(offset.value);
  offset.value = window.innerHeight - nearestAnchor;

  // 发出位置变化事件
  const currentPosition = props.anchors.indexOf(nearestAnchor);
  emit("change", currentPosition);
};

// 鼠标事件处理（用于桌面端测试）
const handleMouseDown = (e) => {
  console.log("Mouse down detected");
  isDragging.value = true;
  startY.value = e.clientY;
  startOffset.value = offset.value;
  e.preventDefault();
};

const handleMouseMove = (e) => {
  if (!isDragging.value) return;
  console.log("Mouse move detected");

  e.preventDefault();
  e.stopPropagation();

  const currentY = e.clientY;
  const deltaY = currentY - startY.value;
  const newOffset = startOffset.value + deltaY;

  // 限制拖拽范围
  const maxHeight = Math.max(...props.anchors);
  const minHeight = Math.min(...props.anchors);
  const minOffset = window.innerHeight - maxHeight;
  const maxOffset = window.innerHeight - minHeight;

  offset.value = Math.max(minOffset, Math.min(maxOffset, newOffset));

  // 发出高度变化事件
  emit("heightChange", window.innerHeight - offset.value);
};

const handleMouseUp = (e) => {
  if (!isDragging.value) return;
  console.log("Mouse up detected");

  isDragging.value = false;
  e.preventDefault();

  // 自动吸附到最近的锚点位置
  const nearestAnchor = findNearestAnchor(offset.value);
  offset.value = window.innerHeight - nearestAnchor;

  // 发出位置变化事件
  const currentPosition = props.anchors.indexOf(nearestAnchor);
  emit("change", currentPosition);
};

// 监听窗口大小变化，重新计算位置
onMounted(() => {
  const handleResize = () => {
    offset.value = window.innerHeight - props.anchors[props.initialPosition];
  };

  window.addEventListener("resize", handleResize);

  // 组件卸载时移除事件监听
  return () => {
    window.removeEventListener("resize", handleResize);
  };
});

// 暴露方法给父组件
defineExpose({
  offset,
});
</script>
