

export default {
  name:'MyTableBody',
  props: {
    store:{
      require:true
    },
    props:{
      type: Array,
      default: function() {
        return []
      }
    },
  },
  methods:{
    getCells(item, index){
      console.log('ggga')
      return this._l(this.columns, column => <td> { item['type'] === 'index' ? index + 1 : item[ column['property'] ] } </td>)
    }
  },
  computed:{
    columns(){
      return this.store.states.columns
    },
    data(){
      return this.store.states.data
    }
  },
  render(h) {

    return (
      <tbody>
        {
          this._l(this.data, (item, index) => <tr>
            {
              this.getCells(item, index)
            }
          </tr> )
        }
      </tbody>
    )
  }
}