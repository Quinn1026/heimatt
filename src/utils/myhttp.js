// 导入axios
import Vue from 'vue'
import axios from 'axios'
import { localGet } from '@/utils/mylocal'
// 设置axios基础路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'
// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 设置请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localGet()
  if (token) {
    console.log(config)
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 将axios挂载到vue原型上
Vue.prototype.$axios = axios
// 导出axios
export default axios
