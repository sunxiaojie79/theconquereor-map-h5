<template>
  <div class="w-[96px] h-[48px] ml-[12px] mt-[70px] relative">
    <img
      src="@/assets/arrow-mile.png"
      alt="箭头"
      class="w-full h-full object-cover"
    />
    <div
      class="w-[60px] h-[20px] text-[14px] bg-[#7B412D] text-white text-center absolute top-4 left-0"
    >
      {{ distance }}km
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  distance: {
    type: String,
    required: true,
  },
});
</script>
