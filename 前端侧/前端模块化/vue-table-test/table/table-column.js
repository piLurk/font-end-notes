
export default {
  name: 'MyTableColumn',
  props: {
    label: String,
    prop: String
  },
  data() {
    return {

    }
  },
  computed: {
    owner() {
      let parent = this.$parent;
      return parent;
    }
  },
  created() {
    this.owner.addHeader({label:this.label, prop: this.prop})
  },
  render(h) {

  }


}