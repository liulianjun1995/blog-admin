<template>
  <div class="editormd-container">
    <div id="editormd" />
  </div>
</template>

<script>
import script from 'scriptjs'

import config from './config'

export default {
  props: {

  },
  data() {
    return {
      editormd: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const _this = this
      script([
        '/editor.md/examples/js/jquery.min.js',
        '/editor.md/lib/raphael.min.js',
        '/editor.md/lib/flowchart.min.js'
      ], () => {
        script([
          '/editor.md/lib/marked.min.js',
          '/editor.md/lib/prettify.min.js',
          '/editor.md/lib/underscore.min.js',
          '/editor.md/lib/sequence-diagram.min.js',
          '/editor.md/lib/jquery.flowchart.min.js'
        ], () => {
          script([
            '/editor.md/editormd.js'
          ], () => {
            _this.initEditormd()
          })
        })
      })
    },
    initEditormd() {
      const _this = this
      _this.$nextTick((editorMd = window.editormd) => {
        if (editorMd) {
          _this.editormd = editorMd('editormd', config)
        }
      })
    },
    getMarkdown() {
      return this.editormd.getMarkdown()
    },
    getHtml() {
      return this.editormd.getHTML()
    }
  }
}
</script>

<style scoped>
  @import "/editor.md/css/editormd.css";

</style>
