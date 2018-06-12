<template>
  <div class="overview house-overview">
    <i class="ov-icon" :class="'gradient-' + color"></i>
    <p class="label clearfix">
      <span class="text-title">{{label}} </span>
      <span class="text-number">
        <count-to v-if="value!==null" class="value" ref="countTo" :start-val="startVal" :end-val="value" :duration="duration" :decimals="suffix ? 2 : 0" :autoplay="true"></count-to>
        <span v-else class="value">-</span>
        <span v-if="suffix&&value!==null" class="suffix">{{suffix}}</span>
      </span>
      </p>
  </div>
</template>


<script type="text/javascript">
import countTo from 'vue-count-to'

export default {
  props: {
    color: { type: String },
    label: { type: String },
    value: {
      type: Number,
      default: 0
    },
    suffix: { type: String }
  },
  components: { countTo },
  data() {
    return {
      startVal: 0,
      duration: 1000
    }
  }
}
</script>
<style>
.text-title{
  float: left;
}
.text-number{
float:right;padding-right:10px;
}
</style>

