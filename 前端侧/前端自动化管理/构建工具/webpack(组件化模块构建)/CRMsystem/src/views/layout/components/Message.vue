<template>
<div class="global-message">
</div>
</template>


<script type="text/javascript">

export default {
  computed: {
    message: function() {
      return this.$store.state.message.message
    }
  },
  mounted() {
    this.$watch("message", ()=>{
      this.$message({ message: this.message.message, type: this.message.type })
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