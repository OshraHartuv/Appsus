import { noteService } from '../services/note.service.js';
import { eventBus } from '../../../services/event-bus-service.js'
import noteList from '../cmps/note-list.cmp.js';
import noteAdd from '../cmps/note-add.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteDetails from './note-details.cmp.js';

export default {
    name: 'note-index',
    template: `
        <section class="keep-app">
            <note-add/>
            <note-filter @filtered="setFilter" />
            <note-details v-if="selectedNote" :note="selectedNote" @close="closeDetails" />
            <note-list v-else :notes="notesToShow"  @selected="selectNote" />
        </section>
    `,
    data() {
        return {
            notes: null,
            selectedNote: null,
            filterBy: null
        };
    },
    created() {
        this.loadNotes();
        eventBus.$on('savedNote', this.loadNotes);
        eventBus.$on('removedNote', this.removeNote);
        eventBus.$on('setBgc', this.setBgc);
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes);
        },
        // removeNote(id) {
        //     noteService.remove(id);
        // },
        selectNote(note) {
            this.selectedNote = note;
        },
        closeDetails() {
            this.selectedNote = null;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        removeNote(id) {
            noteService.remove(id)
                .then(() => {
                    const msg = {
                        txt: 'Deleted successfully',
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                    this.notes = this.notes.filter(note => note.id !== id)
                })
                .catch(err => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                });
        },
        setBgc(id, color) {
            noteService.setBgc(id, color)
                .then(this.loadNotes)
        }
    },
    computed: {
        notesToShow() {
            // if (!this.filterBy) return this.notes;
            // const searchStr = this.filterBy.title.toLowerCase();

            // const notesToShow = this.notes.filter(note => {
            //     return note.title.toLowerCase().includes(searchStr) &&
            //         note.listPrice.amount >= lowPrice &&
            //         note.listPrice.amount <= highPice
            // });
            return this.notes
            return notesToShow;
        }
    },
    components: {
        noteList,
        noteFilter,
        noteDetails,
        noteAdd,
    }
};