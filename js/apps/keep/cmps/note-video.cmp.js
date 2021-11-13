import { eventBus } from '../../../services/event-bus-service.js'
import { noteService } from "../services/note.service.js";
// @click = "selected = true"
export const noteVideo = {
    props: ['note'],
    template: `
        <section class="note-video" >
            <pre class="video-editor" :class="note.id" contenteditable="true" @click.stop="">{{note.info.title}}</pre>
            <iframe :src="urlToShow"></iframe>
        </section>
    `,
    data() {
        return {
            selected: this.select,
            urlToEdit: null,
            noteToEdit: null
        };
    },
    created() {
        eventBus.$on('unSelect', this.reportVal);
        this.urlToEdit = this.note.info.url
    },
    methods: {
        reportVal(noteId) {
            if (noteId !== this.note.id) return
            const title = document.querySelector(`.video-editor.${noteId}`).innerText
            noteService.setAnimatedNote(noteId, title, this.urlToEdit)
                .then(() => this.selected = false)
        },
    },

    computed: {
        urlToShow() {
            if (this.urlToEdit.includes('watch?v=')) return this.urlToEdit.replace('watch?v=', 'embed/')
            else return this.urlToEdit
        },
        select() {
            return this.note.select
        }
    },
    components: {
        eventBus
    }
};