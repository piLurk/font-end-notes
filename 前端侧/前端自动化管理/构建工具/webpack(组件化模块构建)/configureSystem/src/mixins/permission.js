

export default {
  methods: {
    hasPermission(p_code){
      // return true
      return p_code in this.permissions && this.permissions[p_code]
    },
  },
  computed:{
    permissions(){
      return this.$store.getters.permissions
    }
  }
}