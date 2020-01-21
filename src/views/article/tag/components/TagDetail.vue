<template>
  <div class="createTag-container">
    <div class="createTag-main-container">
      <el-form ref="TagForm" v-loading="loading" :model="tag" label-width="50px">
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
          <el-button size="medium" @click="handleClose">取消</el-button>
          <el-button size="medium" type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetchTag, createTag, updateTag } from '@/api/article'

export default {
  name: 'TagDetail',
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '禁用',
        1: '启用'
      }
      return statusMap[status]
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tag: {
        title: '',
        status: 1
      },
      loading: false
    }
  },
  created() {
    if (this.isEdit) {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      const _this = this
      if (_this.id) {
        _this.loading = true
        fetchTag(_this.id).then(res => {
          res.data.status = _this.statusFormat(res.data.status)
          Object.assign(_this.tag, res.data)
        }).then(() => { _this.loading = false })
      }
    },
    handleSubmit() {
      const _this = this
      if (_this.isEdit) {
        updateTag(_this.id, _this.tag).then(() => {
          _this.$notify({
            title: '成功',
            message: '更新标签成功',
            type: 'success',
            duration: 2000
          })
          _this.$emit('update')
          _this.handleClose()
        })
      } else {
        createTag(_this.tag).then(() => {
          _this.$notify({
            title: '成功',
            message: '添加标签成功',
            type: 'success',
            duration: 2000
          })
          _this.$emit('update')
          _this.handleClose()
        })
      }
    },
    handleClose() {
      this.$emit('handleClose')
    },
    statusFormat(status) {
      const statusMap = {
        enabled: 1,
        disabled: 0
      }
      return statusMap[status]
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
