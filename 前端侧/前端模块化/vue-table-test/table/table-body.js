

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
    updataData(){
      var data = this.data;
      this.data = [...this.store.states.data]
    },
    getCells(row, index){
       return this._l(this.columns, column =>  this.getTdAppend(row, column, index) )
    },
    getTdAppend(row, column, index){
      if(column['type'] === 'index') {
        return <td> { index + 1 } </td> 
      }
      
      if(column['type'] === 'expand') {
        return (<td class = "arrowTd">
                  <i 
                    class="arrow"
                  ></i>
                </td>) 
      }

      if(column['type'] === 'section') {
        return (<td class = "section-td">
                  <i 
                    class={ [{'section-checkbox':true, isSelected: this.isSelected(row)}] } 
                    on-click={ ($event) => this.simpleSelectClick($event, row) }
                  ></i>
                </td>) 
      }
      
      return <td> { row[ column['property'] ] } </td>
    },
    isSelected(row){
      return row['selected']
    },
    simpleSelectClick(event, row) {
      this.store.commit('rowSelectedChanged', row)
      this.updataData();
    },
  },
  created(){
    this.data = this.store.states.data;
  },
  computed:{
    table() {
      return this.$parent;
    },
    columns(){
      return this.store.states.columns
    },
    isRowExpanded(){
      return this.store.states.isRowExpanded;
    }
  },
  render(h) {

    return (
      <tbody>
        {
          this._l(this.data, (row, index) => 
            [
              <tr>
                {
                  this.getCells(row, index)
                }
              </tr>,
              this.isRowExpanded
                ? (<tr>
                  <td colspan={ this.columns.length }>
                    { this.table.renderExpanded ? this.table.renderExpanded(h, {row, index}) : '' }
                  </td>
                </tr>)
                : ''
            ]
           )
        }
      </tbody>
    )
  }
}