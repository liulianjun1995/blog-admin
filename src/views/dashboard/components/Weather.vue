<template>
  <el-card class="weather-content">
    <el-row class="content-row">
      <el-avatar class="user-avatar" :src="avatar" />
      <div class="weather-tips">
        <p class="weather-tip-title">早安，{{ name }}，开始您一天的工作吧！</p>
        <p class="weather-tip-desc"><svg-icon icon-class="weather" /> 今日阴转小雨，22℃ - 32℃，出门记得带伞哦。</p>
      </div>
    </el-row>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Weather',
  computed: {
    ...mapGetters([
      'avatar',
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .weather-content {
    .header-title {
      display: inline-block;
      color: #17233d;
      font-weight: 500;
      font-size: 20px;
    }
    .user-avatar {
      width: 64px;
      height: 64px;
      margin-right: 20px;
    }
    .weather-tips {
      display: inline-block;
      .weather-tip-title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 12px;
        color: #515a6e;
      }
      .weather-tip-desc {
        color: #808695;
      }
    }
  }
</style>
