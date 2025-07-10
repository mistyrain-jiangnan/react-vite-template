<template>
  <div class="container">
    <AppHeader :isCollapse="isCollapse" @toggle-collapse="isCollapse = !isCollapse" />
    <div class="layout-body">
      <NavigationMenu :menuItems="currentMenuItems" :menuTitle="currentMenuTitle" :menuIcon="currentMenuIcon" @open="handleOpen" @close="handleClose" class="navigation-menu" />
      <div class="main-router-view">
        <router-view />
      </div>
    </div>
    <SideDrawer :visible="isCollapse" @update:visible="isCollapse = $event" @open="handleOpen" @close="handleClose" />
  </div>
</template>

<script>
import AppHeader from '../components/Header.vue'
import SideDrawer from '../components/SideDrawer.vue'
import NavigationMenu from '../components/NavigationMenu.vue'
import { menuGroups } from '../router/menuConfig.js'

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    SideDrawer,
    NavigationMenu
  },
  data() {
    return {
      activeIndex: '1',
      isCollapse: false,
      currentMenuItems: [],
      currentMenuTitle: '',
      currentMenuIcon: ''
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        // 默认路由直接展示第一个有 menuItem 的菜单
        if (to.path === '/' || to.path === '') {
          for (const group of menuGroups) {
            for (const item of group.items) {
              if (item.menuItem) {
                this.currentMenuItems = item.menuItem
                this.currentMenuTitle = item.label
                this.currentMenuIcon = item.icon
                return
              }
            }
          }
        }
        let found = false
        for (const group of menuGroups) {
          for (const item of group.items) {
            // 二级菜单（有 menuItem）
            if (item.menuItem && to.path.startsWith(item.route)) {
              this.currentMenuItems = item.menuItem
              this.currentMenuTitle = item.label
              this.currentMenuIcon = item.icon
              found = true
              break
            } else if (!item.menuItem && item.route && to.path.startsWith(item.route)) {
              // 一级菜单（无 menuItem）
              this.currentMenuItems = [item]
              this.currentMenuTitle = group.title
              this.currentMenuIcon = item.icon
              found = true
              break
            }
          }
          if (found) break
        }
        if (!found) {
          // fallback: 展示第一个有 menuItem 的菜单
          for (const group of menuGroups) {
            for (const item of group.items) {
              if (item.menuItem) {
                this.currentMenuItems = item.menuItem
                this.currentMenuTitle = item.label
                this.currentMenuIcon = item.icon
                return
              }
            }
          }
        }
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.layout-body {
  display: flex;
  flex: 1;
  height: calc(100vh - 60px); /* 60px为Header高度 */
}

.navigation-menu {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  height: 100%;
  border-right: solid 1px #e6e6e6;
  background: #fff;
}

.main-router-view {
  flex: 1;
  overflow: auto;
  background: #fafbfc;
  padding: 32px 0 0 0;
  min-width: 0;
}
</style>
