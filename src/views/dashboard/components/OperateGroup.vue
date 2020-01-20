<template>
  <el-row :gutter="20" class="operate-group">
    <el-col :xs="8" :sm="6" :lg="3">
      <div class="card-operate">
        <div class="card-operate-icon-wrapper">
          <svg-icon icon-class="peoples" class-name="card-operate-icon icon-people" />
          <p>用户</p>
        </div>
      </div>
    </el-col>
    <el-col :xs="8" :sm="6" :lg="3">
      <div class="card-operate">
        <div class="card-operate-icon-wrapper">
          <svg-icon icon-class="article" class-name="card-operate-icon icon-article" />
          <p>文章</p>
        </div>
      </div>
    </el-col>
    <el-col :xs="8" :sm="6" :lg="3">
      <div class="card-operate">
        <div class="card-operate-icon-wrapper">
          <svg-icon icon-class="message" class-name="card-operate-icon icon-message" />
          <p>消息</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'OperateGroup'
}
</script>

<style lang="scss" scoped>
  .operate-group {
    .card-operate {
      height: 95px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      border-radius: 4px;
      text-align: center;
      &:hover {
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        border-color: #eee;
        .card-operate-icon-wrapper {
          .card-operate-icon {
            font-size: 40px;
          }
          p {
            color: #36a3f7;
          }
        }
      }
      .card-operate-icon-wrapper {
        height: 100%;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
        .icon-people {
          color: #40c9c6;
        }
        .icon-article {
          color: #95DE64;
        }
        .icon-message {
          color: #36a3f7;
        }
        p {
          font-size: 14px;
        }
      }
      .card-operate-icon {
        font-size: 32px;
      }
    }
  }
  @media (max-width:550px) {
    .card-operate {
      height: 50px;
      .card-operate-icon-wrapper {
        float: none !important;
        width: 100%;
        height: 100%;
        margin: 0 !important;
        p {
          display: none;
        }
        .svg-icon {
          display: block;
          margin: 14px auto !important;
          float: none !important;
        }
      }
    }
  }
</style>
