import notePreview from './note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
            <section class="note-list">
                <div class="main-screen" :class="{'menu-open':selectedNote}" @click="toggleMenu()"></div>
                <span class="note-preview"
                :class="{'edit-mode' : selectedNote && note.id === selectedNote.id }"
                v-for="note in notes" 
                :key="note.id" 
                :style="{backgroundColor:note.style.bgc}"
                @click="setEditMode(note)">
                    <note-preview :note="note" />
                </span>
            </section>
    `,
    data() {
        return {
            editMode: false,
            selectedNote: null
        }
    },
    methods: {
        setEditMode(note) {
            this.selectedNote = note
        },

        toggleMenu() {
            this.selectedNote = null
        },
    },

    computed: {
    },
    components: {
        notePreview
    }
};