<template>
  <van-swipe-cell>
    <div
      class="w-full h-[68px] py-[12px] flex bg-[#fff] border-b border-[rgba(0, 0, 0, 0.09)]"
    >
      <img :src="image" alt="跑步" class="w-[44px] h-[44px] mr-[8px]" />
      <div class="flex-1 flex flex-col justify-center">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-[17px] text-[#7B412D] font-[600] mr-[2px]">{{
              distance
            }}</span>
            <span class="text-[12px] text-[#7B412D] font-[400]">km</span>
          </div>
          <span class="text-[14px] text-[rgba(0, 0, 0, 0.65)] font-[400]">{{
            time
          }}</span>
        </div>
        <div class="flex items-center justify-start">
          <template v-if="source === 'wechat'">
            <img
              src="@/assets/icon-wechat.png"
              alt="微信"
              class="w-[16px] h-[13px] mr-[4px]"
            />
            <span class="text-[12px] text-[rgba(0, 0, 0, 0.45)]"
              >来自微信运动</span
            >
          </template>
          <span v-else class="text-[12px] text-[rgba(0, 0, 0, 0.45)]"
            >手动录入</span
          >
        </div>
      </div>
    </div>
    <template #right>
      <div class="w-[56px] h-full flex flex-col items-center justify-center">
        <div
          class="w-[32px] h-[32px] bg-[#F02525] rounded-[16px] flex items-center justify-center"
        >
          <van-icon size="16" class="text-[#fff]" name="delete-o" />
        </div>
      </div>
    </template>
  </van-swipe-cell>
</template>

<script setup>
import { computed } from "vue";
import swimmingYellow from "@/assets/icon-swimming-yellow.png";
import runningYellow from "@/assets/icon-running-yellow.png";
import runningIndoorYellow from "@/assets/icon-running-indoor-yellow.png";
import walkingYellow from "@/assets/icon-walking-yellow.png";
import walkingIndoorYellow from "@/assets/icon-walking-indoor-yellow.png";
import cyclingYellow from "@/assets/icon-cycling-yellow.png";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const image = computed(() => {
  switch (props.type) {
    case "游泳":
      return swimmingYellow;
    case "跑步":
      return runningYellow;
    case "室内跑步":
      return runningIndoorYellow;
    case "步行":
      return walkingYellow;
    case "室内步行":
      return walkingIndoorYellow;
    case "骑行":
      return cyclingYellow;
    default:
      return swimmingYellow;
  }
});
</script>
