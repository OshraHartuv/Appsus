import { noteService } from '../services/note.service.js';
import { eventBus } from '../../../services/event-bus-service.js'
import noteList from '../cmps/note-list.cmp.js';
import noteAdd from '../cmps/note-add.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
// import noteDetails from './note-details.cmp.js';

export default {
    name: 'note-app',
    template: `
        <section class="keep-app">
            <note-add/>
            <note-filter @filtered="setFilter" />
            <!-- <note-details v-if="selectedNote" :note="selectedNote" @close="closeDetails" /> -->
            <hr />
                <span class="pin-header">📌Pinned Notes:</span>
                  
                <note-list :notes="pinnedNotesToShow"  @selected="selectNote" />
                <hr />
            <note-list :notes="notesToShow"  @selected="selectNote" />
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
        eventBus.$on('setTxt', this.setTxt);
        eventBus.$on('setTodos', this.setTodos);
        eventBus.$on('setAnimatedNote', this.setAnimatedNote);
        eventBus.$on('pinnedNote', this.setPinnedNote);
        eventBus.$on('duplicateNote', this.duplicateNote);
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes);
        },
        selectNote(note) {
            this.selectedNote = note;
        },
        // closeDetails() {
        //     this.selectedNote = null;
        // },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        removeNote(id) {
            if (!id) return
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
        },
        setTxt(id, txt) {
            noteService.setTxt(id, txt)
                .then(this.loadNotes)
        },
        setTodos(id, title, todos) {
            noteService.setTodos(id, title, todos)
                .then(this.loadNotes)
        },
        setAnimatedNote(id, title, url) {
            noteService.setAnimatedNote(id, title, url)
                .then(this.loadNotes)
        },
        setPinnedNote(id) {
            noteService.setPinnedNote(id)
                .then(this.loadNotes)
        },
        duplicateNote(id) {
            noteService.duplicateNote(id)
                .then(this.loadNotes)
        }
    },
    watch: {
        '$route.params.mail': {
            handler() {
                const { mail } = this.$route.params;
                if (!mail) return
                noteService.noteFromMail(JSON.parse(mail))
                    .then(this.loadNotes)
            },
            immediate: true
        },
    },
    computed: {
        notesToShow() {
            if (!this.notes) return
            if (!this.filterBy) return this.notes.filter(note => !note.isPinned)
            const searchStr = this.filterBy.title.toLowerCase();
            let notesToShow = this.notes.filter(note => {
                return !note.isPinned && (note.type === this.filterBy.type || this.filterBy.type === 'all') &&
                    (note.info.title.toLowerCase().includes(searchStr) ||
                        JSON.stringify(note).toLowerCase().includes(searchStr))
            });
            if (this.filterBy.type === 'all' && !this.filterBy.title) return this.notes;
            return notesToShow;
        },
        pinnedNotesToShow() {
            if (!this.notes) return
            let pinnedNotesToShow = this.notes.filter(note => note.isPinned)
            return pinnedNotesToShow
        }
    },
    components: {
        noteList,
        noteFilter,
        noteAdd,
    }
};