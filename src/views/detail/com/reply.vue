<template>
  <div class="reply">
    <van-popup
      v-model="show"
      position="bottom"
      round
      lock-scroll
      closeable
      close-icon-position="top-left"
      :style="{ height: '60%' }"
      class="popup"
      @open="clr"
    >
      <van-cell title="当前评论" />
      <comment :isReply="true" :item="currentComment"></comment>
      <van-cell title="评论回复" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <comment v-for="(item, index) in list" :key="index" :isReply="true" :item="item"></comment>
      </van-list>
      <!-- 底部的write组件 -->
      <write :isReply="true" :comId="comId" @addComment="addComment"></write>
    </van-popup>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import Comment from './comment'
import Write from './write'
import { apiGetComment } from '@/api/comment'
export default {
  name: 'Reply',
  components: {
    Comment,
    Write
  },
  data () {
    return {
      show: false,
      endid: null,
      offset: null,
      list: [],
      loading: false,
      finished: false,
      comId: null,
      currentComment: null
    }
  },
  methods: {
    async onLoad () {
      const res = await apiGetComment({
        type: 'c',
        source: this.currentComment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      // console.log(res)
      this.list = [...this.list, ...res.data.data.results]
      this.endid = res.data.data.end_id
      this.offset = res.data.data.last_id
      this.loading = false
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    addComment (val) {
      this.list.unshift(val)
      this.currentComment.reply_count++
    },
    clr () {
      this.endid = null
      this.offset = null
      this.list = []
      this.loading = false
      this.finished = false
    }
  },
  created () {
    bus.$on('replyComment', item => {
      this.show = true
      this.currentComment = item
      this.comId = item.com_id
    })
  }
}
</script>

<style lang="less">
.reply {
  .popup {
    padding-top: 50px;
    margin-bottom: 50px;
  }
}
</style>
