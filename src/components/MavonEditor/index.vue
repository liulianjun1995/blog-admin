<template>
  <mavonEditor
    ref="md"
    :value="value"
    :autofocus="false"
    :toolbars="options"
    code-style="monokai"
    :style="{'min-height': minHeight}"
    @imgAdd="imgAdd"
    @imgDel="imgDel"
    @change="change"
  />
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import defaultOptions from './default-options'

import { uploadImage, deleteImage } from '@/api/article'

export default {
  name: 'MavonEditor',
  components: {
    mavonEditor
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return defaultOptions
      }
    },
    value: {
      type: String,
      default: ''
    },
    minHeight: {
      type: String,
      default: '300px'
    }
  },
  methods: {
    change(value) {
      this.$emit('change', value)
    },
    // 绑定@imgAdd event
    imgAdd(pos, $file) {
      const _this = this
      // 第一步.将图片上传到服务器.
      const formData = new FormData()
      formData.append('cover', $file)
      uploadImage(formData).then(res => {
        _this.$refs.md.$img2Url(pos, res.data.url)
      })
    },
    imgDel(pos) {
      if (pos.length <= 0) {
        return false
      }
      deleteImage(pos[0]).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-note-wrapper {
    z-index: unset;
    &.fullscreen {
      z-index: 1500;
    }
  }
</style>
