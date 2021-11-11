export default {
    template: `
        <div class="note-filter">
            <!-- <label>Search</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search..."> -->
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
            //deep copy
            // this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }

    }
}