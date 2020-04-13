<template>
  <mavonEditor
    ref="md"
    :value="value"
    :autofocus="false"
    :toolbars="options"
    code-style="dracula"
    :style="{'min-height': minHeight}"
    @imgAdd="imgAdd"
    @change="change"
  />
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import defaultOptions from './default-options'
import { ApiGetSignature } from '@/api/oss'
import { makeRandomFileName } from '@/utils'
import axios from 'axios'

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
      const fileName = makeRandomFileName($file.name)
      ApiGetSignature({ dir: 'article' }).then((res) => {
        const data = new FormData()
        const url = res.data.host
        const key = res.data.dir + fileName
        data.append('policy', res.data.policy)
        data.append('OSSAccessKeyId', res.data.accessid)
        data.append('signature', res.data.signature)
        data.append('host', res.data.host)
        data.append('callback', res.data.callback)
        data.append('key', res.data.dir + fileName)
        data.append('file', $file)
        data.append('success_action_status', 200)
        axios.post(url, data).then(res => {
          if (res.status === 200) {
            _this.$refs.md.$img2Url(pos, url + key)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~mavon-editor/dist/css/index.css";
  .v-note-wrapper {
    z-index: unset;
    &.fullscreen {
      z-index: 1500;
    }
  }
</style>
