<template>
  <section class="home">
    <h2>从服务端去获取的数据</h2>
    <ul>
      <li v-for="item in $store.state.datas" :key="item.id">{{item.title}}</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Home',
  asyncData ({ store, route }) {
    return store.dispatch('fetchData') // 服务端获取异步数据
  },
  data () {
    return {

    }
  },
  mounted () {
    // 客户端不存在 created 和 beforeCreated 生命周期
    console.log('store', this.$store)
    if(!this.$store.state.datas.length) {
      this.$store.dispatch('fetchData')
    }
  }
}
</script>

<style>
  .home {
    background-color: #f2f2f2;
    margin: 20px;
    padding: 20px;
  }
</style>
