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
    >
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
export default {
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
      comId: null
    }
  },
  methods: {
    onLoad () {
      this.loading = false
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    addComment (val) {
      this.list.unshift(val)
    }
  },
  created () {
    bus.$on('replyComment', (res, comId) => {
      this.show = true
      // console.log(res)
      // console.log(comId)
      this.list = res.data.data.results
      this.endid = res.data.data.end_id
      this.offset = res.data.data.last_id
      this.comId = comId
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
