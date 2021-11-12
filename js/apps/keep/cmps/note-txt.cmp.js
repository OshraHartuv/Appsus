import { noteService } from "../services/note.service.js";
import { eventBus } from '../../../services/event-bus-service.js'


export const noteTxt = {
    props: ['note'],
    template: `
        <section class="note-txt">
            <div contenteditable="true"> -->
                {{note.info.txt}}
            </div>
        </section>
    `,
    data() {
        return {
            selected: false
        };
    },
    created() {
        eventBus.$on('unSelect', this.unSelectNote);
    },
    methods: {
        unSelectNote() {
            console.log(this.note);
            noteService.save(this.note)
                .then(() => this.selected = false)

        },
    }
};