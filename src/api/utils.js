import axios from '@/utils/myhttp.js'
export function apiSuggestion (value) {
  return axios.get('/app/v1_0/suggestion', {
    params: {
      q: value
    }
  })
}
export function apiSearchResult (page, key) {
  return axios.get('/app/v1_0/search', {
    params: { page: page, q: key }
  })
}
