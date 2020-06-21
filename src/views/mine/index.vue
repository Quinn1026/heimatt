<template>
  <div class="mine">
    <div class="header">
      <div class="userInfo">
        <div class="picture" @click="$router.push('/userinfo')">
          <img src="../../assets/qq.png" alt="">
        </div>
        <div class="username">
          <div>黑马小公举</div>
          <span>申请认证</span>
        </div>
        <div class="read">
          <div>今日阅读</div>
          <div>5分钟</div>
        </div>
      </div>
      <div class="itemGroup">
        <div class="item">
          <span>8</span>
          <div>动态</div>
        </div>
        <div class="item">
          <span>66</span>
          <div>关注</div>
        </div>
        <div class="item">
          <span>88</span>
          <div>粉丝</div>
        </div>
      </div>
    </div>
    <div class="utils">
      <van-grid :column-num="3">
        <van-grid-item icon="star-o" text="收藏" />
        <van-grid-item icon="clock-o" text="历时" />
        <van-grid-item icon="edit" text="作品" />
      </van-grid>
    </div>
    <div class="main">
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="实名认证" is-link />
        <van-cell title="用户反馈" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell title="系统设置" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.mine {
  .header {
    height: 200px;
    width: 100%;
    color: #fff;
    background-color: #3e9cfa ;
    text-align: center;
    overflow: hidden;
    .userInfo {
      position: relative;
      display: flex;
      align-items: center;
      margin: 60px 0 30px 20px;
      .picture {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .username {
        div {
          margin-bottom: 5px;
          margin-left: 20px;
        }
        span {
          color: #3e9cfa;
          font-size: 12px;
          border-radius: 10px;
          padding: 2px 5px;
          background-color: #fff;
        }
      }
      .read {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
        padding: 5px 15px;
        background-color: rgba(0,0,0,.5);
        border-radius: 20px 0 0 20px;
      }
    }
    .itemGroup {
      display: flex;
      .item {
        flex: 1;
      }
    }
  }
  .utils {
    /deep/ .van-icon-star-o {
      color: #eb5556;
    }
    /deep/ .van-icon-clock-o {
      color: #ffa125
    }
    /deep/ .van-icon-edit {
      color: #6d92ff
    }
  }
}
</style>
