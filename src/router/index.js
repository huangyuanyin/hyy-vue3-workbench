import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue' // 布局组件 不需要懒加载

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录页面'
    },
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/',
    name: 'Workbench',
    meta: {
      title: '工作台'
    },
    component: () => import('@/views/Workbench/index.vue'),
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404页面'
    },
    component: () => import('@/views/exception/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(''),
  routes
})

export default router
