

export default {
  name:'MyTableHead',
  props: {
    labels:{
      type: Array,
      default: function() {
        return []
      }
    }
  },
  render(h) {
    return (
      '<thead>\
        <tr>\
          <td v-for="(item, key) in labels" v-text="item"></td>\
        </tr>\
      </thead>'
    )
  }
}