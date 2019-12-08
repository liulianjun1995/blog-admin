<template>
  <el-card style="margin-bottom:20px;">
    <div class="user-profile">
      <div class="box-center">
        <el-avatar class="user-avatar" :src="user.avatar" />
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role }}</div>
      </div>
    </div>
    <div class="user-bio">
      <div class="user-description user-bio-section">
        <div class="user-description-item">
          <svg-icon icon-class="office" />
        </div>
        <div class="user-description-detail">
          <span>后端工程师</span>
        </div>
      </div>
      <div class="user-description user-bio-section">
        <div class="user-description-item">
          <svg-icon icon-class="ios-git-network" />
        </div>
        <div class="user-description-detail">
          <span>中台-数据平台团队-前端创新团队-前端架构和平台工具团队</span>
        </div>
      </div>
      <div class="user-description user-bio-section">
        <div class="user-description-item">
          <svg-icon icon-class="position" />
        </div>
        <div class="user-description-detail">
          <span>北京-朝阳</span>
        </div>
      </div>
    </div>
    <el-divider />
    <div class="user-tags">
      <div class="tag-header">标签</div>
      <el-tag
        v-for="tag in user.tags"
        :key="tag.id"
        closable
        size="medium"
        @close="closeTag(tag)"
      >
        {{ tag.title }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="saveTagInput"
        v-model="inputTag"
        class="input-new-tag"
        size="small"
        @keyup.enter.native="inputTagConfirm"
        @blur="inputTagConfirm"
      />
      <el-tag v-else size="medium" :disable-transitions="true" style="cursor: pointer" type="info" @click="showInputTag">+</el-tag>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          roles: '',
          tags: []
        }
      }
    }
  },
  data() {
    return {
      inputTag: '',
      inputVisible: false
    }
  },
  methods: {
    closeTag(tag) {
      this.user.tags.splice(this.user.tags.indexOf(tag), 1)
    },
    inputTagConfirm() {
      if (this.inputTag) {
        this.user.tags.push({ id: this.user.tags.length + 1, title: this.inputTag })
      }
      this.inputVisible = false
      this.inputTag = ''
    },
    showInputTag() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .user-profile {
    .user-avatar {
      height: 100px;
      width: 100px;
    }
    .user-name {
      font-weight: bold;
    }
    .box-center {
      padding-top: 10px;
    }
    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;
    .user-bio-section {
      font-size: 14px;
      .user-description-item {
        display: table-cell;
        padding-bottom: 16px;
        line-height: 20px;
        color: #17233d;
        white-space: nowrap;
        margin-right: 5px;
        svg {
          margin-right: 8px !important;
        }
      }
      .user-description-detail {
        width: 100%;
        color: #515a6e;
        display: table-cell;
        padding-bottom: 16px;
        line-height: 20px;
      }
    }
  }

  .user-tags {
    .tag-header {
      margin-bottom: 12px;
      font-weight: 500;
      color: rgba(0,0,0,.85);
      font-size: 14px;
    }
    .el-tag {
      margin: 5px 2px;
    }
  }
</style>
