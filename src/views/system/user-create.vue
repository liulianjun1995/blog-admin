<template>
  <div class="app-containe">
    <aside>
      Editor.md 建立在众多优秀的开源组件基础之上，遵循和使用 MIT License 开源协议，无论个人还是公司，都可以免费自由使用。
      <a target="_blank" class="link-type" href="http://editor.md.ipandao.com"> 文档 </a>
    </aside>
    <el-button type="primary" size="medium" @click="getMarkDown">获取 Markdown</el-button>
    <el-button type="primary" size="medium" @click="getHtml">获取 Html</el-button>
    <EditorMd ref="editor-md" />
  </div>
</template>

<script>
import EditorMd from '@/components/EditorMd'

export default {
  name: 'UserCreate',
  components: {
    EditorMd
  },
  methods: {
    getMarkDown() {
      const markdown = this.$refs['editor-md'].getMarkdown()
      this.$alert(markdown, 'Markdown', {
        confirmButtonText: '确定'
      })
    },
    getHtml() {
      const html = this.$refs['editor-md'].getHtml()
      this.$alert(html, 'Html', {
        confirmButtonText: '确定'
      })
    }
  }
}
</script>

<style scoped>

</style>
