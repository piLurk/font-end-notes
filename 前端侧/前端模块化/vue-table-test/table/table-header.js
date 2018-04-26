

export default {
  name:'MyTableHead',
  props: {
    store:{
      require:true
    },
    labels:{
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed:{
    columns(){
      return this.store.states.columns
    }
  },
  render(h) {
    return (
      <thead>
        <tr>
          {
            this._l(this.columns, column => <th>{ column.label }</th>)
          }
        </tr>
      </thead>
    )
  }
}