<template>
  <div class="home">
    <van-search
    shape="round"
    background="#3296fa"
    placeholder="搜索"
    />
    <van-tabs border>
      <van-tab v-for="index in 8" :key="index" :title="'标签 ' + index">
          内容 {{ index }}
      </van-tab>
    </van-tabs>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
