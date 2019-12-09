<template>
  <div class="app-container">
    <aside>
      基于Vue的 markdown 编辑器，支持多种个性化功能
      <a target="_blank" class="link-type" href="http://editor.md.ipandao.com"> 文档 </a>
    </aside>
    <el-row class="editor-container">
      <el-button type="primary" size="medium" @click="getMarkDown">获取markdown</el-button>
    </el-row>
    <el-row class="editor-container mavonEditor">
      <mavon-editor ref="mavon-editor" />
    </el-row>
  </div>
</template>

<script>
import MavonEditor from '@/components/MavonEditor'

export default {
  name: 'UserCreate',
  components: {
    MavonEditor
  },
  methods: {
    getMarkDown() {
      const _this = this
      _this.$alert(this.$refs['mavon-editor'].content, 'markdown', {
        confirmButtonText: '确定'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .editor-container{
    margin-bottom: 20px;
  }
  .mavonEditor {
    height: 100%;
  }
</style>
