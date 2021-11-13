export default {
    template: `
        <section class="note-filter">
            <input @input="filter" 
            v-model="filterBy.title" 
            type="text" 
            placeholder="Search a note">
            <select @input="filter" v-model="filterBy.type">
                <option value="all">All</option>
                <option value="note-txt">Text</option>
                <option value="note-todos">List</option>
                <option value="note-img">Image</option>
                <option value="note-video">Videos</option>
            </select>
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                type: 'all'
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy);
            //deep copy
            // this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
}