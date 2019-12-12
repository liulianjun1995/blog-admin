<template>
  <mavonEditor
    :value="value"
    :autofocus="false"
    :toolbars="options"
    code-style="monokai"
    :style="{'min-height': minHeight}"
    @change="change"
  />
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import defaultOptions from './default-options'

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
    }
  }
}
</script>

<style scoped>

</style>
