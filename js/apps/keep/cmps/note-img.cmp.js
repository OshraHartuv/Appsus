
export const noteImg = {
    props: ['note'],
    template: `
        <section class="note-img">
                {{note.info.title}}
                <img :src="note.info.url">
                <div v-if="note.selected"> hi!!</div>
        </section>
    `,
    data() {
        return {
            // txt: '',
        };
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.txt);
        }
    }
};