// 导入axios
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import JSONBigInt from 'json-bigint'
import { localDel } from './mylocal'
import router from '@/router'
// 设置axios基础路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'
// 设置post请求头 以下是默认
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// 设置响应数据的处理 把id数值改为bigint类型 来防止数据超过js范围后丢失精度
axios.defaults.transformResponse = [function (data) {
  // 对 data 进行任意转换处理
  // console.log(data)
  try {
    return JSONBigInt.parse(data)
  } catch (err) {
    return JSON.parse(data)
  }
}]
// 设置请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.userInfo.token
  // console.log(token)
  if (token) {
    // console.log(config)
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.message === 'Token has some errors.') {
    // 删除本地token 并跳转到首页
    console.log('I will goto index page~~~')
    localDel('heimatt')
    router.push('/login')
    return
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 将axios挂载到vue原型上
Vue.prototype.$axios = axios
// 导出axios
export default axios
