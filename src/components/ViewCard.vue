<template>
  <div
    class="w-[133px] h-[70px] relative bg-[url('@/assets/view-card-bg.png')] bg-cover bg-center"
  >
    <div class="absolute top-[8px] left-[8px] flex">
      <img :src="image" alt="风景点" class="w-[40px] h-[40px] object-cover" />
      <div
        class="bg-[#fff] ml-[9px] w-[70px] h-[40px] text-[17px] text-[#242A36] leading-[40px] font-[500]"
      >
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>
