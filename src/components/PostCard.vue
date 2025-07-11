<template>
  <div class="postcard-section">
    <!-- 左侧图片区域 -->
    <div class="postcard-left">
      <!-- <image class="city-image" src="/static/bg/home-bg.jpg" mode="aspectFill"></image> -->
      <!-- 城市名称 -->
      <div class="city-name-overlay">
        <span class="city-name">城市名称</span>
      </div>
      <!-- 底部信息 -->
      <div class="bottom-info">
        <div class="progress-info">
          <span class="progress-text">完成：78.121</span>
          <span class="progress-text">剩余：78.121</span>
        </div>
        <div class="avatar-container">
          <img
            class="user-avatar"
            src="@/assets/view-bg.png"
            mode="aspectFill"
          />
        </div>
      </div>
    </div>

    <!-- 右侧内容区域 -->
    <div class="postcard-right">
      <!-- 邮票区域 -->
      <div class="stamp-section">
        <div class="stamp-container">
          <img
            class="stamp-image"
            src="@/assets/stamp.png"
            mode="aspectFill"
          ></img>
          <!-- 邮戳 -->
          <div class="postmark-container">
            <img
              class="postmark-bg"
              src="@/assets/postmark.png"
              mode="aspectFit"
            ></img>
            <div class="postmark-content">
              <span class="postmark-date">12.30</span>
              <span class="postmark-year">2025</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧文字内容 -->
      <div class="right-text-content">
        <span class="greeting-text">你好，</span>
        <span class="main-text">吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* 明信片样式 */
.postcard-section {
  display: flex;
  width: 343px;
  height: 240px;
  background: #fdf7f1;
  border: 3px solid #dbcdbf;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-bottom: 32px;
  padding: 8px;
  box-sizing: border-box;
}

/* 左侧图片区域 */
.postcard-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 159px;
  height: 220px;
  background-image: url("@/assets/view-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
}

.city-name-overlay {
  width: 100%;
  height: 30px;
  background: rgba(0, 0, 0, 0.45);
  padding-left: 8px;
  line-height: 30px;
  box-sizing: border-box;
}

.city-name {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
}

.bottom-info {
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.45);
  padding: 8px;
  box-sizing: border-box;
}

.progress-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.progress-text {
  display: block;
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  line-height: 1.3;
  font-weight: normal;
}

.avatar-container {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  border: 2rpx solid #cdd5d7;
}

.user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 右侧内容区域 */
.postcard-right {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

/* 邮票区域 */
.stamp-section {
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-end;
}

.stamp-container {
  position: relative;
  width: 60px;
  height: 40px;
}

.stamp-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
  border: 1px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.postmark-container {
  position: absolute;
  top: 0px;
  left: -22.5px;
  width: 32.5px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.postmark-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.8;
}

.postmark-content {
  position: relative;
  left: -2.5px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotate(-20deg);
}

.postmark-date {
  font-size: 8px;
  color: #3d3d3d;
  font-weight: 500;
  text-align: center;
}

.postmark-year {
  font-size: 6px;
  color: #3d3d3d;
  font-weight: 500;
  text-align: center;
}

/* 右侧文字内容 */
.right-text-content {
  flex: 1;
  overflow: hidden;
}

.greeting-text {
  display: block;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
}

.main-text {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 1.6;
  display: block;
}
</style>
