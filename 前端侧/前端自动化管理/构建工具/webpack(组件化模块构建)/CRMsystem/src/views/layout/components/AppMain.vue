<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      cachedViews: []
    };
  },
  computed: {
  	// cachedViews() {
    //   console.log(this.$store.state.tagsView.cachedViews)
    //   return this.$store.state.tagsView.cachedViews
    // },
    _cachedViews() {
      return this.$store.getters.itemArr.map(m => m.id);
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  watch: {
    _cachedViews(val){
      if(val.length >= this.cachedViews){
        this.cachedViews = val
      } else {
        setTimeout(() => {
          this.cachedViews = val
        }, 20)
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  height: calc(100% - 100px);
  overflow-x: auto;
  overflow-y: auto;
  background-color: #f2f4f8;  padding: 20px;}
</style>