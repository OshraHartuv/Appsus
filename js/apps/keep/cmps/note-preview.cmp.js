import { noteTxt } from './note-txt.cmp.js';
import { noteTodos } from './note-todos.cmp.js';
import { noteVideo } from './note-video.cmp.js';
import { noteImg } from './note-img.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    props: ['note'],
    template: `
    <section>
    <component :is="note.type" :note="note" :selected="selected" ></component>
    <section class="pin-container"><a class="fa fa-map-pin pin-note" @click.stop="pin(note.id)"title="Pin note">
    </a></section>
    <div class="actions-container">
        <a class="fa fa-trash" @click.stop="remove(note.id)"title="Delete note"></a>
        <a class="fa fa-clone duplicate-note" @click.stop="duplicate(note.id)"title="Duplicate note"></a>
        <a class="fa fa-envelope" @click.stop="sendByMail"></a>
        <a class="" @click="">&#10530</a>
        <a class = "fa fa-paint-brush color-palette-container" :class="{'show-colors':showColors}"  @click.stop="showColors=!showColors" title="Pick color" >
            <ul class = "color-palette">
                <li v-for="color in colorArray" @click.stop ="setBgc(note.id,color),showColors=!showColors" :style = "{'background-color':color}"></li>
            </ul>
        </a>
    </div>
    </section>
    `,
    data() {
        return {
            bgc: this.note.style.bgc,
            colorArray: ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed', '#ffffff'],
            showColors: false,
            selected: false
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
        },
        sendByMail() {
            if (this.note.type === 'note-img' || this.note.type === 'note-video') {
                const msg = {
                    txt: 'Send only text or list notes',
                    type: 'error',
                };
                eventBus.$emit('showMsg', msg);
                return
            }

            let noteToSend = JSON.parse(JSON.stringify(this.note))
            let msg = JSON.stringify(noteToSend.info)
            this.$router.push(`/mail/compose/${msg}`);
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