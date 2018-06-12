<template>
  <div id="header">
    <div class="row content-tabs">
      <div class="systemName">
        <h2>配置管理系统</h2>
      </div>

      <el-tabs v-model="currentId" type="card" closable @tab-remove="tabClose" @tab-click="tabChange" class="top-nav">
        <el-tab-pane v-for="(item, index) in menus" :key="item.id" :label="item.name" :name="item.id">
        </el-tab-pane>
      </el-tabs>

      <div class="outlogin" @click="logOut">
        <a>退出登录</a>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import { setToken, TokenKey } from '@/utils/auth'


export default {
  data() {
    return {
      currentId: ''
    }
  },
  methods: {
    tabChange(item) {
      const componentId = item.name
      this.$store.commit('SWITCH_MENU', componentId)
    },
    tabClose(componentId) {
      this.$store.dispatch('itemArrRemove', {
        id: componentId
      })
    },
    logOut() {
      this.$store.dispatch('LogOut')
    }
  },
  computed: {
    ...mapGetters({
      menus: 'itemArr',
      currentItem: 'currentItem'
    })
  },
  watch: {
    currentItem(newItem) {
      this.currentId = newItem.id
      this.$router.replace({ name: newItem.id, params: { ...newItem.params } })
    }
  },
  created() {
    this.$store.dispatch('GetUserInfo')

    this.$store.dispatch('itemArrAdd', {
      id: 'workbench',
      name: '工作台',
      params: {}
    })
  },
  mounted() {
    this.currentId = this.currentItem.id
  }
}
</script>
<style>
.top-nav {
  margin-left: 160px;
  margin-right: 100px;
  height: 100%;
  border-left: 1px solid #f2f2f2;
  border-right: 1px solid #f2f2f2;
}
.top-nav .el-tabs__header {
  border-bottom: 0;
}
.top-nav .el-tabs__header .el-tabs__item {
  height: 53px;
  line-height: 53px;
  border-radius: 0;
  border: 0;
  border-right: solid 1px #f2f2f2;
}
.top-nav .el-tabs__header .el-tabs__item:hover,
.top-nav .el-tabs__header .el-tabs__item.is-active {
  border: 0;
  border-right: 1px solid #f2f2f2;
  border-bottom: 2px solid #7194ad;
  color: #7194ad;
  background: #f6f8f8;
}
.top-nav .el-tabs__nav-wrap.is-scrollable {
  padding: 0 53px;
}
.top-nav .el-tabs__nav-next,
.top-nav .el-tabs__nav-prev {
  line-height: 53px;
  width: 53px;
  font-size: 18px;
  text-align: center;
  color: #b3b3b3;
}
.top-nav .el-tabs__nav-next:hover,
.top-nav .el-tabs__nav-prev:hover {
  background: #fafafa;
  font-size: 18px;
  color: #607ba2;
}
.top-nav .el-tabs__nav-next {
  border-left: 1px solid #f2f2f2;
}
.top-nav .el-tabs__nav-prev {
  border-right: 1px solid #f2f2f2;
}
</style>