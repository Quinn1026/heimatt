// 操作数据到本地localStorge
const KEY = 'heimatt'
// 存储数据到本地
function localSet (token) {
  window.localStorage.setItem(KEY, token)
}
// 取出本地数据
function localGet () {
  window.localStorage.getItem(KEY)
}
// 删除本地数据
function localDel () {
  window.localStorage.removeItem(KEY)
}
// 按需导出
export { localSet, localGet, localDel }
