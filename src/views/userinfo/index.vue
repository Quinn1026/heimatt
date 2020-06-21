<template>
  <div class="userinfo">
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="navBar"
    />
    <van-cell-group>
      <van-cell title="头像" is-link @click="fileUpload" >
        <template #default>
          <img :src="info.photo" alt="" style="width:20px;height:20px;borderRadius:50%">
        </template>
      </van-cell>
      <van-cell title="昵称" :value="info.name" is-link />
      <van-cell title="介绍" :value="info.mobile" is-link />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" :value="info.gender === 0 ? '男' : '女'" is-link @click="show=true" />
      <van-cell title="生日" :value="info.birthday" is-link @click="showDate=true" />
    </van-cell-group>
    <!-- {{ birthday | datefilter }} -->
    <file-upload ref="fileUpload"></file-upload>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="show=false"
      @select="onSelect"
    />
    <van-popup v-model="showDate" position="bottom" :style="{ height: '40%' }" >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import FileUpload from './fileUpload'
import { apiUserProfile } from '@/api/use'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      info: {},
      show: false,
      showDate: false,
      actions: [{ name: '男' }, { name: '女' }],
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      birthday: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      console.log('222')
    },
    async getProfile () {
      const res = await apiUserProfile()
      // console.log(res)
      this.info = res.data.data
    },
    onSelect (item, index) {
      // console.log(item, index)
      this.info.gender = index
    },
    onConfirm (val) {
      this.info.birthday = dayjs(val).format('YYYY-MM-DD')
      this.showDate = false
    },
    onCancel () {
      this.showDate = false
    },
    fileUpload () {
      this.$refs.fileUpload.show = true
    }
  },
  created () {
    this.getProfile()
  },
  components: {
    FileUpload
  }
}
</script>

<style lang="less" scoped>
.userinfo {
  .navBar {
    background-color: #3296fa;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
    /deep/ .van-icon {
      color: #fff;
    }
    /deep/ .van-nav-bar__text {
      color: #fff;
    }
  }
}
</style>
