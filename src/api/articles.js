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
export function apiUnlikeArticle (id) {
  return axios.post('/app/v1_0/article/dislikes', {
    target: id
  })
}
export function apiReport ({ target, type }) {
  return axios.post('/app/v1_0/article/reports', {
    target,
    type,
    remark: ''
  })
}
export function apiGetArticles (articleid) {
  return axios.get(`/app/v1_0/articles/${articleid}`)
}
export function apiLike (id) {
  return axios.post('/app/v1_0/article/likings', {
    target: id
  })
}
export function apiUnLike (id) {
  return axios({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${id}`
  })
}
export function apiDislike (id) {
  return axios.post('/app/v1_0/article/dislikes', {
    target: id
  })
}
export function apiUnDisLike (id) {
  return axios({
    method: 'DELETE',
    url: `/app/v1_0/article/dislikes/${id}`
  })
}
