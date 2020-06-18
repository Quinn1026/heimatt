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
          <div @click="$router.push('/detail/' + item.art_id)">
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
          </div>
          <van-grid direction="horizontal" :column-num="3" icon-size="14px">
            <van-grid-item icon="comment-o" text="评论" @click="comment" />
            <van-grid-item icon="like-o" text="点赞" @click="like" />
            <van-grid-item icon="certificate" text="分享" @click="share(item)" />
          </van-grid>
        </template>
      </van-cell>
    </van-list>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
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
      total: 0,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  methods: {
    share (item) {
      this.showShare = true
    },
    onSelect (option) {
      this.$toast(option.name)
      console.log(option)
      this.showShare = false
    },
    like () {
      if (!this.$login()) return
      console.log('赞一个~~~')
    },
    comment () {
      // 判断是否登陆
      const token = this.$store.state.userInfo.token
      if (token) {
        console.log('你已登录, 可以评论')
      } else {
        this.$toast('你未登录, 请登陆')
        this.$router.push('/login')
      }
    },
    async getSearchResult () {
      console.log('getResult')
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
      console.log('onload')
      const res = await apiSearchResult(this.page, this.$route.params.key)
      if (res.status === 200) {
        this.list = [...this.list, ...res.data.data.results]
      }
      // 加载状态结束
      this.loading = false
      // 加载完后页码加1 继续加载下一页
      this.page++
      // 数据全部加载完成
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.searchResult {
  margin-top: 46px;
  margin-bottom: 50px;
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
