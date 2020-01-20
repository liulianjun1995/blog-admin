<template>
  <el-popover
    placement="bottom-start"
    width="300"
    trigger="click"
    @show="showPopover"
  >
    <el-tabs v-model="tab" stretch>
      <el-tab-pane v-loading="loading" label="通知" class="notice-tab" name="notice">
        <div class="content">
          <li v-for="notice in data.notices" :key="notice.id">
            <div class="view">
              <span v-text="notice.title" /><br>
              <span v-text="notice.time" />
            </div>
          </li>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消息" name="message">消息</el-tab-pane>
      <el-tab-pane label="代办" name="todo">代办</el-tab-pane>
    </el-tabs>
    <el-badge slot="reference" :value="200" :max="99" class="item">
      <svg-icon icon-class="notification" />
    </el-badge>
  </el-popover>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
      tab: 'notice',
      data: {
        notices: [
          { id: 1, title: '你收到了 14 份新周报', time: '一年前' },
          { id: 2, title: '你收到了 14 份新周报', time: '二年前' },
          { id: 4, title: '你收到了 14 份新周报', time: '三年前' },
          { id: 5, title: '你收到了 14 份新周报', time: '三年前' },
          { id: 6, title: '你收到了 14 份新周报', time: '三年前' },
          { id: 7, title: '你收到了 14 份新周报', time: '三年前' },
          { id: 8, title: '你收到了 14 份新周报', time: '三年前' },
          { id: 9, title: '你收到了 14 份新周报', time: '三年前' },
          { id: 10, title: '你收到了 14 份新周报', time: '三年前' },
          { id: 11, title: '你收到了 14 份新周报', time: '三年前' },
          { id: 12, title: '你收到了 14 份新周报', time: '三年前' },
          { id: 13, title: '你收到了 14 份新周报', time: '三年前' }
        ]
      },
      loading: true
    }
  },
  methods: {
    showPopover() {
      const _this = this
      _this.loading = true
      setTimeout(() => {
        _this.loading = false
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
  .notice-tab {
    .content {
      max-height: 350px;
      overflow-y: scroll;
      li {
        line-height: 22px;
        border-bottom: 1px solid #ededed;

        .view {
          padding: 12px 0;
        }
      }
    }

  }
  .item {
    .el-badge__content.is-fixed {
      top: 10px;
    }
  }
  li {
    list-style: none;
  }
</style>
