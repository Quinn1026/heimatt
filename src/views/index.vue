<template>
  <div class="home">
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$store.getters.getUserInfo)
  }
}
</script>

<style lang="less">

</style>
