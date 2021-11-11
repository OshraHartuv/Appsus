
export const noteVideo = {
    props: ['note'],
    template: `
        <div class="note-video">
            <h4>{{note.info.title}}</h4>
            <iframe :src="urlToShow"></iframe>
        </div>
    `,
    data() {
        return {
            txt: '',
        };
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.txt);
        }
    },
    computed: {
        urlToShow() {
            if (this.note.info.url.includes('watch?v=')) return this.note.info.url.replace('watch?v=', 'embed/')
            else return this.note.info.url
        }
    },
    components: {

    }
};