<template>
  <div class="channel">
    <van-popup :value="show" @input="showChannel" position="bottom" :style="{ height: '80%' }">
      <van-cell title="我的频道">
          <template #default>
          <van-button @click="isShow=!isShow" round size="mini" plain type="danger"> {{isShow ? '完成' : '编辑'}} </van-button>
          </template>
      </van-cell>
      <van-grid :gutter="20">
        <van-grid-item @click="changeChannel(index)" v-for="(item, index) in channelList" :key="index" class="myChannelGrid" :class="{ active: active === index }">
          <template #text>
            {{item.name}}<van-icon @click.stop="delChannel(item, index)" v-show="isShow && index !== 0" class="clearIcon" size="16" name="clear" />
          </template>
        </van-grid-item>
      </van-grid>
      <van-cell title="频道列表" />
      <van-grid :gutter="20">
        <van-grid-item v-for="item in filterChannel" :key="item.id" :text="item.name" @click="addChannel(item)" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { apiGetAllChannel, aipEditChannel } from '@/api/channel'
import { localSet } from '@/utils/mylocal'
export default {
  data () {
    return {
      isShow: false,
      allChannel: []
    }
  },
  props: ['show', 'channelList', 'active'],
  created () {
    this.getAllChannel()
  },
  methods: {
    changeChannel (i) {
      this.$emit('update:active', i)
    },
    addChannel (item) {
      // 由于此时的item只有id和name 所以要添加上 articlList loading finished refreshing
      this.$set(item, 'articleList', [])
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'refreshing', false)
      this.channelList.push(item)
      this.editChannel()
    },
    delChannel (item, index) {
      this.channelList.splice(index, 1)
      this.editChannel()
    },
    async editChannel () {
      // 判断用户是否登陆
      const token = this.$store.state.userInfo.token
      if (!token) {
        // 用户没有登陆 保存channel到本地local
        localSet('userChannelList', this.channelList)
      } else {
        // 用户已登录 直接保存到服务器
        // 剔除掉 第一个 推荐频道
        const channels = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await aipEditChannel(channels)
      }
    },
    showChannel (v) {
      this.$parent.show = v
    },
    async getAllChannel () {
      const res = await apiGetAllChannel()
      // console.log(res)
      if (res.status === 200) {
        this.allChannel = res.data.data.channels
      }
    }
  },
  computed: {
    filterChannel () {
      const ids = this.channelList.map(item => item.id)
      return this.allChannel.filter(item => !ids.includes(item.id))
    }
  }
}
</script>

<style lang="less">
.channel {
  .myChannelGrid {
    color: #646566;
    font-size: 12px;
    line-height: 1.5;
    word-wrap: break-word;
    position: relative;
    .clearIcon {
      position: absolute;
      top: 0;
      right: 0;
      color: #646566;
    }
  }
  .active {
    color: red;
  }
}
</style>
