<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <user-card />
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Activity" name="activity">
              <Activity />
            </el-tab-pane>
            <el-tab-pane label="Timeline" name="timeline">
              <Timeline />
            </el-tab-pane>
            <el-tab-pane label="Account" name="account">
              account
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'

export default {
  name: 'UserCenter',
  components: {
    UserCard,
    Activity,
    Timeline
  },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar,
        tags: [
          { id: 1, title: '大神' },
          { id: 2, title: '最强王者' },
          { id: 3, title: '落地成盒' },
          { id: 4, title: '很有想法' },
          { id: 5, title: '懂点设计' },
          { id: 6, title: '菜烧的不错' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
