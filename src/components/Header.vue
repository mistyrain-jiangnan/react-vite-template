<template>
  <div class="container-header">
    <div class="navigation-header">
      <div class="header-title">
        <i :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="$emit('toggle-collapse')"></i>
        <img src="../assets/logo-mini.png" style="width: 42px; margin-left: 32px; margin-right: 8px" alt="power">
        <span style="font-weight: bold">Cloud</span>
      </div>
      <div class="header-items">
        <el-dropdown :hide-on-click="false">
          <i class="el-icon-chat-line-square"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            <i class="el-icon-question el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>产品文档</el-dropdown-item>
            <el-dropdown-item>版本日志</el-dropdown-item>
            <el-dropdown-item>问题反馈</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown :hide-on-click="false">
          <i class="el-icon-message-solid"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown :hide-on-click="false">
          <i class="el-icon-user-solid"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    isCollapse: Boolean
  }
}
</script>

<style scoped>
.container-header {
  align-items: center;
  flex: 1;
  font-size: 14px;
  justify-content: flex-end;
  padding: 0 24px;
  width: 100%;
  height: 60px;
  z-index: 100;
  background-color: #3B3E40FF;
}
.navigation-header {
  align-items: center;
  flex: 1;
  font-size: 14px;
  height: 60px;
  display: flex;
  justify-content: space-between;
}
.header-title {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-size: 20px;
  font-weight: 450;
  margin-left: 0;
}
.header-items {
  padding: 12px;
}
.header-items .el-dropdown {
  margin-left: 12px;
  font-size: 16px;
  color: #ffffff;
}
</style>
