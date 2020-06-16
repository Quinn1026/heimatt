<template>
  <div class="search">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      background="#3296fa"
      @search="onSearch"
      @cancel="onCancel"
      @input="think"
    />
    <van-cell-group v-if="suggestionOptions.length !== 0">
      <van-cell title="联想模块" />
      <van-cell @click="onSearch(item.goto)" icon="search" v-for="(item, index) in suggestionOptions" :key="index" >
        <template #title>
          <span v-html="item.hightLight"></span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="历史模块" >
        <template #default>
          <van-icon name="delete" @click="delAll" />
        </template>
      </van-cell>
      <van-cell @click="onSearch(item)" :title="item" v-for="(item, index) in history" :key="index">
        <template #default>
          <van-icon name="cross" @click.stop="delCurrent(index)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiSuggestion } from '@/api/utils'
import { localSet, localGet, localDel } from '@/utils/mylocal'
export default {
  data () {
    return {
      value: '',
      suggestionOptions: [],
      timer: null,
      history: localGet('history') || []
    }
  },
  methods: {
    delCurrent (index) {
      this.history.splice(index, 1)
      localSet('history', this.history)
    },
    delAll () {
      // this.history.length = 0 // 不是响应式的
      // 让用户确定是否删除
      this.$dialog.confirm({
        title: '提示',
        message: '是否删除所有历史记录'
      }).then(() => {
        // on confirm
        this.history = []
        localDel('history')
      }).catch(() => {
        // on cancel
      })
    },
    onSearch (key) {
      // console.log(key)
      this.$router.push(`/searchResult/${key}`)
      // 判断这个key是否在历史中已存在 已存在则不在存储
      // if (this.history.includes(key)) return
      // this.history.push(key) // 最近的历史记录放最上面
      this.history.unshift(key)
      // 使用set构造器去重数组
      this.history = [...new Set(this.history)]
      localSet('history', this.history)
    },
    onCancel () {
      console.log('22')
    },
    think () {
      clearTimeout(this.timer)
      if (this.value.trim()) {
        this.timer = setTimeout(async () => {
          const res = await apiSuggestion(this.value)
          //  console.log(res)
          if (res.status === 200) {
            const arr = res.data.data.options
            this.suggestionOptions = arr.map(item => {
              // 返回一个对象{两个属性} 一个用于渲染页面显示高亮 一个用于跳转页面
              return {
                hightLight: item.replace(this.value, `<span style="color:red">${this.value}</span>`),
                goto: item
              }
            })
          }
        }, 300)
      } else {
        this.suggestionOptions.length = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .van-search__action {
    color: #fff
  }
  .van-search__action:active {
    background-color: #3296fa;
  }
}
</style>
