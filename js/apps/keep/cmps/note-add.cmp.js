// import { carService } from '../services/car-service.js';

import { noteService } from "../services/note.service.js";
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
        <section>
            <form @submit.prevent.stop="save" class="note-add" >
                <input class="add-start" type="text" :placeholder="placeholder" v-model:value="newNote.info.txt" @change="save">
                <div class="actions">
                    <button class="btn-save" @click.prevent="save" title="Save"></button>
                    <button class="btn-txt" @click.prevent="setType('note-txt')" title="Text"></button>
                    <button class="btn-todos" @click.prevent="setType('note-todos')" title="Todos"></button>
                    <button class="btn-img" @click.prevent="setType('note-img')" title="Image"></button>
                    <button class="btn-video" @click.prevent="setType('note-video')" title="Video"></button>
                </div>
            </form>
        </section>
    `,
    data() {
        return {
            placeholder: "Take a note...",
            newNote: {
                type: 'note-txt',
                info: {
                    txt: null
                },

            },

        };
    },
    created() {

    },
    methods: {
        setType(type) {
            switch (type) {
                case 'note-txt':
                    this.placeholder = "Take a note..."
                    break
                case 'note-todos':
                    this.placeholder = "Write your todos comma separated..."
                    break
                case 'note-img':
                    this.placeholder = "Save your image by url..."
                    break
                case 'note-video':
                    this.placeholder = "Save your Youtube video by url..."
                    break
            }
            console.log('type', type)
            this.newNote.type = type
        },

        save() {
            if (!this.newNote.info.txt) return
            noteService.addNewNote(this.newNote)
                .then(() => {
                    eventBus.$emit('savedNote')
                    this.newNote.info.txt = ''
                })
        }
    }
};