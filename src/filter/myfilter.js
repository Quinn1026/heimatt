import Vue from 'vue'
import dayjs from 'dayjs'
// 导入插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入语言包
import 'dayjs/locale/zh-cn'
// 扩展插件
dayjs.extend(relativeTime)
// 全局使用语言包
dayjs.locale('zh-cn')

Vue.filter('timefilter', function (value) {
  return dayjs().from(dayjs(value))
})
