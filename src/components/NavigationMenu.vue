<template>
  <div class="navigation-menu">
    <div class="navigation-menu-header">
      <i :class="menuIcon" style="margin-right: 12px; font-weight: bold"></i>
      <span style="font-size: 16px" slot="title">{{ menuTitle }}</span>
    </div>
    <el-menu
      :default-active="currentActive"
      :key="currentActive + '-' + menuItems.map(i => i.route).join(',')"
      class="el-menu-vertical"
      @open="$emit('open', ...arguments)"
      @close="$emit('close', ...arguments)">
      <el-menu-item
        v-for="item in menuItems"
        :key="item.index"
        class="el-menu-li"
        :index="item.route"
        @click="handleMenuClick(item)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavigationMenu',
  props: {
    menuItems: {
      type: Array,
      required: true
    },
    menuTitle: {
      type: String,
      default: ''
    },
    menuIcon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentActive: ''
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler() {
        this.setActiveMenuIndex()
      }
    },
    menuItems: {
      immediate: true,
      handler() {
        this.setActiveMenuIndex()
      }
    }
  },
  methods: {
    setActiveMenuIndex() {
      // 优先匹配最长的 route，保证子路由也能高亮
      let current = null
      let maxLen = 0
      for (const item of this.menuItems) {
        if (this.$route.path.startsWith(item.route) && item.route.length > maxLen) {
          current = item
          maxLen = item.route.length
        }
      }
      const value = current ? current.route : (this.menuItems.length ? this.menuItems[0].route : '')
      this.currentActive = value
    },
    handleMenuClick(item) {
      if (this.$route.path !== item.route) {
        this.$router.push({ path: item.route, replace: true })
      }
    }
  }
}
</script>

<style scoped>
.navigation-menu {
  width: 200px;
  height: calc(100vh - 60px);
  border-right: solid 1px #e6e6e6;
}
.navigation-menu-header {
  padding: 20px 20px 16px;
  cursor: pointer;
  font-size: 26px;
  font-weight: bolder;
  align-items: center;
  display: flex;
  color: #3B3E40FF;
}
.el-menu-vertical {
  height: calc(100vh - 60px);
}
.el-menu-li i {
  margin-right: 12px;
}
</style>

