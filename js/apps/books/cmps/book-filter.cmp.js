export default {
  template: `
        <div class="book-filter">
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search by title">
            <div class="price-filter">
            <input @input="filter" v-model.number="filterBy.fromPrice" type="number" placeholder="From Price">
            <input @input="filter" v-model.number="filterBy.toPrice" type="number" placeholder="To Price">
            </div>
        </div>
    `,
  data() {
    return {
      filterBy: {
        title: '',
        fromPrice: null,
        toPrice: null,
      },
    };
  },
  methods: {
    filter() {
      this.$emit('filtered', { ...this.filterBy });
    },
  },
};
