<template>
  <scroll-bar class="scroll-bar">
    <a href="http://www.jiangroom.com/" target="_blank"><div class="logo"></div></a>
    <div class="system-user">
	    <div class="imgbox"><img src="../../../../assets/system-user.png"></div>
	    <div class="name">{{this.$store.getters.name}}</div>
      <div class="job">{{this.$store.getters.position}}</div>
    </div>
    <el-menu mode="vertical" :unique-opened="true" :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
   <!--background-color="transparent" text-color="#7194ad" active-text-color="#3ca0ff"-->
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

const arr = [{
  path: '/quicklyadd',
  name: 'quicklyadd',
  meta: { title: '快速新增', icon: 'quicklyadd-icon', permission: 'crm' },
  children: [
    {
      path: 'addclue',
      name: 'addclue',
      meta: { title: '线索', icon: 'add-icon', permission: 'crm' }
    },
    {
      path: 'addbusiness',
      name: 'addbusiness',
      meta: { title: '商机', icon: 'add-icon', permission: 'crm' }
    }
  ]
}]

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    routes() {
      return [...arr, ...this.permission_routers]
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-bar{
  .logo {
    width: 100%;
    height: 54px;
    border-bottom: 1px dotted #131a1f;
    background: url(../../../../assets/newlogo.png) center center no-repeat;
	}
	.system-user {
		text-align: center; font-size: 14px; padding-bottom: 30px; border-bottom: 2px solid #17242e;
		.imgbox { 
			width: 50px;height: 50px;margin: 0 auto; margin-top: 30px;
			img { 
				width: 100%; 
			}
		}
		.name { 
			padding: 16px 0 10px 0; color: #c1cfe0; 
		}
		.job {
			color: #44657b;
		}
	}
}
  
</style>