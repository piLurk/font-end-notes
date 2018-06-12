<template>
  <div class="miniPages">
    <span class="pdlr5">总记录：
      <i class="fc" v-text="total"></i> 个</span>
    <span class="pdlr5" v-show="total!==0">当前第
      <i class="fc" v-text="curr"></i> 页</span>
    <span class="pdlr5">共
      <i class="fc" v-text="pageTotal"></i> 页</span>
    <span class="pdlr5" v-show="curr!==1">
      <a class="fc" href="javascript:void(0)" @click="pageChange(1)">首页</a>
    </span>
    <span class="pdlr5" v-show="curr-1>=1">
      <a class="fc" href="javascript:void(0)" @click="pageChange(curr-1)">上一页</a>
    </span>
    <span class="pdlr5" v-show="curr+1<=pageTotal">
      <a class="fc" href="javascript:void(0)" @click="pageChange(curr+1)">下一页</a>
    </span>
    <span class="pdlr5" v-show="curr!==pageTotal && pageTotal !==0">
      <a class="fc" href="javascript:void(0)" @click="pageChange(pageTotal)">末页</a>
    </span>
  </div>
</template>


<script type="text/javascript">
export default {
  props: ["total", "curr", "pageChange"],
  computed: {
    pageTotal: function() {
      return Math.ceil(this.total / 10);
    }
  }
};
</script>

<style scoped>
.fc {
  color: #3ba0ff;
}
</style>