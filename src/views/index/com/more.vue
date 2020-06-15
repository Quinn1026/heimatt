<template>
  <div class="more">
    <van-popup v-model="show" class="popCell">
      <van-cell-group v-if="isReport===false">
        <van-cell icon="bill-o" title="不感兴趣" @click="unlike" />
        <van-cell icon="warning-o" title="反馈垃圾内容" is-link @click="isReport=true" />
        <van-cell icon="delete" title="拉黑作者" />
      </van-cell-group>
      <!-- 反馈垃圾 -->
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isReport=false" />
        <van-cell @click="report(item.id)" v-for="(item, index) in reportList" :key="index" :title="item.type" />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { apiUnlikeArticle, apiReport } from '@/api/articles'
export default {
  props: ['unlikeID'],
  data () {
    return {
      show: false,
      reportList: [
        { id: 0, type: '其他问题' },
        { id: 1, type: '标题夸张' },
        { id: 2, type: '低俗色情' },
        { id: 3, type: '错别字多' },
        { id: 4, type: '旧闻重复' },
        { id: 5, type: '广告软文' },
        { id: 6, type: '内容不实' },
        { id: 7, type: '涉嫌违法犯罪' },
        { id: 8, type: '侵权' }
      ],
      isReport: false
    }
  },
  methods: {
    async unlike () {
      this.$emit('delArticle', this.unlikeID)
      await apiUnlikeArticle(this.unlikeID)
      this.show = false
    },
    async report (type) {
      await apiReport({
        target: this.unlikeID,
        type: type
      })
      this.$toast('举报成功')
      this.show = false
      this.isReport = false
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
