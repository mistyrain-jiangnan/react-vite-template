import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'
import { menuGroups } from './menuConfig'

Vue.use(VueRouter)

function lazyView(path) {
  // 兼容 Index.vue 及二级页面，首字母大写
  const base = path.replace(/\/$/, '')
  const segments = base.split('/')
  const file = segments.pop()
  const dir = segments.join('/')
  // 取最后一级路径，首字母大写
  const fileName = file ? file.charAt(0).toUpperCase() + file.slice(1) : 'Index'
  return () => import(`../views${dir}/${fileName}.vue`).catch(() => import(`../views${base}/Index.vue`))
}

function buildChildrenRoutes(menuItems, parentRoute) {
  return menuItems.map(item => {
    // 取 parentRoute 之后的所有 path 片段
    let path = item.route.replace(parentRoute, '').replace(/^\//, '')
    // 如果 path 为空，说明是父级 index，设为 'index'
    if (!path) path = 'index'
    return {
      path,
      name: item.route.replace(/^\//, '').replace(/\//g, '-'),
      component: lazyView(item.route)
    }
  })
}

const children = [
  { path: '', name: 'main', component: MainView }
]

menuGroups.forEach(group => {
  group.items.forEach(item => {
    if (item.menuItem) {
      children.push({
        path: item.route.replace(/^\//, ''),
        name: item.route.replace(/^\//, ''),
        component: { render: h => h('router-view') },
        children: buildChildrenRoutes(item.menuItem, item.route)
      })
    } else {
      children.push({
        path: item.route.replace(/^\//, ''),
        name: item.route.replace(/^\//, ''),
        component: lazyView(item.route)
      })
    }
  })
})

const routes = [
  {
    path: '/',
    component: HomeView,
    children
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
