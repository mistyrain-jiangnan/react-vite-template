<template>
  <el-drawer
    class="navigation-hidden-menu"
    direction="ltr"
    :visible="visible"
    size="200px"
    :modal="false"
    :with-header="false"
    @close="$emit('update:visible', false)"
  >
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      @open="$emit('open', ...arguments)"
      @close="$emit('close', ...arguments)"
      background-color="#3B3E40FF"
      text-color="#fff"
    >
      <div v-for="group in menuGroups" :key="group.title">
        <div class="el-menu-item-group__title" style="padding-left: 20px;">{{ group.title }}</div>
        <router-link
          v-for="item in group.items"
          :key="item.index"
          :to="item.route"
          style="text-decoration: none; color: inherit;"
          @click.native="handleMenuClick(group, item)"
        >
          <el-menu-item
            class="el-menu-li"
            :index="item.index"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>
        </router-link>
      </div>
    </el-menu>
  </el-drawer>
</template>

<script>
import { menuGroups } from '../router/menuConfig.js'
export default {
  name: 'SideDrawer',
  props: {
    visible: Boolean
  },
  data() {
    return {
      menuGroups
    }
  },
  methods: {
    handleMenuClick(group, item) {
      let menuItems = []
      let menuTitle = group.title
      if (item.menuItem) {
        menuItems = item.menuItem
        menuTitle = item.label
      } else {
        menuItems = [item]
        menuTitle = group.title
      }
      this.$emit('menu-change', { menuItems, menuTitle })
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
.navigation-hidden-menu {
  height: calc(100vh - 60px);
  margin-top: 60px;
}
.el-menu-vertical {
  height: calc(100vh - 60px);
}
.el-menu-li i {
  margin-right: 12px;
}
</style>
