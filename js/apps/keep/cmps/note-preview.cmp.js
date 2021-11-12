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
    <div class="actions-container">
        <button class="trash" @click="remove(note.id)"></button>
        <button class = "color-palette-container">
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
            colorArray: ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed', '#ffffff']
        }
    },
    methods: {
        remove(noteId) {
            eventBus.$emit('removedNote', noteId)
        },
        setBgc(noteId, color) {
            eventBus.$emit('setBgc', noteId, color)
        },
    },
    computed: {},
    components: {
        noteTxt,
        noteTodos,
        noteVideo,
        noteImg
    }
}