<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <Notification class="notification-container right-menu-item hover-effect" />
      <el-dropdown placement="bottom" class="avatar-container right-menu-item hover-effect" trigger="hover">
        <div class="avatar-wrapper">
          <el-avatar class="user-avatar" size="small" :src="avatar+'?imageView2/1/w/80/h/80'" />
          <span class="user-name">{{ name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              <svg-icon icon-class="dashboard" /> 首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/setting/user">
            <el-dropdown-item>
              <svg-icon icon-class="user-center" /> 个人中心
            </el-dropdown-item>
          </router-link>
          <router-link to="/setting/account">
            <el-dropdown-item>
              <svg-icon icon-class="systemSet" /> 设置
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout"><svg-icon icon-class="log-out" /> 退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <RightPanel class="right-panel-container right-menu-item hover-effect" @click="showSettings" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Notification from '@/components/Notification'
import RightPanel from '@/components/RightPanel'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Notification,
    RightPanel
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    showSettings() {
      this.$store.dispatch('settings/changeSetting', {
        key: 'showSettings',
        value: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .notification-container {
      padding: 0 15px;
      width: 60px;
    }

    .avatar-container {
      .avatar-wrapper {
        .user-name {
          font-size: 14px;
        }

        .user-avatar {
          vertical-align: middle;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

  }
}
</style>
