// 操作数据到本地localStorge
// 存储数据到本地
function localSet (key, val) {
  window.localStorage.setItem(key, JSON.stringify(val))
}
// 取出本地数据
function localGet (key) {
  return JSON.parse(window.localStorage.getItem(key))
}
// 删除本地数据
function localDel (key) {
  window.localStorage.removeItem(key)
}
// 按需导出
export { localSet, localGet, localDel }
