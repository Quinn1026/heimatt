import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import MyVant from '@/views/vant'
import Login from '@/views/login'
import Home from '@/views/index.vue'
import Index from '@/views/index/index.vue'
import Mine from '@/views/mine'
import Search from '@/views/search'
import SearchResult from '@/views/searchResult'
import Detail from '@/views/detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/vant',
    component: MyVant
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/checklogin',
    component: Login
  },
  {
    path: '/home',
    redirect: '/index',
    component: Home,
    children: [
      {
        path: '/index',
        component: Index
      },
      {
        path: '/search',
        component: Search
      },
      {
        path: '/mine',
        component: Mine
      }
    ]
  },
  {
    path: '/detail/:artid',
    component: Detail
  },
  {
    path: '/searchResult/:key',
    component: SearchResult
  }
]

const router = new VueRouter({
  routes
})

export default router
