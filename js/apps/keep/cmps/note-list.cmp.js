import notePreview from './note-preview.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    props: ['notes'],
    template: `
            <section class="note-list">
                <div class="main-screen" :class="{'menu-open':selectedNote}" @click="toggleMenu"></div>
                <section class="note-preview"
                :class="{'edit-mode' : selectedNote && note.id === selectedNote.id }"
                v-for="note in notesToRender" 
                :key="note.id" 
                :style="{backgroundColor:note.style.bgc}"
                @click="setEditMode(note)"
                >
                    <note-preview :note="(selectedNote && note.id === selectedNote.id) ? selectedNote: note" />
                </section>
            </section>
    `,
    // @click="setEditMode(note)"
    data() {
        return {
            selectedNote: null,
        }
    },
    created() {
        eventBus.$on('removedNote', this.toggleMenu);
    },
    methods: {
        setEditMode(note) {
            note.selected = true
            this.selectedNote = note
        },

        toggleMenu() {
            eventBus.$emit('unSelect', this.selectedNote.id)
            this.selectedNote = null
        },
    },
    computed: {
        notesToRender() {
            if (!this.notes) return null
            let notes = JSON.parse(JSON.stringify(this.notes))
            return notes.reverse()
        }
    },
    components: {
        notePreview,
        eventBus
    }
};