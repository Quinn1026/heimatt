<template>
  <div class="login">
      <van-nav-bar class="loginTitle" title="登陆" />
      <van-form @submit="onSubmit">
        <van-field
            v-model="loginForm.mobile"
            name="mobile"
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请输入手机号' }]"
        >
            <template #left-icon>
                <i class="iconfont icon-LC_icon_phone_line"></i>
            </template>
        </van-field>
        <van-field
            v-model="loginForm.code"
            name="code"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请输入验证码' }]"
        >
            <template #button>
                <van-button class="codeBtnStyle" size="small" round>获取验证码</van-button>
            </template>
            <template #left-icon>
                <i class="iconfont icon-lock"></i>
            </template>
        </van-field>
        <div style="margin: 16px;">
            <van-button block class="submitBtnStyle" native-type="submit">
            登陆
            </van-button>
        </div>
        </van-form>
  </div>
</template>

<script>
import { author } from '@/api/use'
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    onSubmit (val) {
      // console.log(val)
      author(val)
    }
  }
}
</script>

<style lang="less" scope>
.login {
  .loginTitle {
    background-color: #3296fa;
    /deep/ .van-nav-bar__title {
      color: #fff
    }
  }
  .codeBtnStyle {
    background-color: #ededed;
    color: #666;
  }
  .submitBtnStyle {
      background-color: #6db4fb;
      color: #fff;
      border-radius: 6px;
  }
}
</style>
