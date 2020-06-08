import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入样式
import '@/style/index.css'
// 导入Vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 注册组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
