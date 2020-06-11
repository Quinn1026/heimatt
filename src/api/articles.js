import axios from '@/utils/myhttp'
export function apiGetArticlList (id) {
  return axios.get('/app/v1_1/articles', {
    params: {
      channel_id: id,
      timestamp: Date.now(),
      with_top: 0
    }
  })
}
