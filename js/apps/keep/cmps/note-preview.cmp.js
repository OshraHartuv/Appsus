import { noteTxt } from './note-txt.cmp.js';
import { noteTodos } from './note-todos.cmp.js';
import { noteVideo } from './note-video.cmp.js';
import { noteImg } from './note-img.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    props: ['note'],
    template: `
    <section>
    <component :is="note.type" :note="note" ></component>
    <button class="pin-note" @click.stop="pin(note.id)"title="Pin note"></button>
    <div class="actions-container">
        <button class="trash" @click="remove(note.id)"title="Delete note"></button>
        <button class="duplicate-note" @click.stop="duplicate(note.id)"title="Duplicate note">X</button>
        <button class = "color-palette-container" :class="{'show-colors':showColors}"  @click.stop="showColors=!showColors" title="Pick color" >
            <ul class = "color-palette">
                <li v-for="color in colorArray" @click.stop ="setBgc(note.id,color)" :style = "{'background-color':color}"></li>
            </ul>
        </button>
    </div>
    </section>
    `,
    data() {
        return {
            bgc: this.note.style.bgc,
            colorArray: ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed', '#ffffff'],
            showColors: false
        }
    },
    methods: {
        pin(noteId) {
            console.log('noteId', noteId)
            eventBus.$emit('pinnedNote', noteId)
        },
        remove(noteId) {
            eventBus.$emit('removedNote', noteId)
        },
        setBgc(noteId, color) {
            eventBus.$emit('setBgc', noteId, color)
        },
        duplicate(noteId) {
            console.log('noteId', noteId)
            eventBus.$emit('duplicateNote', noteId)
        }

    },
    computed: {
        noteToEdit() {
            let noteToEdit = JSON.parse(JSON.stringify(this.note))
            noteToEdit.selected = true
            return noteToEdit
        }
    },
    components: {
        noteTxt,
        noteTodos,
        noteVideo,
        noteImg
    }
}