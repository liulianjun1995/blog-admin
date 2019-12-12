<template>
  <div class="dashboard-container">
    <el-row class="dashboard-container-row">
      <Weather />
    </el-row>
    <el-row class="dashboard-container-row">
      <panel-group @handleSetLineChartData="handleSetLineChartData" />
    </el-row>
    <el-row class="dashboard-container-row">
      <OperateGroup />
    </el-row>
  </div>
</template>

<script>
import Weather from './components/Weather'
import PanelGroup from './components/PanelGroup'
import OperateGroup from './components/OperateGroup'

import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Weather,
    PanelGroup,
    OperateGroup
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
  .dashboard-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .dashboard-container-row {
      margin-bottom: 10px;
    }
  }
</style>
