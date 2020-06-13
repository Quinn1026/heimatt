<template>
  <div class="channel">
    <van-popup :value="show" @input="showChannel" position="bottom" :style="{ height: '80%' }">
      <van-cell title="我的频道">
          <template #default>
          <van-button @click="isShow=!isShow" round size="mini" plain type="danger"> {{isShow ? '完成' : '编辑'}} </van-button>
          </template>
      </van-cell>
      <van-grid :gutter="20">
        <van-grid-item @click="removeChannel(index)" v-for="(item, index) in channelList" :key="index" class="myChannelGrid">
          <template #text>
            {{item.name}}<van-icon v-if="item.id !== 0" v-show="isShow" class="clearIcon" size="16" name="clear" />
          </template>
        </van-grid-item>
      </van-grid>
      <van-cell title="频道列表" />
      <!-- 用grid网格实现 -->
      <!-- <van-grid :gutter="20">
        <van-grid-item v-for="item in filterChannel" :key="item.id" :text="item.name" />
      </van-grid> -->
      <!-- 用tag标记实现 -->
      <!-- <van-tag class="tagStyle" round size="large" v-for="item in filterChannel" :key="item.id">+ {{ item.name }} </van-tag> -->
      <!-- 用按钮实现 -->
      <van-button
      class="tagStyle"
      round
      size="small"
      color="#969799"
      v-for="item in filterChannel" :key="item.id"
      @click="addChannel(item)"
      >
        +  {{ item.name }}
      </van-button>
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
    addChannel (item) {
      this.channelList.push(item)
    },
    removeChannel (i) {
      if (this.isShow) {
        this.$parent.channelList.splice(i, 1)
        // const i = this.$parent.channelList.map(item => item.id).indexOf(id)
      }
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
  .tagStyle {
    margin: 10px;
    padding: 0 15px;
  }
}
</style>
