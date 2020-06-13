import axios from '@/utils/myhttp.js'
// 获取用户/默认频道
export function apiGetChannel () {
  return axios.get('/app/v1_0/user/channels')
}
// 获取全部频道
export function apiGetAllChannel () {
  return axios.get('/app/v1_0/channels')
}
// 批量修改用户频道
export function aipEditChannel (channels) {
  return axios({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: { channels }
  })
}
