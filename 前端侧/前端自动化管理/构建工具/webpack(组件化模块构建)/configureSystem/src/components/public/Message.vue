<template>
<div class="global-message">
</div>
</template>


<script type="text/javascript">
const options ={
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
}
export default {
  data(){
    return {
      loadEle:null,
      loadEles:{}
    }
  },
  computed: {
    message: function() {
      return this.$store.state.message.message
    },
    loading:function(){
      return this.$store.state.message.loading
    },
  },
  mounted() {
    this.$watch("message", ()=>{
      this.$message({ message: this.message.message, type: this.message.type })
    });
    this.$watch('loading',{
      handler:(now,pre) => {
        if(this.loadEles[now.target]){
          if(now.state === false){
            this.loadEles[now.target].close();
          }else{
            this.loadEles[now.target].close();
            this.loadEles[now.target]=this.$loading({...options,target:'.'+now.target});
          }
        }else{
          this.loadEles[now.target]=this.$loading({...options,target:'.'+now.target});
        }
      },
      deep:true
    })
  }
};
</script>

<style scoped>
.global-message{
  display: none;
  visibility: hidden;
}
</style>