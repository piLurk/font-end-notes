<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <!--<navbar></navbar>-->
      <tags-view></tags-view>
      <app-main></app-main>
      <div class="copyright">COPYRIGHT © 2017 jiangroom.com (武汉吉家江寓房产管理服务有限公司). 版权所有 鄂ICP备17008025号</div>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain, TagsView } from '@/views/layout/components'

export default {
  name: 'layout',
  components: {
    // Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.copyright {
    height: 47px;
    line-height: 47px;
    background-color: #f2f4f8;
    text-align: center;
    color: #b2b6be;
    font-size: 14px;
}
.main-container{
	height: 100%;
	width: calc(100% - 180px);
  position: fixed;
  // z-index: 2000;
}
.hideSidebar .main-container{
	width: calc(100% - 50px);
}
</style>
