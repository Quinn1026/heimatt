<template>
  <div class="more">
    <van-popup v-model="show" class="popCell">
      <van-cell-group>
        <van-cell icon="bill-o" title="不感兴趣" @click="unlike" />
        <van-cell icon="warning-o" title="反馈垃圾内容" is-link />
        <van-cell icon="delete" title="拉黑作者" />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ['unlikeID'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    unlike () {
      this.$emit('delArticle', this.unlikeID)
      this.show = false
    }
  }
}
</script>

<style lang="less">
.more {
  .popCell {
    width: 90%;
    border-radius: 5px;
  }
}
</style>
