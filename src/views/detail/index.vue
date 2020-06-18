<template>
  <div class="detail">
    <van-nav-bar
      @click-left="$router.back()"
      left-arrow
      :fixed="true"
      class="mytitle"
      title="文章详情"
    />
    <h2>{{detail.title}}</h2>
    <van-cell>
      <template #title>
        <div class="auth">
          <div class="authImg">
            <img :src="detail.aut_photo" alt="">
          </div>
          <div class="authMsg">
            <div class="authName">{{detail.aut_name}}</div>
            <div class="authTime">{{detail.pubdate | timefilter}}</div>
          </div>
          <div class="follow">
            <van-button @click="follow" v-if="!isAttention" type="info">+关注</van-button>
            <van-button @click="disfollow" v-else type="info">已关注</van-button>
          </div>
        </div>
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <div v-html="detail.content"></div>
      </template>
    </van-cell>
    <div class="btnbox">
      <div class="item">
        <van-button v-if="detail.attitude !== 1" @click="liking" round type="default" plain><van-icon name="like"></van-icon>点赞</van-button>
        <van-button v-if="detail.attitude === 1" @click="unliking" round type="danger" plain><van-icon name="like"></van-icon>点赞</van-button>
      </div>
      <div class="item">
        <van-button v-if="detail.attitude !== 0" @click="disliking" round type="default" plain><van-icon name="delete"></van-icon>不喜欢</van-button>
        <van-button v-if="detail.attitude === 0" @click="undisliking" round type="danger" plain><van-icon name="delete"></van-icon>不喜欢</van-button>
      </div>
    </div>
    <!-- comment组件 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment :isReply="false" :item="item" v-for="(item, index) in commentList" :key="index"></comment>
    </van-list>
    <!-- write组件 -->
    <write @addComment="addComment" :isReply="false"></write>
    <!-- reply组件 -->
    <reply></reply>
  </div>
</template>

<script>
import Comment from './com/comment'
import Write from './com/write'
import Reply from './com/reply'
import { apiGetArticles, apiLike, apiUnLike, apiDislike, apiUnDisLike } from '@/api/articles'
import { followings, disfollowings } from '@/api/use'
import { apiGetComment } from '@/api/comment'
export default {
  data () {
    return {
      articleid: '',
      detail: {},
      isAttention: false,
      offset: null,
      endid: null,
      limit: 10,
      commentList: [],
      loading: false,
      finished: false
    }
  },
  created () {
    // console.log(this.$route.params.artid)
    this.articleid = this.$route.params.artid
    this.getArticles()
  },
  methods: {
    addComment (comment) {
      this.commentList.unshift(comment)
      // this.$refs.xxx.scrollIntoView({
      //   block: 'start', // 与定位dom的顶部齐平
      //   behavior: 'smooth' // 平滑滚动
      // })
    },
    async onLoad () {
      const res = await apiGetComment({
        type: 'a',
        source: this.articleid,
        offset: this.offset,
        limit: this.limit
      })
      // console.log(res)
      if (res.status === 200) {
        this.commentList = [...this.commentList, ...res.data.data.results]
        this.endid = res.data.data.end_id
        this.offset = res.data.data.last_id
      }
      this.loading = false
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    async disliking () {
      await apiDislike(this.detail.art_id)
      this.detail.attitude = 0
    },
    async undisliking () {
      this.detail.attitude = -1
      await apiUnDisLike(this.detail.art_id)
    },
    async liking () {
      await apiLike(this.detail.art_id)
      this.detail.attitude = 1 // -1无状态 1点赞 0不喜欢
    },
    async unliking () {
      this.detail.attitude = -1 // -1无状态 1点赞 0不喜欢
      await apiUnLike(this.detail.art_id)
    },
    async getArticles () {
      const res = await apiGetArticles(this.articleid)
      // console.log(res)
      if (res.status === 200) {
        this.detail = res.data.data
      }
    },
    async follow () {
      await followings(this.detail.aut_id)
      this.isAttention = true
    },
    async disfollow () {
      this.isAttention = false
      try {
        await disfollowings(this.detail.aut_id)
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    Comment,
    Write,
    Reply
  }
}
</script>

<style lang="less" scoped>
.detail {
  margin-top: 46px;
  margin-bottom: 50px;
  .mytitle {
    background-color: #3e9df8;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
    /deep/ .van-nav-bar__arrow {
      color: #fff;
    }
  }
  h1 {
    text-align: center;
    font-weight: 400;
    padding: 20px;
  }
  .auth {
    display: flex;
    .authImg {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .authMsg {
      margin-left: 10px;
      flex: 1;
    }
  }
  .btnbox {
    margin: 30px 0px;
    display: flex;
    .item {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
