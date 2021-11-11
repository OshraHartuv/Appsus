import { noteTxt } from './note-txt.cmp.js';
import { noteTodos } from './note-todos.cmp.js';
import { noteVideo } from './note-video.cmp.js';
import { noteImg } from './note-img.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js'


export default {
    props: ['note'],
    template: `
    <section>
    <component :is="note.type" :data="note" ></component>
    <div>
        <button class="trash" @click="remove(note.id)"></button>
        <!-- <button class="setBgc" @click="setBgc(note.id)"></button> -->
        <input type="color" :value="bgc" class="setBgc" @input.prevent="setBgc(note.id)">
    </div>
    </section>
    `,
    data() {
        return {
            bgc: this.note.style.bgc
        }
    },
    methods: {
        remove(noteId) {
            // this.$emit('remove', noteId);
            eventBus.$emit('removedNote', noteId)
        },
        setBgc(noteId) {
            console.log('changing')
            // this.$emit('remove', noteId);
            eventBus.$emit('setBgc', noteId, this.bgc)
        },
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