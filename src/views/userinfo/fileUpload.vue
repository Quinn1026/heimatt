<template>
  <div class="fileUpload">
    <van-popup v-model="show" class="popup">
      <van-cell @click="openfile">从相册中选择</van-cell>
      <input ref="fileinput" type="file" @change="onChange" style="display:none">
      <van-cell>拍照</van-cell>
      <van-cell>取消</van-cell>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    openfile () {
      this.$refs.fileinput.click()
    },
    onChange () {
      const file = this.$refs.fileinput.files[0]
      console.log(file)
      // 创建reader对象
      const reader = new FileReader()
      // 将图片转换为url
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        // 得到的转换结果 reader.result
        ImagePreview([reader.result])
      })
    }
  }
}
</script>

<style lang="less" scoped>
.fileUpload {
  .popup {
    width: 80%;
    border-radius: 5px;
    .van-cell__value--alone {
      text-align: center;
    }
  }
}
</style>
