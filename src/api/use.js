// 导入封装好的axios
import axios from '@/utils/myhttp'
// 导入本地存储
// import { localSet } from '@/utils/mylocal'
// 导入vant的Toast提示
// import { Toast } from 'vant'
// 导入路由模块
// import router from '@/router'
// 请求登陆页面的接口
export function author (obj) {
  // const res = await axios.post('/app/v1_0/authorizations', obj)
  // console.log(res)
  // if (res.status === 201) {
  //   localSet(res.data.data.token)
  //   Toast('登陆成功')
  //   router.push('/home')
  // }
  return axios.post('/app/v1_0/authorizations', obj)
}
export function delAuthor (id) {
  return axios.post('/app/v1_0/user/blacklists', { target: id })
}
