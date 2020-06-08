import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import MyVant from '@/views/vant'
import Login from '@/views/login'

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
    path: '/',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
