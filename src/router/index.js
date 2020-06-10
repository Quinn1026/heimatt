import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import MyVant from '@/views/vant'
import Login from '@/views/login'
import Home from '@/views/index.vue'
import Index from '@/views/index/index.vue'
import Mine from '@/views/mine'

Vue.use(VueRouter)

const routes = [
  {
    path: '/vant',
    component: MyVant
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/index',
        component: Index
      },
      {
        path: '/mine',
        component: Mine
      }
    ]
  },
  {
    path: '/',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
