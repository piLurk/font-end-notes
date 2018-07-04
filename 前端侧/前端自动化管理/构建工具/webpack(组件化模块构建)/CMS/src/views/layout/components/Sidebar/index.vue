<template>
  <div class="sidebar-container">
    <div class="logo-wrap">
      <a href="//www.jiangroom.com">
        <div class="logo"></div>
      </a>
    </div>
    <div class="system-user">
      <div class="avatar-box">
        <img data-v-0babd96a="" src="/static/images/system-user.png">
      </div>
      <div class="name">{{name}}</div>
      <div class="job">{{jobName}}</div>
      
    </div>
    <el-scrollbar class="" wrapClass="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item :routes="permission_routers"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
  
  
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'name',
      'jobName',
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
