import axios from '@/utils/myhttp.js'
export function apiSuggestion (value) {
  return axios.get('/app/v1_0/suggestion', {
    params: {
      q: value
    }
  })
}
