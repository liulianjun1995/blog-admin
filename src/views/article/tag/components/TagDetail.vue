<template>
  <div class="createTag-container">
    <div class="createTag-main-container">
      <el-form ref="TagForm" :model="tag" label-width="50px">
        <el-form-item label="标题">
          <el-input v-model="tag.title" placeholder="标题" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="tag.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          />
          {{ tag.status | statusFilter }}
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button size="medium">取消</el-button>
          <el-button size="medium" type="primary" @click="handleSubmit">创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { createTag } from '@/api/article'

export default {
  name: 'TagDetail',
  filters: {
    statusFilter(status) {
      if (status === 1) {
        return '启用'
      }
      return '禁用'
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tag: {
        title: '',
        status: 1
      }
    }
  },
  methods: {
    handleSubmit() {
      const _this = this
      createTag(_this.tag).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .createTag-container {
    position: relative;
    .createTag-main-container {
      padding: 40px 45px 20px 50px;
    }
  }
</style>
