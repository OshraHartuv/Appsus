import notePreview from './note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
            <section class="note-list">
                <span class="note-preview" 
                v-for="note in notes" 
                :key="note.id" 
                :style="{backgroundColor:note.style.bgc}">
                    <note-preview :note="note"/>
                </span>
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