import notePreview from './note-preview.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js'

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
                    <note-preview :note="(selectedNote && note.id === selectedNote.id) ? selectedNote: note" />
                </span>
            </section>
    `,
    data() {
        return {
            editMode: false,
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
            eventBus.$emit('unSelect')
            this.selectedNote = null
        },
    },
    computed: {
    },
    components: {
        notePreview,
        eventBus
    }
};