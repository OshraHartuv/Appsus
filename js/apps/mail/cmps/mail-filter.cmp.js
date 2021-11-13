export default {
  props: ['box'],
    template: `
          <div class="mail-filter">
              <input 
              @input="filter"
              v-model="filterBy" 
              type="text" 
              :placeholder="setPlaceholder" 
              value="">
          </div>
      `,
    data() {
      return {
        filterBy: '',
      };
    },
    methods: {
      filter() {
        this.$emit('filtered', this.filterBy);
      },
      cleanValue(){
        this.filterBy =''
      } 
    },
    computed:{
      setPlaceholder(){
        this.cleanValue()
        var placeholder = 'Search'
        if (this.box !== 'all') placeholder +=  ` in ${this.box}`
        return placeholder
      },
           
    }
  };