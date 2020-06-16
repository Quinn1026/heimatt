<template>
  <div class="searchResult">
    <van-nav-bar
      title="搜索结果"
      left-arrow
      fixed
      @click-left="onClickLeft"
      class="navBar"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" >
        <template #title>
          <h4>{{item.title}}</h4>
          <van-grid :border="false" :column-num="3">
            <van-grid-item v-for="(prop, i) in item.cover.images" :key="i">
              <van-image :src="prop" v-lazy="prop"/>
            </van-grid-item>
          </van-grid>
          <div class="left">
            <span>{{item.aut_name}}</span>
            <span>{{item.comm_count}}评论</span>
            <span>{{item.pubdate | timefilter}}</span>
          </div>
          <van-grid direction="horizontal" :column-num="3" icon-size="14px">
            <van-grid-item icon="comment-o" text="评论" />
            <van-grid-item icon="like-o" text="点赞" />
            <van-grid-item icon="certificate" text="分享" />
          </van-grid>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { apiSearchResult } from '@/api/utils'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      total: 0
    }
  },
  created () {
    this.getSearchResult()
  },
  methods: {
    async getSearchResult () {
      const res = await apiSearchResult(this.page, this.$route.params.key)
      // console.log(res)
      if (res.status === 200) {
        this.list = res.data.data.results
        this.total = res.data.data.total_count
      }
    },
    onClickLeft () {
      this.$toast('回到搜索页面')
      this.$router.back()
    },
    async onLoad () {
      // 异步更新数据
      const arr = this.list
      // console.log(arr)
      this.page++
      const res = await apiSearchResult(this.page, this.$route.params.key)
      if (res.status === 200) {
        this.list = res.data.data.results
      }
      // console.log(this.list)
      this.list = [...arr, ...this.list]

      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (this.list.length >= this.total) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.searchResult {
  margin-top: 46px;
  .navBar {
    background-color: #3296fa;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
    /deep/ .van-icon {
      color: #fff;
    }
  }
  .left > span {
    margin-right: 10px;
  }
}
</style>
