<template>
  <div class="comment">
    <van-cell>
      <template #title>
        <div class="commentlist">
          <div class="authImg">
            <img :src="item.aut_photo" alt="">
          </div>
          <div class="authcontent">
            <div class="authname">{{item.aut_name}}</div>
            <div class="content" v-html="item.content"></div>
            <div>
              <span class="time">{{item.pubdate | timefilter}}</span>
              <span v-if="!isReply" class="back" @click="reply(item.com_id)">回复{{item.reply_count}}</span>
            </div>
          </div>
          <div class="like">
            <van-icon name="like" size="16" :color="item.is_liking ? 'red' : '#666'" /> {{item.like_count}}
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import { apiGetComment } from '@/api/comment'
export default {
  data () {
    return {
      offset: null,
      limit: 10
    }
  },
  props: ['item', 'isReply'],
  methods: {
    async reply (comid) {
      // console.log(comid.toString())
      const res = await apiGetComment({
        type: 'c',
        source: comid.toString(),
        offset: this.offset,
        limit: this.limit
      })
      // console.log(res)
      if (res.status === 200) {
        bus.$emit('replyComment', res, comid)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  .commentlist {
    display: flex;
    .authImg {
      img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
      }
    }
    .authcontent {
      margin: 0 15px;
      flex: 1;
    }
    .back {
      margin-left: 10px;
      padding: 5px 10px;
      border-radius: 20px;
      background-color: #ccc;
    }
  }
}
</style>
