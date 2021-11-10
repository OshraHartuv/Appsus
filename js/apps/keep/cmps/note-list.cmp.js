import notePreview from './note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
        <section>
            <div class="note-list">
                <span v-for="note in notes" :key="note.id" class="note-preview-container" >
                    <note-preview :note="note" />
                </span>
            </div>
        </section>
    `,
    methods: {

    },
    computed: {

    },
    methods: {
        select(note) {
            console.log('')
            this.$emit('selected', note);
        },
    },

    components: {
        notePreview
    }
};