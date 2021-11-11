export default {
    template: `
          <div class="mail-filter">
              <label><span>Search</span>
              <input @input="filter" v-model="filterBy.title" type="text" placeholder="Title">
              </label>
          </div>
      `,
    data() {
      return {
        filterBy: {
          title: '',
        },
      };
    },
    methods: {
      filter() {
        console.log(this.filterBy);
        this.$emit('filtered', { ...this.filterBy });
      },
    },
  };