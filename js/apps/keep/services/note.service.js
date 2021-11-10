import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notes';
_createNotes()

export const noteService = {
    query,
    save,
    getNoteById,
    getNextNoteId,
    getPreviousNoteId,
};

function query() {
    return storageService.query(NOTES_KEY);
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                }
            },
            {
                id: "n102",
                type: "note-img",
                info: {
                    url: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n103",
                type: "note-todos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                }
            }, {
                id: "n104",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                }
            },
            {
                id: "n105",
                type: "note-img",
                info: {
                    url: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n106",
                type: "note-todos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                }
            },
        ];
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}

function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note);
    else return storageService.post(NOTES_KEY, note);
}

function getNextNoteId(noteId) {
    return query()
        .then(notes => {
            const idx = notes.findIndex(note => note.id === noteId);
            return (idx === notes.length - 1) ? notes[0].id : notes[idx + 1].id;
        });
}

function getPreviousNoteId(noteId) {
    return query()
        .then(notes => {
            const idx = notes.findIndex(note => note.id === noteId);
            return (idx === 0) ? notes[notes.length - 1].id : notes[idx - 1].id;
        });
}

function getNoteById(noteId) {
    return storageService.get(NOTES_KEY, noteId);
}