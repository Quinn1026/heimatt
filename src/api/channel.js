import axios from '@/utils/myhttp.js'
export function apiGetChannel () {
  return axios.get('/app/v1_0/user/channels')
}
export function apiGetAllChannel () {
  return axios.get('/app/v1_0/channels')
}
