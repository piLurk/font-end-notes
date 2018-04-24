<template>
  <tbody>
    
  </tbody>
  
</template>
<script>
export default {
  name:'MyTableBody',
  props: {
    store:{
      required: true
    }
  },
  computed: {
    data() {
      return this.store.states.data
    }
  }
}
</script>
