<template>
  <el-upload
    :action="uploadUrl"
    :on-success="handleSuccess"
    :dir="dir"
    :before-upload="handleBeforeUpload"
    :show-file-list="false"
    :data="uploadData"
    :on-error="handleError"
  >
    <slot name="upload" />
  </el-upload>
</template>

<script>
import { ApiGetSignature } from '@/api/oss'
import { makeRandomFileName } from '@/utils'

export default {
  name: 'Upload',
  props: {
    dir: {
      type: String,
      default: 'avatar'
    }
  },
  data() {
    return {
      uploadUrl: '',
      uploadData: {}
    }
  },
  methods: {
    // 文件上传成功处理
    handleSuccess() {
      const url = this.uploadData.host + this.uploadData.key
      this.$emit('success', url)
    },
    // 上传之前处理动作
    async handleBeforeUpload(file) {
      const _this = this
      const fileName = makeRandomFileName(file.name)
      try {
        const res = await ApiGetSignature({ dir: _this.dir })
        _this.uploadUrl = res.data.host
        _this.uploadData.policy = res.data.policy
        _this.uploadData.OSSAccessKeyId = res.data.accessid
        _this.uploadData.signature = res.data.signature
        _this.uploadData.host = res.data.host
        _this.uploadData.callback = res.data.callback
        _this.uploadData.key = res.data.dir + fileName
        _this.uploadData.success_action_status = 200
      } catch (error) {
        this.$message.error('获取上传配置失败')
      }
    },
    // 上传失败处理
    handleError() {
      this.$message.error('上传失败')
    }
  }
}
</script>

<style scoped>

</style>
