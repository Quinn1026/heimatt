<template>
  <div class="index">
    <van-nav-bar class="indexTitle" :fixed="true">
      <template #left>
        <van-icon name="bars" size="18" @click="showChannel" />
      </template>
      <template #title>
        <van-search
        shape="round"
        left-icon=""
        background="#3296fa"
        :placeholder="icon"
        input-align="center"
        class="iconfont"
        />
      </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs border v-model="active">
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <van-pull-refresh v-model="item.refreshing" @refresh="onRefresh">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(val, i) in item.articleList" :key="i">
              <template #title>
                <h4>{{val.title}}</h4>
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(prop, index) in val.cover.images" :key="index">
                    <van-image :src="prop" v-lazy="prop"/>
                  </van-grid-item>
                </van-grid>
                <div class="articleCellFoot">
                  <div class="left">
                    <span>{{val.aut_name}}</span>
                    <span>{{val.comm_count}}评论</span>
                    <span>{{val.pubdate | timefilter}}</span>
                  </div>
                  <div class="right">
                    <van-icon name="cross" @click="more(val)" />
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <channel :show="show" :active.sync="active" :channelList="channelList" ref="channel"></channel>
    <more ref="more" @delArticle="delArticle" :unlikeID="unlikeID" :authorID="authorID"></more>
  </div>
</template>

<script>
import { apiGetChannel } from '@/api/channel'
import { localGet } from '@/utils/mylocal.js'
import { apiGetArticlList } from '@/api/articles'
import Channel from './com/channel'
import More from './com/more'
export default {
  components: {
    Channel,
    More
  },
  data () {
    return {
      icon: '\ue6d0 搜索',
      // list: [], // 列表数据
      // loading: false, // 组件的加载状态
      // finished: false, // 是否加载完毕
      // refreshing: false, // 组件的刷新状态
      channelList: [],
      active: 0,
      show: false,
      unlikeID: 0,
      authorID: 0
    }
  },
  created () {
    this.getChannelList()
  },
  methods: {
    delArticle (id) {
      // 获取文章列表
      const articles = this.channelList[this.active].articleList
      // 根据id获取要删除文章的索引
      articles.forEach((item, index) => {
        if (item.art_id === id) {
          articles.splice(index, 1)
        }
      })
    },
    more (val) {
      this.$refs.more.show = true
      this.unlikeID = val.art_id
      this.authorID = val.aut_id
      // console.log(val)
    },
    showChannel () {
      this.show = true
      this.$refs.channel.isShow = false
    },
    async getChannelList () {
      try {
        const token = this.$store.state.userInfo.token
        if (token) {
          // 有token表示用户已登录
          const res = await apiGetChannel()
          // console.log(res)
          if (res.status === 200) {
            this.channelList = res.data.data.channels
          }
        } else {
          // 没有token表示用户没有登陆
          // 1.用户操作过channel列表 存储到本地 先检测本地是否有channel列表
          const userChannelList = localGet('userChannelList')
          if (userChannelList) {
            this.channelList = userChannelList
          } else {
            // 2.用户没有操作过channel列表 则从服务器获取列表
            const res = await apiGetChannel()
            // console.log(res)
            if (res.status === 200) {
              this.channelList = res.data.data.channels
            }
          }
        }
        // console.log(this.channelList)
      } catch (err) {
        console.log('出错了' + err)
      }
      // 在频道列表中 再添加文章列表, 刷新 完成 加载的状态
      this.addOtherPropsToList()
    },
    addOtherPropsToList () {
      // 遍历频道列表 新增属性 文章列表 当前频道刷新.完成.加载的状态
      this.channelList.forEach(item => {
        // 对于对象vue无法检测 property 的添加或移除, property必须在data对象上存在才能让Vue将它转换为响应式的
        // 对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property
        // 但是可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property
        // item.articleList = []
        // item.loading = false
        // item.finished = false
        // item.refreshing = false
        this.$set(item, 'articleList', [])
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'refreshing', false)
      })
    },
    // 上拉加载
    async onLoad () {
      // 获取当前选中频道的数据
      const currentChannel = this.channelList[this.active]
      const res = await apiGetArticlList(currentChannel.id)
      // console.log(res)
      if (currentChannel.refreshing) {
        // 处于刷新状态 将数据列表清空 并关闭刷新
        currentChannel.articleList = []
        currentChannel.refreshing = false
      }
      if (res.status === 200) {
        // 将文章数据保存到列表 而不是替换它原有的数据
        currentChannel.articleList = [...currentChannel.articleList, ...res.data.data.results]
      }
      // 加载状态结束
      currentChannel.loading = false
      // 如果服务器返回数据(数组)长度为0 则表示数据已经加载完了
      if (res.data.data.results.length === 0) {
        currentChannel.finished = true
      }
      // List 初始化后会触发一次 load 事件
      // if (this.refreshing) {
      //   this.list = []
      //   this.refreshing = false
      // }
      // var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      // // 每次 load 事件都将arr加到list里面
      // this.list = [...this.list, ...arr]
      // // 加载状态结束
      // this.loading = false
      // // 数据全部加载完
      // if (this.list.length >= 100) {
      //   this.finished = true
      // }
    },
    // 下拉刷新
    onRefresh () {
      // 刷新完毕就恢复状态
      const currentChannel = this.channelList[this.active]
      currentChannel.finished = false
      // 重新加载数据 将loading设置为true 表示处于加载状态
      currentChannel.loading = true
      this.onLoad()
      // // 加载完毕的状态恢复
      // this.finished = false
      // // 重新加载数据
      // // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
      // this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  margin-top: 90px;
  margin-bottom: 50px;
  .indexTitle {
    background-color: #3296fa;
    /deep/ .van-nav-bar__title {
      color: #fff
    }
    /deep/ .van-nav-bar__title {
      width: 100%;
      max-width: 100%;
      margin: 0 50px;
    }
    .van-search {
      padding: 0;
    }
    .van-icon {
      color: #fff;
    }
  }
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    width: 100%;
    z-index: 9;
  }
  .articleCellFoot {
    display: flex;
    justify-content: space-between;
    .left > span {
      margin-right: 10px;
    }
  }
}
</style>
