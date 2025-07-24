<template>
  <div
    class="w-[120px] h-[156px] flex items-center flex-col bg-[#7B412D] mt-[8px]"
  >
    <div
      class="w-[120px] h-[25px] border-b-[1px] border-[#FFFFFF] flex items-center justify-center text-[12px] text-[#FFFFFF]"
    >
      {{ name }}
    </div>
    <div
      class="w-[120px] h-[106px] flex flex-col items-center justify-center border-b-[1px] border-[#FFFFFF]"
    >
      <img :src="image" alt="骑行" class="w-[20px] h-[20px]" />
      <span class="text-[17px] text-[#FFFFFF]">{{ type }}</span>
      <span class="text-[14px] text-[#FFFFFF]">{{ distance }}km</span>
    </div>
    <div class="w-[120px] h-[25px] flex items-center justify-center">
      <span class="text-[12px] text-[#FFFFFF]">{{ date }}</span>
    </div>
  </div>
  <!-- 活动12 -->
  <!-- <div class="w-[120px] h-[208px] flex flex-col mt-[8px]">
                    <div
                      class="w-[120px] h-[156px] flex items-center flex-col bg-[#7B412D]"
                    >
                      <div
                        class="w-[120px] h-[25px] border-b-[1px] border-[#FFFFFF] flex items-center justify-center text-[12px] text-[#FFFFFF]"
                      >
                        活动12
                      </div>
                      <div
                        class="w-[120px] h-[106px] flex flex-col items-center justify-center border-b-[1px] border-[#FFFFFF]"
                      >
                        <img
                          src="@/assets/icon-running-white.png"
                          alt="跑步"
                          class="w-[22px] h-[26px]"
                        />
                        <span class="text-[17px] text-[#FFFFFF]">跑步</span>
                        <span class="text-[14px] text-[#FFFFFF]">20km</span>
                      </div>
                    </div>
                    <div
                      class="flex flex-col items-center justify-center mt-[12px] w-[64px] h-[40px]"
                    >
                      <img
                        src="@/assets/icon-top.png"
                        alt="顶部"
                        class="w-[12px] h-[16px] object-cover"
                      />
                      <span class="text-[17px] text-[#7B412D]">50.2km</span>
                    </div>
                  </div> -->
</template>

<script setup>
import { computed } from "vue";
import cyclingWhite from "@/assets/icon-cycling-white.png";
import swimmingWhite from "@/assets/icon-swimming-white.png";
import runningWhite from "@/assets/icon-running-white.png";
import runningIndoorWhite from "@/assets/icon-running-indoor-white.png";
import walkingWhite from "@/assets/icon-walking-white.png";
import walkingIndoorWhite from "@/assets/icon-walking-indoor-white.png";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
const image = computed(() => {
  switch (props.type) {
    case "骑行":
      return cyclingWhite;
    case "游泳":
      return swimmingWhite;
    case "跑步":
      return runningWhite;
    case "室内跑步":
      return runningIndoorWhite;
    case "步行":
      return walkingWhite;
    case "室内步行":
      return walkingIndoorWhite;
    default:
      return cyclingWhite;
  }
});
</script>
