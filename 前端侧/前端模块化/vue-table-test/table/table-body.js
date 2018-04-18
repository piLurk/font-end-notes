

export default {
  name:'MyTableBody',
  props: {
    data:{
      type: Array,
      default: function() {
        return []
      }
    },
    props:{
      type: Array,
      default: function() {
        return []
      }
    },
  },
  render(h) {

    return (
      '<tbody>\
        <tr v-for="(item, index) in data">\
          <td v-for="(item, key) in item" v-if="props.indexOf(key) !== -1" v-text="item"></td>\
        </tr>\
      </tbody>'
    )
  }
}