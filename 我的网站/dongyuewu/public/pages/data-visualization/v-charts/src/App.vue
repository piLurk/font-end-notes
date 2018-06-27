<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  beforeCreate() {
    // 路由初始化
    this.$store.dispatch('routeInit')
  }
};
</script>