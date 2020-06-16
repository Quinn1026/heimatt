// 导入axios
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import JSONBigInt from 'json-bigint'
import { localSet } from './mylocal'
// import router from '@/router'
const http1 = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
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
  return response
}, async function (error) {
  // 对响应错误做点什么
  // console.dir(error) // error对象包括config request response
  if (error.response.status === 401) {
    // 表示token过期无效
    // 获取本地的refresh_token
    const refreshToken = store.state.userInfo.refresh_token
    // 将refresh_token提交到服务器 得到新的token
    // 此时不能用axios直接发送请求 因为axios会携带无效的旧token 发送的请求会失败
    const result = await http1({
      method: 'PUT',
      url: '/app/v1_0/authorizations',
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
    // console.log(result)
    const newToken = result.data.data.token
    // 将得到的新token保存到本地和store中
    const userInfo = {
      token: newToken,
      refresh_token: refreshToken
    }
    store.commit('setUserInfo', userInfo)
    localSet('heimatt', userInfo)
    return axios(error.config)
  }
  return Promise.reject(error)
})

// 将axios挂载到vue原型上
Vue.prototype.$axios = axios
// 导出axios
export default axios
