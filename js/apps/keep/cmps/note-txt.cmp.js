import { noteService } from "../services/note.service.js";
import { eventBus } from '../../../services/event-bus-service.js'


export const noteTxt = {
    props: ['note'],
    template: `
        <section class="note-txt" @click = "selected = true">
            <pre class="txt-editor" :class="note.id" id="note-txt" contenteditable="true">{{note.info.txt}}</pre>
        </section>
    `,
    data() {
        return {
            selected: false,
        };
    },
    created() {
        eventBus.$on('unSelect', this.reportVal);
    },
    methods: {
        reportVal(noteId) {
            if (!document.querySelector(`.txt-editor.${noteId}`)) return
            const txt = document.querySelector(`.txt-editor.${noteId}`).innerText
            console.log(noteId, txt);
            noteService.setTxt(noteId, txt)
                .then(() => this.selected = false)
        },
    }
};