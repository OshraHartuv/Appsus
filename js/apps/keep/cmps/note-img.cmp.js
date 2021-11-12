import { eventBus } from '../../../services/event-bus-service.js'
import { noteService } from "../services/note.service.js";

export const noteImg = {
    props: ['note'],
    template: `
        <section class="note-img" @click = "selected = true" >
            <pre class="img-editor" :class="note.id" contenteditable="true">{{note.info.title}}</pre>
            <img :src="urlToEdit" >
            <div v-if="selected">
                 <span>change image URL: </span>
                 <form @submit.prevent="reportVal"><input type="text" v-model:value=urlToEdit></form>
            </div>
        </section>
    `,
    data() {
        return {
            selected: false,
            urlToEdit: null
        };
    },
    created() {
        eventBus.$on('unSelect', this.reportVal);
        this.urlToEdit = this.note.info.url
    },
    methods: {
        reportVal(noteId) {
            if (noteId !== this.note.id) return
            const title = document.querySelector(`.img-editor.${noteId}`).innerText
            noteService.setAnimatedNote(noteId, title, this.urlToEdit)
                .then(() => this.selected = false)
        },
    },
    components: {
        eventBus
    }

};