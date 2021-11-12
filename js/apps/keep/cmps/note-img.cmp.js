import { eventBus } from '../../../services/event-bus-service.js'
import { noteService } from "../services/note.service.js";


export const noteImg = {
    props: ['note'],
    template: `
        <section class="note-img" @click = "selected = true" >
                {{note.info.title}}
                <img :src="note.info.url" >
                <div v-if="selected">
                    <input type="text" v-model:value=note.info.title>
                    <input type="text" v-model:value=note.info.url>
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
            // console.log(this.note);
            noteService.save(this.note)
                .then(() => this.selected = false)

        },

    },
    components: {
        eventBus
    }

};