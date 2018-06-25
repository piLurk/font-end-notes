<template>
  <div id="app">
    <router-view></router-view>
    <Message></Message>
  </div>
</template>

<script>
import Message from './views/layout/components/Message.vue'
import { mapActions } from 'vuex'
export default {
  name: 'app',
  components: {
    Message
  },
  methods: {
    ...mapActions(
      ['GetUserId']
    )
  },
  beforeMount() {
    // this.GetUserId()
  }
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
