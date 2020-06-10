<template>
  <div class="vant">
    <van-nav-bar title="这是一个测试页面" />
    <van-field :placeholder="icon" class="iconfont" />
    <input type="text" :placeholder="icon" class="iconfont search-style">
    <van-search
      shape="round"
      background="#f2f2f2"
      left-icon=""
      :placeholder="icon"
      input-align="center"
      class="iconfont"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      icon: '\ue6d0 搜索音乐, 视频, 歌词, 电台'
    }
  }
}
</script>

<style>
.search-style {
  width: 100%;
  height: 34px;
  line-height: 34px;
  text-align: center;
  box-sizing: border-box;
  padding: 0 20px;
  border-radius: 17px;
  background-color: #f7f8fa;
  outline: none;
  border: none;
}
</style>
