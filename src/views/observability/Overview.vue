/* eslint-disable */
<template>
  <div class="overview-page">
    <div class="overview-cards">
      <div class="overview-card" v-for="item in topStats" :key="item.label">
        <div class="overview-card-label">{{ item.label }}</div>
        <div class="overview-card-value">{{ item.value }}</div>
        <div class="overview-card-sub" v-if="item.sub">{{ item.sub }}</div>
      </div>
    </div>
    <div class="overview-row">
      <div class="overview-block">
        <div class="block-title">请求数</div>
        <div class="block-value">1633万</div>
        <div class="block-sub">日同比：<span class="green">-5.390%</span></div>
      </div>
      <div class="overview-block">
        <div class="block-title">错误数</div>
        <div class="block-value red">42.万</div>
        <div class="block-sub">日同比：<span class="red">11.058%</span></div>
      </div>
      <div class="overview-block">
        <div class="block-title">平均耗时</div>
        <div class="block-value">3.46ms</div>
        <div class="block-sub">日同比：<span class="green">-7.678%</span></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Chart } from '@antv/g2';
export default {
  name: 'ObservabilityOverview',
  data() {
    return {
      topStats: [
        { label: '在线应用数', value: 308 },
        { label: 'Trace数', value: 78561 },
        { label: 'Span数', value: 129154 },
        { label: 'Trace写入流量', value: '13.0 GiB' }
      ],
      topReqs: [
        { name: 'ad-risk', value: '448万' },
        { name: 'game-config', value: '320万' },
        { name: 'user-center', value: '210万' },
        { name: 'order', value: '120万' },
        { name: 'serverlist', value: '80万' }
      ],
      topErrs: [
        { name: 'ad-risk', value: '7.5万' },
        { name: 'game-config', value: '5.2万' },
        { name: 'user-center', value: '3.1万' },
        { name: 'order', value: '2.0万' },
        { name: 'serverlist', value: '1.2万' }
      ],
      topTimes: [
        { name: 'gift-user', value: '74.0ms' },
        { name: 'user-center', value: '54.4ms' },
        { name: 'jiang-user', value: '39.7ms' },
        { name: 'chaos', value: '29.5ms' },
        { name: 'order', value: '19.0ms' }
      ],
      // mock 多系列数据
      reqData: [
        { time: '17:00', type: 'grpc', value: 3 },
        { time: '17:00', type: 'http', value: 32 },
        { time: '17:00', type: 'kafka', value: 2 },
        { time: '17:01', type: 'grpc', value: 4 },
        { time: '17:01', type: 'http', value: 30 },
        { time: '17:01', type: 'kafka', value: 3 },
        { time: '17:02', type: 'grpc', value: 2 },
        { time: '17:02', type: 'http', value: 35 },
        { time: '17:02', type: 'kafka', value: 2 },
        { time: '17:03', type: 'grpc', value: 5 },
        { time: '17:03', type: 'http', value: 33 },
        { time: '17:03', type: 'kafka', value: 4 },
        { time: '17:04', type: 'grpc', value: 6 },
        { time: '17:04', type: 'http', value: 38 },
        { time: '17:04', type: 'kafka', value: 3 },
        { time: '17:05', type: 'grpc', value: 4 },
        { time: '17:05', type: 'http', value: 36 },
        { time: '17:05', type: 'kafka', value: 5 },
        { time: '17:06', type: 'grpc', value: 7 },
        { time: '17:06', type: 'http', value: 34 },
        { time: '17:06', type: 'kafka', value: 4 },
        { time: '17:07', type: 'grpc', value: 6 },
        { time: '17:07', type: 'http', value: 39 },
        { time: '17:07', type: 'kafka', value: 3 },
        { time: '17:08', type: 'grpc', value: 8 },
        { time: '17:08', type: 'http', value: 37 },
        { time: '17:08', type: 'kafka', value: 5 },
        { time: '17:09', type: 'grpc', value: 5 },
        { time: '17:09', type: 'http', value: 40 },
        { time: '17:09', type: 'kafka', value: 4 },
        { time: '17:10', type: 'grpc', value: 9 },
        { time: '17:10', type: 'http', value: 36 },
        { time: '17:10', type: 'kafka', value: 6 },
        { time: '17:11', type: 'grpc', value: 7 },
        { time: '17:11', type: 'http', value: 38 },
        { time: '17:11', type: 'kafka', value: 5 },
        { time: '17:12', type: 'grpc', value: 8 },
        { time: '17:12', type: 'http', value: 35 },
        { time: '17:12', type: 'kafka', value: 6 },
        { time: '17:13', type: 'grpc', value: 6 },
        { time: '17:13', type: 'http', value: 39 },
        { time: '17:13', type: 'kafka', value: 4 },
        { time: '17:14', type: 'grpc', value: 10 },
        { time: '17:14', type: 'http', value: 37 },
        { time: '17:14', type: 'kafka', value: 7 },
        { time: '17:15', type: 'grpc', value: 8 },
        { time: '17:15', type: 'http', value: 41 },
        { time: '17:15', type: 'kafka', value: 5 }
      ],
      errData: [
        { time: '17:00', value: 4.2, rate: 0.11 },
        { time: '17:01', value: 3.8, rate: 0.09 },
        { time: '17:02', value: 5.1, rate: 0.13 },
        { time: '17:03', value: 4.5, rate: 0.10 },
        { time: '17:04', value: 5.6, rate: 0.14 },
        { time: '17:05', value: 4.1, rate: 0.08 },
        { time: '17:06', value: 5.3, rate: 0.12 },
        { time: '17:07', value: 4.7, rate: 0.10 },
        { time: '17:08', value: 5.8, rate: 0.15 },
        { time: '17:09', value: 4.3, rate: 0.09 },
        { time: '17:10', value: 5.5, rate: 0.13 },
        { time: '17:11', value: 4.9, rate: 0.11 },
        { time: '17:12', value: 5.7, rate: 0.14 },
        { time: '17:13', value: 4.6, rate: 0.10 },
        { time: '17:14', value: 5.9, rate: 0.15 },
        { time: '17:15', value: 5.2, rate: 0.12 }
      ],
      timeData: [
        { time: '17:00', type: 'grpc', value: 2.1 },
        { time: '17:00', type: 'http', value: 6.5 },
        { time: '17:00', type: 'kafka', value: 0.8 },
        { time: '17:01', type: 'grpc', value: 2.4 },
        { time: '17:01', type: 'http', value: 6.2 },
        { time: '17:01', type: 'kafka', value: 1.0 },
        { time: '17:02', type: 'grpc', value: 2.0 },
        { time: '17:02', type: 'http', value: 6.8 },
        { time: '17:02', type: 'kafka', value: 0.7 },
        { time: '17:03', type: 'grpc', value: 2.6 },
        { time: '17:03', type: 'http', value: 6.3 },
        { time: '17:03', type: 'kafka', value: 1.1 },
        { time: '17:04', type: 'grpc', value: 2.3 },
        { time: '17:04', type: 'http', value: 6.9 },
        { time: '17:04', type: 'kafka', value: 0.9 },
        { time: '17:05', type: 'grpc', value: 2.7 },
        { time: '17:05', type: 'http', value: 6.1 },
        { time: '17:05', type: 'kafka', value: 1.2 },
        { time: '17:06', type: 'grpc', value: 2.2 },
        { time: '17:06', type: 'http', value: 6.7 },
        { time: '17:06', type: 'kafka', value: 0.8 },
        { time: '17:07', type: 'grpc', value: 2.5 },
        { time: '17:07', type: 'http', value: 6.4 },
        { time: '17:07', type: 'kafka', value: 1.0 },
        { time: '17:08', type: 'grpc', value: 2.0 },
        { time: '17:08', type: 'http', value: 6.6 },
        { time: '17:08', type: 'kafka', value: 0.7 },
        { time: '17:09', type: 'grpc', value: 2.8 },
        { time: '17:09', type: 'http', value: 6.2 },
        { time: '17:09', type: 'kafka', value: 1.1 },
        { time: '17:10', type: 'grpc', value: 2.3 },
        { time: '17:10', type: 'http', value: 6.8 },
        { time: '17:10', type: 'kafka', value: 0.9 },
        { time: '17:11', type: 'grpc', value: 2.6 },
        { time: '17:11', type: 'http', value: 6.3 },
        { time: '17:11', type: 'kafka', value: 1.2 },
        { time: '17:12', type: 'grpc', value: 2.1 },
        { time: '17:12', type: 'http', value: 6.7 },
        { time: '17:12', type: 'kafka', value: 0.8 },
        { time: '17:13', type: 'grpc', value: 2.5 },
        { time: '17:13', type: 'http', value: 6.5 },
        { time: '17:13', type: 'kafka', value: 1.0 },
        { time: '17:14', type: 'grpc', value: 2.9 },
        { time: '17:14', type: 'http', value: 6.1 },
        { time: '17:14', type: 'kafka', value: 1.3 },
        { time: '17:15', type: 'grpc', value: 2.4 },
        { time: '17:15', type: 'http', value: 6.9 },
        { time: '17:15', type: 'kafka', value: 0.9 }
      ]
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
.overview-page {
  padding: 24px 12px 12px 12px;
  background: #f8f9fa;
}
.overview-cards {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
.overview-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  padding: 12px 16px;
  min-width: 120px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.overview-card-label {
  color: #888;
  font-size: 12px;
  margin-bottom: 6px;
}
.overview-card-value {
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin-bottom: 4px;
}
.overview-card-sub {
  font-size: 11px;
  color: #aaa;
}
.overview-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
.overview-block {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  flex: 1;
  padding: 12px 16px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.block-title {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}
.block-value {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #222;
}
.block-value.red {
  color: #e74c3c;
}
.block-sub {
  font-size: 11px;
  color: #888;
}
.block-sub .green {
  color: #27ae60;
}
.block-sub .red {
  color: #e74c3c;
}
.overview-chart {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  flex: 1;
  padding: 8px 6px 4px 6px;
  min-width: 120px;
  text-align: center;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.overview-top5 {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  flex: 1;
  padding: 12px 12px;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.top5-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.top5-name {
  width: 60px;
  font-size: 11px;
  color: #666;
}
.top5-bar {
  height: 8px;
  border-radius: 4px;
  margin: 0 6px;
  min-width: 12px;
  background: #409eff;
  flex: 1;
}
.top5-bar.red {
  background: #e74c3c;
}
.top5-bar.blue {
  background: #409eff;
}
.top5-value {
  font-size: 11px;
  color: #333;
  min-width: 24px;
  text-align: right;
  font-weight: bold;
}
</style>
