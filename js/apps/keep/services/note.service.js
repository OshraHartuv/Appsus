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
    addNewNote,
    remove,
    setBgc
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
                isPinned: false,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    bgc: "#8bc9ff"
                }
            },
            {
                id: "n102",
                type: "note-img",
                isPinned: false,
                info: {
                    title: "Bobi and Me",
                    url: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
                },
                style: {
                    bgc: "#c5ff8b"
                }
            },
            {
                id: "n103",
                type: "note-todos",
                isPinned: false,
                info: {
                    title: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    bgc: "#faf38c"
                }
            },
            {
                id: "n104",
                type: "note-video",
                isPinned: false,
                info: {
                    title: "Avengers:End Game trailer",
                    url: "https://www.youtube.com/embed/TcMBFSGVi1c",
                },
                style: {
                    bgc: "#8cfa9c"
                }
            },
            {
                id: "n105",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "JavaScript Frameworks > App that use them 😂"
                },
                style: {
                    bgc: "#3f7bf3"
                }
            },
            {
                id: "n106",
                type: "note-img",
                info: {
                    url: "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_3x2.jpg",
                    title: "My new prince!"
                },
                style: {
                    bgc: "#c983ff"
                }
            },
            {
                id: "n107",
                type: "note-todos",
                info: {
                    title: "Learn some code",
                    todos: [
                        { txt: "HTML", done: false },
                        { txt: "CSS", done: false },
                        { txt: "JavaScript", done: false }
                    ]
                },
                style: {
                    bgc: "#8cfa9c"
                }
            },
            {
                id: "n108",
                type: "note-video",
                isPinned: false,
                info: {
                    title: "Build House Under The Wood roots",
                    url: "https://www.youtube.com/watch?v=qwxoxMX5veU",
                },
                style: {
                    bgc: "#faf38c"
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

function addNewNote(note) {
    let newNote
    switch (note.type) {
        case 'note-txt':
            newNote = {
                id: null,
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: note.info.txt,
                },
                style: {
                    bgc: '#ffffff'
                }
            }
            break
        case 'note-todos':
            let data = note.info.txt.split(',')
            let newTodos = []
            data.forEach(todo => {
                newTodos.push({ txt: todo, done: false })
            });
            newNote = {
                id: null,
                type: "note-todos",
                isPinned: false,
                info: {
                    title: '',
                    todos: newTodos
                },
                style: {
                    bgc: '#ffffff'
                }
            }
            break
        case 'note-img':
            newNote = {
                id: null,
                type: "note-img",
                isPinned: false,
                info: {
                    url: note.info.txt,
                    title: ""
                },
                style: {
                    bgc: '#ffffff'
                }
            }
            break
        case 'note-video':
            newNote = {
                id: null,
                type: "note-video",
                isPinned: false,
                info: {
                    url: note.info.txt,
                    title: ""
                },
                style: {
                    bgc: '#ffffff'
                }
            }
            break
    }
    return save(newNote)
}

function remove(noteId) {
    // return Promise.reject('Big balagan!')
    return storageService.remove(NOTES_KEY, noteId);
}

function setBgc(noteId, color) {
    console.log('noteId, color', noteId, color)
    return getNoteById(noteId)
        .then(note => {
            console.log('note in service', note)
            note.style.bgc = this.color
            return note
        })
        .then(note => storageService.put(NOTES_KEY, note)
        )

}
