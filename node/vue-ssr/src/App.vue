<template>
  <section id="app">
    <div>当前的页面路径： <span style="font-size: 20px; color:#f52811;">{{$router.currentRoute.path}}</span></div>
    <br>
    <router-link to="/">Home</router-link>
    <router-link to="/list">List</router-link>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'App'
}
</script>
