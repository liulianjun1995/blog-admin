<template>
  <div class="dashboard-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'

import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSetLineChartData(type) {
      this.$message.success(type)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
