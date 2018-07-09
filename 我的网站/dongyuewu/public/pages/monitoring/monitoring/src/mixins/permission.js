export default {
  methods: {
    hasPermission(p_code){
      return true
      // return this.permissions.indexOf('cms_notice_add') !== -1
    },
  },
  computed:{
    permissions(){
      return this.$store.getters.permissions
    }
  }
}