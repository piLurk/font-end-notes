<template>
  <div class="scroll-container" ref="scrollContainer" @mousewheel="handleScroll">
  	<!-- <a href="http://www.jiangroom.com/" target="_blank"><div class="logo"></div></a>
    <div class="system-user">
	    <div class="imgbox"><img src="../../assets/system-user.png"></div>
	    <div class="name">{{this.$store.getters.name}}</div>
      <div class="job">{{this.$store.getters.position}}</div>
    </div> -->
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
    <div class="version"><span class="v-name">版本号：</span><span class="v-num">V 2.4</span></div>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    
  </div>

</template>

<script>
const delta = 25
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'scrollBar',
  components: { Hamburger },
  data() {
    return {
      top: 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    handleScroll(e) {
      e.preventDefault()
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      if (e.wheelDelta > 0) {
        this.top = Math.min(0, this.top + e.wheelDelta)
      } else {
        if ($containerHeight -$wrapperHeight - 74.6 < 0) {
          if (this.top < ($containerHeight - $wrapperHeight - 100)) {
            this.top = this.top
          } else {
            // this.top =$containerHeight - $wrapperHeight - delta
            // this.top = this.top - delta;
            this.top = Math.max(this.top + e.wheelDelta, $containerHeight - $wrapperHeight - delta -100)
          }
        } else {
          this.top = 0
        }
      }
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #1c2b36;
  .logo {
    width: 100%;
    height: 54px;
    border-bottom: 1px dotted #131a1f;
    background: url(../../assets/newlogo.png) center center no-repeat;
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
  .scroll-wrapper {
    position: absolute;
     width: 100%!important;
  }
  .version {
    width: 180px;
    position: fixed;
    bottom: 45px;
    line-height: 30px;
    color: #6c8190;
    background-color: #1c2b36;
    text-align: center;
    font-size: 14px;
    .v-name {
    	margin-left: 10px;
		}
		.v-num {
    	color: #3ba0ff;
		}
	}
  .hamburger-container{
  	background: #2a3f4e;
  	height: 45px;
  	position: absolute;
  	bottom: 0;
  	left: 0;
    width: 100%!important;
    text-align: center;
  }
}

.hideSidebar .scroll-container{
	.logo {
    background-image: url(../../assets/newlogo2.png);
	}
	.system-user {
		text-align: center; font-size: 14px; padding-bottom: 30px; border-bottom: 2px solid #17242e;
		.imgbox { 
			width: 40px;height: 40px;
		}
		.job {
			display: none;
		}
	}
	.version {
		width: 50px;
    .v-name {
    	display: none;
		}
  }
  .el-submenu{
    &:hover{
      
    }
  }
}


</style>
