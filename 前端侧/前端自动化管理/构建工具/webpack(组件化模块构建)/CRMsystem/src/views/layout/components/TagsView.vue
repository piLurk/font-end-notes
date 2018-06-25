<template>
  <div class="tags-view-container">
  	<div class="systemName"><h2>CRM系统</h2></div>
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <!-- <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{tag.title}}
        <span class='el-icon-close' v-if="Array.from(visitedViews).length > 1" @click.prevent.stop='closeSelectedTag(tag)'></span>
        <span v-else style="width:10px;height:16px;display:inline-block"></span>
      </router-link> -->
      <el-tabs v-model="currentId" type="card" closable @tab-remove="tabClose" @tab-click="tabChange" class="top-nav">
        <el-tab-pane v-for="(item, index) in menus" :key="item.id" :label="item.name" :name="item.id">
        </el-tab-pane>
      </el-tabs>
    </scroll-pane>
    <div class="outlogin" @click="logout"><span style="color: #3ba0ff;line-height: 53px;display: inline-block;">退出登录</span></div>
    <!-- <ul class='contextmenu' v-show="visible">
      <li @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags">Close All</li>
    </ul> -->
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import { mapGetters } from 'vuex'
export default {
	name: 'TagsView',
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      currentId: ''
    }
  },
  computed: {
    // visitedViews() {
    //   return this.$store.state.tagsView.visitedViews
    // },
    ...mapGetters({
      menus: 'itemArr',
      currentItem: 'currentItem',
      roles: 'roles'
    })
  },
  watch: {
    // $route() {
    //   this.addViewTags()
    //   this.moveToCurrentTag()
    // },
    // visible(value) {
    //   if (value) {
    //     window.addEventListener('click', this.closeMenu)
    //   } else {
    //     window.removeEventListener('click', this.closeMenu)
    //   }
    // },
    currentItem(newItem) {
      this.currentId = newItem.id
      this.$router.replace({ name: newItem.id, params: { ...newItem.params } })
    }
  },
  mounted() {
    // this.addViewTags()
    this.currentId = this.currentItem.id
  },
  methods: {
    // generateRoute() {
    //   if (this.$route.name) {
    //     return this.$route
    //   }
    //   return false
    // },
    // isActive(route) {
    //   return route.path === this.$route.path || route.name === this.$route.name
    // },
    // addViewTags() {
    //   const route = this.generateRoute()
    //   if (!route) {
    //     return false
    //   }
    //   this.$store.dispatch('addVisitedViews', route)
    // },
    // moveToCurrentTag() {
    //   const tags = this.$refs.tag || []
    //   this.$nextTick(() => {
    //     for (const tag of tags) {
    //       if (tag.to === this.$route.path) {
    //         this.$refs.scrollPane.moveToTarget(tag.$el)
    //         break
    //       }
    //     }
    //   })
    // },
    // closeSelectedTag(view) {
    //   this.$store.dispatch('delVisitedViews', view).then((views) => {
    //     if (this.isActive(view)) {
    //       const latestView = views.slice(-1)[0]
    //       if (latestView) {
    //         this.$router.push(latestView.path)
    //       } else {
    //         this.$router.push('/')
    //       }
    //     }
    //   })
    // },
    // closeOthersTags() {
    //   this.$router.push(this.selectedTag.path)
    //   this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
    //     this.moveToCurrentTag()
    //   })
    // },
    // closeAllTags() {
    //   this.$store.dispatch('delAllViews')
    //   this.$router.push('/')
    // },
    // openMenu(tag, e) {
    //   this.visible = true
    //   this.selectedTag = tag
    //   this.left = e.clientX
    //   this.top = e.clientY
    // },
    // closeMenu() {
    //   this.visible = false
    // },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    tabChange(item) {
      const componentId = item.name
      this.$store.commit('SWITCH_MENU', componentId)
    },
    tabClose(componentId) {
      this.$store.dispatch('itemArrRemove', {
        id: componentId
      })
    }
  },
  created() {
    if(this.roles.indexOf('1')>-1||this.roles.indexOf('18')>-1){
        this.$store.dispatch('itemArrAdd', {
          id: 'workbench',
          name: 'ceo工作台',
          params: {}
        })
    }else if(this.roles.indexOf('2')>-1||this.roles.indexOf('3')>-1||this.roles.indexOf('18')>-1){
        this.$store.dispatch('itemArrAdd', {
          id: 'workbench2',
          name: '区经工作台',
          params: {}
        })
    }else if(this.roles.indexOf('4')>-1||this.roles.indexOf('18')>-1){
        this.$store.dispatch('itemArrAdd', {
          id: 'workbench3',
          name: '综合管家工作台',
          params: {}
        })
    }else if(this.roles.indexOf('5')>-1||this.roles.indexOf('18')>-1){
        this.$store.dispatch('itemArrAdd', {
          id: 'workbench4',
          name: '直销管家工作台',
          params: {}
        })
    }
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
	position: relative;
	border-bottom: 1px solid #d8dce5;
	.systemName {
    width: 170px;
    height: 53px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    h2 {
    	margin: 0;
    	padding: 0;
	    font-size: 18px;
	    color: #8894a4;
	    line-height: 53px;
	    font-weight: bolder;
	    margin-left: 20px;
		}
	}
  .tags-view-wrapper {
    background: #fff;
    height: 53px;
    /*border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);*/
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 53px;
      line-height: 53px;
      /* border: 1px solid #d8dce5; */
      border-right:1px solid #f2f2f2;
      border-bottom:2px solid transparent;
      color: #495060;
      background: #fff;
      padding: 0 15px;
      font-size: 14px;
      margin-top: 0px;
      &:first-of-type {
        margin-left: 15px;
        border-left:1px solid #f2f2f2;
      }
      &.active {
        background-color: #f6f8f8;
        color: #7194ad;
        border-bottom:2px solid #7194ad;
        /* &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        } */
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 2;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
.outlogin {
    width: 110px;
    height: 53px;
    font-size: 14px;
    cursor: pointer;
    background: url(../../../assets/logout.png) 13px center no-repeat #fff;
    line-height: 53px;
    text-indent: 18px;
    position: absolute;
    right: 0;
    top: 0;
}
.outlogin:hover {background-image: url(../../../assets/logoutcur.png);}
/*顶部导航标签页*/
.content-tabs {position: relative;height: 53px;background: #fff;
-moz-box-shadow: 0px 0px 2px rgba(000,000,000,0.1);-webkit-box-shadow: 0px 0px 2px rgba(000,000,000,0.1);box-shadow: 0px 0px 2px rgba(000,000,000,0.1);}
.content-tabs .systemName { width: 170px; height: 53px; position:absolute;top:0;left:0; }
.content-tabs .systemName h2 {font-size: 18px; color:#8894a4; line-height:53px; font-weight: bolder; margin-left: 20px;}
// .content-tabs .outlogin { width: 100px; height: 53px; font-size: 12px; cursor:pointer; 
// background:url(../images/logout.png) 13px center no-repeat #fff; line-height: 53px; text-indent:38px; position: absolute;right: 0;top: 0;}
// .content-tabs .outlogin:hover {background-image: url(../images/logoutcur.png);}
</style>

<style rel="stylesheet/scss" lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -1px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}

</style>
