<template>
  <div class="main-content">
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-title">活跃用户</div>
        <div class="stat-value">1,234</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">今日访问</div>
        <div class="stat-value">567</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">系统告警</div>
        <div class="stat-value">3</div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%; margin-top: 32px;">
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="status" label="状态" width="120" />
      <el-table-column prop="desc" label="描述" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MainView',
  data() {
    return {
      tableData: [
        { name: '服务A', status: '运行中', desc: '主业务服务' },
        { name: '服务B', status: '已停止', desc: '测试服务' },
        { name: '服务C', status: '运行中', desc: '数据采集服务' },
        { name: '服务D', status: '异常', desc: '告警服务' }
      ]
    }
  }
}
</script>

<style scoped>
.main-content {
  padding: 32px;
}
.stats-cards {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}
.stat-card {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 20px 32px;
  min-width: 160px;
  box-shadow: 0 2px 8px #0001;
}
.stat-title {
  color: #888;
  font-size: 14px;
  margin-bottom: 8px;
}
.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}
</style>
