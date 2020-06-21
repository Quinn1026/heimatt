<template>
  <div class="write">
    <van-field
    v-model="value"
    clearable
    placeholder="请输入"
    >
    <template #button>
      <van-button @click="addComment" size="small" type="primary">发送</van-button>
    </template>
    </van-field>
  </div>
</template>

<script>
import { apiAddComment } from '@/api/comment'
export default {
  name: 'Write',
  data () {
    return {
      value: '',
      artId: ''
    }
  },
  props: ['isReply', 'comId'],
  methods: {
    async addComment () {
      console.log(this.comId)
      const target = this.isReply ? this.comId : this.$route.params.artid
      const artId = this.isReply ? this.$route.params.artid : null
      const res = await apiAddComment({
        target: target,
        content: this.value,
        artId: artId
      })
      console.log(res)
      if (res.status === 201) {
        this.$emit('addComment', res.data.data.new_obj)
        this.value = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.write {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  /deep/ .van-field__control {
    height: 38px;
    border: 1px solid #ddd;
    border-radius: 19px;
    padding-left: 15px;
  }
}
</style>
