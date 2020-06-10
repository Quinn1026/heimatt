<template>
  <div class="index">
    <!-- <van-search
    shape="round"
    left-icon=""
    background="#3296fa"
    :placeholder="icon"
    input-align="center"
    class="iconfont"
    /> -->
    <van-nav-bar title="主页" class="indexTitle" :fixed="true">
    </van-nav-bar>
    <van-tabs border>
      <van-tab v-for="index in 8" :key="index" :title="'标签 ' + index">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="item in list" :key="item" :title="item + ': 这是第 ' + item + ' 条数据'" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      icon: '\ue6d0 搜索',
      list: [], // 列表数据
      loading: false, // 组件的加载状态
      finished: false, // 是否加载完毕
      refreshing: false // 组件的刷新状态
    }
  },
  methods: {
    // 上拉加载
    onLoad () {
      setTimeout(() => {
        // List 初始化后会触发一次 load 事件
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        // 每次 load 事件都将arr加到list里面
        this.list = [...this.list, ...arr]
        // 加载状态结束
        this.loading = false
        // 数据全部加载完
        if (this.list.length >= 100) {
          this.finished = true
        }
      }, 1500)
    },
    // 下拉刷新
    onRefresh () {
      // 加载完毕的状态恢复
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  margin-top: 90px;
  margin-bottom: 50px;
  .indexTitle {
    background-color: #3296fa;
    /deep/ .van-nav-bar__title {
      color: #fff
    }
  }
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    width: 100%;
    z-index: 9;
  }
}
</style>
