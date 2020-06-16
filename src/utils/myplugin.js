import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import { Toast } from 'vant'
Vue.use(Toast)

const pluginObj = {}
pluginObj.install = function (Vue) {
  Vue.prototype.$login = function () {
    const token = store.state.userInfo.token
    if (token) return true
    Toast('未登录, 请登录')
    router.push('/checklogin')
    return false
  }
}

export default pluginObj
