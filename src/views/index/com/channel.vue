<template>
  <div class="channel">
    <van-popup :value="show" @input="showChannel" position="bottom" :style="{ height: '80%' }">
      <van-cell title="我的频道">
          <template #default>
          <van-button @click="isShow=!isShow" round size="mini" plain type="danger"> {{isShow ? '完成' : '编辑'}} </van-button>
          </template>
      </van-cell>
      <van-grid :gutter="20">
        <van-grid-item v-for="(item, index) in channelList" :key="index" class="myChannelGrid">
          <template #text>
            {{item.name}}<van-icon v-show="isShow" class="clearIcon" size="16" name="clear" />
          </template>
        </van-grid-item>
      </van-grid>
      <van-cell title="频道列表" />
      <van-grid :gutter="20">
        <van-grid-item v-for="item in filterChannel" :key="item.id" :text="item.name" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { apiGetAllChannel } from '@/api/channel'
export default {
  data () {
    return {
      isShow: false,
      allChannel: []
    }
  },
  props: ['show', 'channelList'],
  created () {
    this.getAllChannel()
  },
  methods: {
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
}
</style>
