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
          <van-button :loading="isLoading" :disabled="isLoading" block class="submitBtnStyle" native-type="submit">
          登陆
          </van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
// 导入请求的api
import { author } from '@/api/use'
// 导入本地存储
import { localSet } from '@/utils/mylocal'
export default {
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit (val) {
      // console.log(val)
      this.isLoading = true
      try {
        const res = await author(val)
        console.log(res)
        if (res.status === 201) {
          // localSet(res.data.data.token)
          this.isLoading = false
          localSet(res.data.data)
          this.$store.commit('setUserInfo', res.data.data)
          this.$toast('登陆成功')
          this.$router.push('/home')
        }
      } catch (error) {
        this.$toast('手机号或验证码有误')
        this.isLoading = false
        console.log(error)
      }
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
