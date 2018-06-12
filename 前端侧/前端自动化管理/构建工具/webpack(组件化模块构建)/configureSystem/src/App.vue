 // 根组件
<template>
  <div id="app">
    <LeftMenu></LeftMenu>
    <div id="page-wrapper">
      <TopMenu></TopMenu>
      <div id="mainbox" class="row J_mainContent mainBody">
        <transition name="fade" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <CopyRight></CopyRight>
      </div>
      <Message></Message>
    </div>
  </div>
</template>

<script type="text/javascript">
import LeftMenu from 'components/public/LeftMenu.vue'
import CopyRight from 'components/public/CopyRight.vue'
import TopMenu from 'components/public/TopMenu.vue'
import Message from 'components/public/Message.vue'
export default {
  data() {
    return {
      cachedViews: []
    }
  },
  computed: {
    _cachedViews() {
      return this.$store.getters.itemArr.map(m => m.id)
    }
  },
  watch: {
    _cachedViews(val) {
      if (val.length >= this.cachedViews) {
        this.cachedViews = val
      } else {
        setTimeout(() => {
          this.cachedViews = val
        }, 20)
      }
    }
  },
  components: {
    LeftMenu,
    TopMenu,
    CopyRight,
    Message
  },
  methods: {
    //获取核心框架高度
    getHeight() {
      function getContentH() {
        return (
          $(window).height() -
          $('#header').innerHeight(true)
        )
      }
      function homerSize() {
        var ih = getContentH()
        $('#mainbox').css({ height: ih })
      }
      homerSize()
      $(window).resize(homerSize)
    }
  },
  mounted() {
    //获取核心框架高度
    this.getHeight()
    //点击tap关闭切换
    var that = this
    $('.J_menuTabs').delegate('.fa-times-circle', 'click', function() {
      var componentId = $(this)
        .parent()
        .data('id')
    })
  }
}
</script>

<style type="text/css">
#page-wrapper {
  margin-left: 160px;
  padding: 0 15px;
  height: 100%;
  min-height: auto;
  position: inherit;
  transition: all 0.5s;
}
#mainbox {
  /* overflow: hidden; */
  overflow-y: auto;
}
.mainBody {
  padding: 20px;
  padding-bottom: 0px;
  height: 100%;
  box-sizing: border-box;
}
#mypage {
  background: #f2f4f8;
  padding: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s cubic-bezier(1, 0.5, 0.5, 1);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>