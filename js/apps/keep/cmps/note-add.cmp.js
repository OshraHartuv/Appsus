// import { carService } from '../services/car-service.js';

import { noteService } from "../services/note.service.js";
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
        <section>
            <form @submit.prevent.stop="save" class="note-add" >
                <input class="add-start" type="text" :placeholder="placeholder" v-model:value="newNote.info.title" @change="save" autofocus>
                <div class="actions">
                    <a class="btn-save fa fa-save" :class="{saved:active}" @click.prevent="save" title="Save"></a>
                    <a class="btn-txt fa fa-font" :class="{active:newNote.type === 'note-txt'}" @click.prevent="setType('note-txt')" title="Text"></a>
                    <a class="btn-todos fa fa-list" :class="{active:newNote.type === 'note-todos'}" @click.prevent="setType('note-todos')" title="Todos"></a>
                    <a class="btn-img fa fa-image":class="{active:newNote.type === 'note-img'}" @click.prevent="setType('note-img')" title="Image"></a>
                    <a class="btn-video fa fa-youtube" :class="{active:newNote.type === 'note-video'}" @click.prevent="setType('note-video')" title="Video"></a>
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
                    title: null
                },

            },
            active: null

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
            this.newNote.type = type
        },

        save() {
            if (!this.newNote.info.title) return
            noteService.addNewNote(this.newNote)
                .then(() => {
                    eventBus.$emit('savedNote')
                    this.newNote.info.title = ''
                    this.active = true
                    setTimeout(() => {
                        this.active = false
                    }, 1500);
                })
        }
    }
};