<template>
  <div class="navigation-menu">
    <div class="navigation-menu-header">
      <i :class="menuIcon" style="margin-right: 12px; font-weight: bold"></i>
      <span style="font-size: 16px" slot="title">{{ menuTitle }}</span>
    </div>
    <el-menu :default-active="activeMenuIndex" class="el-menu-vertical" @open="$emit('open', ...arguments)" @close="$emit('close', ...arguments)">
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
  computed: {
    activeMenuIndex() {
      // 让菜单高亮当前路由
      const current = this.menuItems.find(item => this.$route.path === item.route)
      return current ? current.route : ''
    }
  },
  methods: {
    handleMenuClick(item) {
      // 如果当前已在父级路由下，跳转到二级页面时 path 应为完整路径
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
