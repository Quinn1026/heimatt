import axios from '@/utils/myhttp'
export function apiGetComment ({ type, source, offset, limit }) {
  return axios.get('/app/v1_0/comments', {
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
export function apiAddComment ({ target, content, artId }) {
  return axios.post('/app/v1_0/comments', {
    target,
    content,
    artId
  })
}
