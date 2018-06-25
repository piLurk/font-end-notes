<template>
  <div class="dashboard-container">
     <p>您没有权限访问工作台!</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    >p {
      font-size: 24px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
