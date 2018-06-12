<template>
  <div class="overview progress-overview" :class="'gradient2-' + color">
    <i class="ov-icon" :class="icon"></i>
    <p class="label">
      <span>{{label}}</span>
      <count-to  v-if="value!==null" class="value" ref="countTo" :start-val="startVal" :end-val="value" :duration="duration" :autoplay="true"></count-to>
    <span v-else class="value">-</span>
    </p>
    
  </div>
</template>


<script type="text/javascript">
import countTo from 'vue-count-to'

export default {
  props: {
    icon: { type: String },
    color: { type: String },
    label: { type: String },
    value: {
      type: Number,
      default: 0
    }
  },
  components: { countTo },
  data() {
    return {
      startVal: 0,
      duration: 1000,
    }
  }
};
</script>

<style scoped>
.progress-overview {
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  height: 52px;
  padding-top: 0;
}
.progress-overview:hover:before {
    left: 400px;
    transition: left 1.5s ease 0s;
}
.progress-overview:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -280px;
    overflow: hidden;
    background: linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.4) 50%,rgba(255,255,255,0));
    -webkit-transform: skewX(25deg);
    -moz-transform: skewX(25deg);
    -o-transform: skewX(25deg);
    transform: skewX(25deg);
}
.ov-icon {
  top: 14px;
  left: 16px;
  font-size: 0;
  width: 26px;
  height: 26px;
}
.label, .value {
  color: #fff;
}
.label{
  padding-left: 20px;
}

</style>