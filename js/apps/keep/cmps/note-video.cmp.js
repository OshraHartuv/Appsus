
export const noteVideo = {
    props: ['data'],
    template: `
        <div class="note-video">
            <h4>{{data.info.title}}</h4>
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
            if (this.data.info.url.includes('watch?v=')) return this.data.info.url.replace('watch?v=', 'embed/')
            else return this.data.info.url
        }
    },
    components: {

    }
};