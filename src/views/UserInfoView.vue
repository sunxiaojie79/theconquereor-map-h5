<template>
  <div class="w-full h-full bg-[#242A36]">
    <div class="w-full h-[44px] bg-[#242A36] flex items-center justify-center relative">
      <div class="w-[12px] h-[44px] flex items-center justify-center absolute left-[16px]">
        <van-icon name="arrow-left" size="20" color="#fff" @click="goBack"/>
      </div>
      <div class="text-[17px] font-[500] text-[#fff]">
        挑战者信息
      </div>
    </div>
    <div class="w-full px-[16px] py-[24px]">
      <div class="w-[343px] h-[48px] flex justify-start items-center pb-[8px] text-[#fff]">
        <img class="w-[40px] h-[40px] rounded-full mr-[16px]" src="https://i.pravatar.cc/50" mode="aspectFill"></img>
        <span class="text-[17px] font-[500] text-[#fff]">微信用户</span>
      </div>
      <!-- 运动数据统计 -->
      <div class="w-[343px] h-[108px] mb-[8px] rounded-[12px]">
        <div class="w-[343px] h-[72px] flex justify-between  py-[12px] rounded-t-[8px] bg-[#434a58] ">
          <div class="h-[48px] flex flex-col items-center flex-1">
            <span class="text-[14px] text-[#fff] mb-[4px]">累计跑量</span>
            <span class="text-[17px] font-[500] text-[#fff]">165.20km</span>
          </div>
          <div class="h-[48px] flex flex-col items-center flex-1">
            <span class="text-[14px] text-[#fff] mb-[4px]">本月跑量</span>
            <span class="text-[17px] font-[500] text-[#fff]">165.20km</span>
          </div>
          <div class="h-[48px] flex flex-col items-center flex-1">
            <span class="text-[14px] text-[#fff] mb-[4px]">本年跑量</span>
            <span class="text-[17px] font-[500] text-[#fff]">165.20km</span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="w-[343px] h-[36px] flex justify-between p-[8px] rounded-b-[8px] bg-[#fff] ">
          <div class="flex-1 flex justify-around items-center border-r border-[#E5E5E5]">
            <span class="action-text">挑战中</span>
            <span class="text-[17px] text-[#7B412D] font-[500]">2</span>
          </div>
          <div class="flex-1 flex justify-around items-center border-r border-[#E5E5E5]">
            <span class="action-text">挑战成功</span>
            <span class="text-[17px] text-[#7B412D] font-[500]">2</span>
          </div>
          <div class="flex-1 flex justify-around items-center">
            <span class="action-text">组</span>
            <span class="text-[17px] text-[#7B412D] font-[500]">2</span>
          </div>
        </div>

        <!-- 挑战进展 -->
        <div class="w-[343px] mt-[24px] ">
          <div class="text-[17px] font-[500] text-[#fff] mb-[12px]">用户的进展</div>
          <div class="w-[343px]  px-[12px] rounded-[8px] bg-[#434a58]">
            <div v-for="item in progressList" :key="item.title" class="w-[319px] h-[76px] flex flex-row items-center py-[12px] border-b border-gray-500"
            :class="{'border-b-0': item.title === progressList[progressList.length - 1].title}"
            >
              <img class="w-[48px] h-[48px] rounded-full mr-[12px]" src="https://i.pravatar.cc/50" mode="aspectFill"></img>
              <div class="flex flex-col">
                <div class="text-[17px] font-[500] text-[#fff] mb-[4px]">{{ item.title }}</div>
                <div class="text-[#FADB47]">
                  <span class="text-[17px] font-[600]">{{ item.progress }}</span>
                  <span class="text-[12px] font-[400]">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const progressList = [
  {
    title: '标题1',
    progress: 10,
  },
  {
    title: '标题2',
    progress: 20,
  },
  {
    title: '标题3',
    progress: 30,
  },
]

const goBack = () => {
  router.back()
}
</script>

<style scoped></style>