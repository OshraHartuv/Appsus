import longText from '../../../cmps/long-text.cmp.js';
import { noteService } from '../services/note.service.js'
// import reviewAdd from '../pages/review-add.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    // props: ['note'],
    name: 'note-details',
    template: `
        <section v-if="note" class="note-details">
            <h3>i'm note-details</h3>
        </section>
            <!-- <router-link :to="'/note/'+ this.note.id +'/review-add'">Add review</router-link> -->
            <!-- <router-link to="/note" class="close-details">X</router-link> -->
    `,
    data() {
        return {
            note: null,
            nextNoteId: null,
            previewNoteId: null

        };
    },
    created() {
        const { noteId } = this.$route.params;
        noteService.getNoteById(noteId)
            .then(note => this.note = note);
    },
    watch: {
        '$route.params.noteId': {
            handler() {
                const { noteId } = this.$route.params;
                noteService.getNoteById(noteId)
                    .then(note => this.note = note);
                noteService.getNextNoteId(noteId)
                    .then(noteId => this.nextNoteId = noteId);
                noteService.getPreviousNoteId(noteId)
                    .then(noteId => this.previousNoteId = noteId);

            },
            immediate: true
        }
    },
    methods: {
        remove(idx) {
            this.note.reviews.splice(idx, 1);
            noteService
                .save(this.note)
                .then(() => {
                    const msg = {
                        txt: 'Review deleted successfully',
                        type: 'success',
                    };
                    eventBus.$emit('showMsg', msg);
                })
                .catch((err) => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error',
                    };
                    eventBus.$emit('showMsg', msg);
                });
        },
    },

    computed: {
        titleToShow() {
            return this.note.title[0].toUpperCase() + this.note.title.substring(1)
        },

    },

    components: {
        longText,
        // reviewAdd,
    }

}