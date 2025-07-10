// 菜单配置与路由映射
export const menuGroups = [
  {
    title: '仪表盘',
    items: [
      {
        index: '1', icon: 'el-icon-pie-chart', label: '仪表盘', route: '/dashboard',
        menuItem: [
          { index: '1', icon: 'el-icon-data-analysis', label: '总览', route: '/dashboard/overview' },
          { index: '2', icon: 'el-icon-monitor', label: '趋势分析', route: '/dashboard/trend' },
          { index: '3', icon: 'el-icon-pie-chart', label: '分布图', route: '/dashboard/distribution' }
        ]
      }
    ]
  },
  {
    title: '工作台',
    items: [
      {
        index: '2', icon: 'el-icon-s-data', label: '应用工作台', route: '/workspace',
        menuItem: [
          { index: '1', icon: 'el-icon-s-platform', label: '我的应用', route: '/workspace/myapps' },
          { index: '2', icon: 'el-icon-folder-opened', label: '应用市场', route: '/workspace/market' },
          { index: '3', icon: 'el-icon-s-order', label: '部署记录', route: '/workspace/deployments' }
        ]
      }
    ]
  },
  {
    title: '容器',
    items: [
      {
        index: '3', icon: 'el-icon-box', label: '容器管理', route: '/container',
        menuItem: [
          { index: '1', icon: 'el-icon-box', label: '容器列表', route: '/container/list' },
          { index: '2', icon: 'el-icon-cpu', label: '节点管理', route: '/container/nodes' },
          { index: '3', icon: 'el-icon-setting', label: '容器设置', route: '/container/settings' }
        ]
      },
      {
        index: '4', icon: 'el-icon-cloudy', label: '多云编排', route: '/cloud',
        menuItem: [
          { index: '1', icon: 'el-icon-cloudy', label: '云资源', route: '/cloud/resources' },
          { index: '2', icon: 'el-icon-connection', label: '连接管理', route: '/cloud/connections' },
          { index: '3', icon: 'el-icon-share', label: '编排策略', route: '/cloud/strategy' }
        ]
      },
      {
        index: '5', icon: 'el-icon-picture-outline', label: '镜像仓库', route: '/repo',
        menuItem: [
          { index: '1', icon: 'el-icon-picture-outline', label: '镜像列表', route: '/repo/list' },
          { index: '2', icon: 'el-icon-upload', label: '上传镜像', route: '/repo/upload' },
          { index: '3', icon: 'el-icon-download', label: '拉取记录', route: '/repo/records' }
        ]
      }
    ]
  },
  {
    title: '微服务',
    items: [
      {
        index: '6', icon: 'el-icon-monitor', label: '可观测性', route: '/observability',
        menuItem: [
          { index: '1', icon: 'el-icon-view', label: '概览', route: '/observability/overview' },
          { index: '2', icon: 'el-icon-odometer', label: '仪表盘', route: '/observability/dashboard' },
          { index: '3', icon: 'el-icon-s-grid', label: '资源监控', route: '/observability/resource' },
          { index: '4', icon: 'el-icon-monitor', label: '场景监控', route: '/observability/scene' },
          { index: '5', icon: 'el-icon-search', label: '数据查询', route: '/observability/query' },
          { index: '6', icon: 'el-icon-message-solid', label: '告警中心', route: '/observability/alert' },
          { index: '7', icon: 'el-icon-pie-chart', label: '采集管理', route: '/observability/collect' }
        ]
      },
      {
        index: '7', icon: 'el-icon-guide', label: '服务网格', route: '/mesh',
        menuItem: [
          { index: '1', icon: 'el-icon-guide', label: '网格总览', route: '/mesh/overview' },
          { index: '2', icon: 'el-icon-link', label: '服务拓扑', route: '/mesh/topology' },
          { index: '3', icon: 'el-icon-s-operation', label: '流量管理', route: '/mesh/traffic' }
        ]
      }
    ]
  }
]
