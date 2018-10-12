<template>
  <div class="eva">
    {{data}}~~~
    <img :src="testImg" alt="测试图片">
    <img :src="bigImg" alt="测试图片">
    <!-- <Button>iview</Button> -->
    <!-- <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker> -->
  </div>
</template>

<script>
import testImg from './imgs/images.jpg'
import bigImg from './imgs/big.jpg'
export default {
  data() {
    return {
      data: '哟哟哟',
      testImg: testImg,
      bigImg: bigImg
    }
  }
}
</script>

<style>
.eva {
  background: #ccc;
}
</style>
