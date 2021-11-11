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
        <!-- <button class="setBgc" @click="setBgc(note.id)"></button> -->
        <!-- <input type="color" v-model:value="bgc" class="setBgc" @input.prevent="setBgc(note.id)"> -->
        <button class = "color-palette-container">
            <ul class = "color-palette">
                <li v-for="color in colorArray" @click ="setBgc(note.id,color)" :style = "{'background-color':color}"></li>
            </ul>
        </button>
    </div>
    </section>
    `,
    // @click.native="setEditMode"
    data() {
        return {
            bgc: this.note.style.bgc,
            editMode: false,
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
        // setEditMode() {
        //     this.$emit('editMode')
        // }
        // setInput(ev, inputIdx) {
        //     this.answers[inputIdx] = ev;
        //     console.log('Survey Got ev', ev);
        // },
        // save() {
        //     console.log('Survey Answers', this.answers);
        // }
    },
    computed: {},
    components: {
        noteTxt,
        noteTodos,
        noteVideo,
        noteImg
    }
}

//#f28b82 , #fbbc04 , #fff475 , #ccff90 , #a7ffeb , #cbf0f8 , #aecbfa , #d7aefb , #fdcfe8 , #e6c9a8 , #e8eaed , #ffffff