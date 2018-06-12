<template>
 <div class="navbar-static-side" ref="scrollContainer" :class="!isCollapse?'':'smallside'">
   <v-bar wrapper="wrapper"
       vBar=""
       vBarInternal=""
       hBar=""
       hBarInternal="">
      <a href="http://www.jiangroom.com" target="_blank">
        <div class="logo" ></div>
      </a>

      <div class="system-user">
        <div class="imgbox"><img src="/static/images/system-user.png"></div>
        <div class="name">{{name}}</div>
        <div class="job">{{introduction}}</div>
      </div>
      <el-menu  class="nav" 
        :collapse="isCollapse" 
        :unique-opened="true" 
        theme="dark">
        <el-submenu v-bind:index="(index+1).toString()" 
        @mouseover.native.stop="overShow(index+1,$event)"
          v-for="(item, index) in menus" 
          v-bind:key="index"  
          v-show="hasPermission(item.p_code)">
          <template slot="title">
            <i class="icon" :class="item.icon" @click="pageChange(item.id, item.name)"></i>
            <span class="nav-label" @click="pageChange(item.id, item.name)">{{item.name}}</span>
          </template>
          <el-menu-item-group>  
            <el-menu-item v-if="isCollapse"  v-bind:index="(index+'-'+(1))" @click="pageChange(item.id, item.name)">
              {{item.name}}
            </el-menu-item>
            <el-menu-item v-bind:index="(index+'-'+(isCollapse?subIndex+1:subIndex))" 
            v-for="(subItem,subIndex) in item.children" v-bind:key="subIndex"
            v-show="hasPermission(subItem.p_code)" 
            @click="pageChange(subItem.id, subItem.name)">
              {{subItem.name}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
       
      <div class="version">
        <span class="v-name">版本号:</span>
        <span class="v-num">V 2.2</span>
      </div>
     <div class="switchBar">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="true" v-if="!isCollapse" class="switchBar" > 点击收起</el-radio-button>
        <el-radio-button :label="false" v-else>展开</el-radio-button>
      </el-radio-group>
     </div>
   </v-bar>
     
     
  </div>

  
</template>


<script type="text/javascript">
import { mapGetters } from "vuex";
import menus from "./leftMenu.config";
import debounce from "lodash/debounce";
import permission from "@/mixins/permission.js";
import VBar from "v-bar";
const delta = 15;

export default {
  components: {
    VBar
  },
  data() {
    return {
      isCollapse: false,
      menus,
      top: 0,
      topArray: {}
    };
  },
  computed: {
    ...mapGetters(["name", "introduction"])
  },
  methods: {
    overShow(index, event) {
      if (this.isCollapse) {
        let offsetTop = (offsetTop = getOffsetRect(event.currentTarget).top);
        let scrolltop = document.getElementsByClassName("bar--wrapper")[0]
          .scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        if (clientHeight - offsetTop < clientHeight/2) {
          event.currentTarget.getElementsByTagName("ul")[0].style.top = "auto";
          event.currentTarget.getElementsByTagName("ul")[0].style.bottom =
            clientHeight - offsetTop - 50 + "px";
        } else {
           event.currentTarget.getElementsByTagName("ul")[0].style.bottom ="auto";
          event.currentTarget.getElementsByTagName("ul")[0].style.top =
            offsetTop + "px";
        }
      }
    },
    pageChange(componentId, componentName) {
      if (!componentId) return;
      this.$store.dispatch("itemArrAdd", {
        name: componentName,
        id: componentId,
        params: {}
      });
    },
    handleScroll(e) {
      e.preventDefault();
      const $container = this.$refs.scrollContainer;
      const $containerHeight = $container.offsetHeight - 30;
      const $wrapper = this.$refs.scrollWrapper;
      const $wrapperHeight = $wrapper.offsetHeight;
      const d = $containerHeight - $wrapperHeight;
      if (e.wheelDelta > 0) {
        this.top = Math.min(0, this.top + e.wheelDelta);
      } else {
        if (d < delta) {
          if (this.top < d - delta) {
            this.top = this.top;
          } else {
            this.top = d - delta - 30;
          }
        } else {
          this.top = 0;
        }
      }
    }
  },
  mixins: [permission],
  mounted() {
    const winResizeListen = function() {
      const maxHeight = window.innerHeight - 20;
      let menuDomList = document.querySelectorAll("#side-menu>li");
      for (let i = 0, len = menuDomList.length; i < len; i++) {
        const pTop = menuDomList[i].offsetTop;
        const childLen = menuDomList[i].querySelectorAll(".nav-second-level>li")
          .length;
        const height = pTop + (childLen + 1) * 50;
        if (height > maxHeight) {
          menuDomList[i].classList.add("top-child");
        } else {
          menuDomList[i].classList.remove("top-child");
        }
      }
    };
    winResizeListen();
    window.onresize = debounce(winResizeListen, 500);
  }
};
function getOffsetRect(ele) {
  var box = ele.getBoundingClientRect();
  var body = document.body,
    docElem = document.documentElement;
  //获取页面的scrollTop,scrollLeft(兼容性写法)
  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
    scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
  var clientTop = docElem.clientTop || body.clientTop,
    clientLeft = docElem.clientLeft || body.clientLeft;
  var top = box.top + scrollTop - clientTop,
    left = box.left + scrollLeft - clientLeft;
  return {
    //Math.round 兼容火狐浏览器bug
    top: Math.round(top),
    left: Math.round(left)
  };
}
</script>

<style>
.navbar-static-side .wrapper .bar--wrapper > * {
  padding-right: 0 !important;
  padding-bottom: 0 !important;
}

.navbar-static-side .bar--wrapper .nav {
  padding-bottom: 180px !important;
}
.navbar-static-side .wrapper .bar--wrapper .system-user {
  padding-bottom: 30px !important;
}
.navbar-static-side .bar--vertical {
  margin-right: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
}
.navbar-static-side .bar--vertical,
.navbar-static-side .bar--horizontal,
.navbar-static-side .bar--vertical-internal,
.navbar-static-side .bar--horizontal-internal {
  background-color: rgba(255, 255, 255, 0) !important;
}
.wrapper {
  height: 100%;
  width: 160px;
}
.scroll-wrapper {
  position: absolute;
  width: 100%;
}
.icon {
  width: 18px;
  height: 20px;
  margin-right: 10px;
  display: inline-block;
}

.nav-label {
  display: inline-block;
}
.el-menu {
  background: #1c2b36;
}
.el-submenu__icon-arrow {
  display: none;
}
.el-menu-item-group__title {
  padding-top: 0;
}

/* level1 */
.el-submenu__title {
  color: #7194ad;
  height: 50px;
  line-height: 50px;
  border-left: 4px solid #1c2b36;
}
.el-menu--dark .el-menu-item,
.el-menu--dark .el-submenu__title {
  color: #7194ad;
}
.el-menu--dark .el-submenu .el-submenu__title {
  padding-left: 10px !important;
}
/* level2 */
.el-menu--collapse .el-submenu .el-menu {
  position: fixed;
}
.el-menu--dark .el-submenu .el-menu {
  background-color: #2f3b45;
}
.el-menu--dark .el-submenu .el-menu .el-menu-item {
  color: #fff;
  text-indent: 10px;
}
.is-opened .el-submenu__title {
  border-left: 4px solid #52abff;
  background-color: #3ca0ff;
  color: #fff;
}

.el-menu--dark .el-submenu .el-menu .el-menu-item.is-active {
  color: #3ca0ff;
}
.el-menu--dark .el-submenu .el-menu .el-menu-item:hover {
  color: #3ca0ff;
}
.el-menu--dark .el-menu-item:hover,
.el-menu--dark .el-submenu__title:hover {
  color: #fff;
}
.switchBar .el-radio-button__inner {
  background: none;
  border: none;
  border-left: none !important;
}
.switchBar input[value="true"] + .el-radio-button__inner {
  color: #6c8190;
  width: 100%;
  padding: 15px 0;
  /* background: url(../../../static/images/closebar.png) no-repeat 20px center; */
}
.switchBar input[value="false"] + .el-radio-button__inner {
  color: rgba(255, 255, 255, 0);
  text-indent: -200px;
  transition: all 0.5s;
}
.smallside .switchBar {
  width: 64px;
  transition: all 0.5s;
}
.smallside .el-menu--dark .el-submenu .el-menu .el-menu-item:first-of-type {
  background: #3ca0ff;
  color: #fff;
}
.smallside .el-menu--dark .el-submenu .el-submenu__title {
  padding-left: 20px !important;
}
.smallside .wrapper {
  width: 64px;
}
.smallside .el-menu--collapse .el-submenu .el-menu {
  left: 60px;
}
.navbar-static-side .el-submenu .el-menu-item {
  min-width: auto;
}
</style>