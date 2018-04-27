

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
      return this.store.states.columns;
    },
    table(){
      return this.$parent;
    },
    data() {
      return this.store.states.data;
    }
  },
  methods: {
    allSelectClick(event, data) {
      // 选择或取消所有
      
    }
  },
  render(h) {
    return (
      <thead>
        <tr>
          {
            this._l(this.columns, 
              column =>           
                  column['type'] === 'section'?
                    <th class = "section-td">
                      <i 
                        class="section-checkbox"
                        on-click={ ($event) => this.allSelectClick($event, row) }
                      ></i>
                    </th>
                  :
                  <th>{ column.label }</th>
            )
          }
        </tr>
      </thead>
    )
  }
}