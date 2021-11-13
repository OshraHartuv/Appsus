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
    setBgc,
    setTxt,
    setTodos,
    setAnimatedNote,
    setPinnedNote,
    duplicateNote,
    noteFromMail
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
                    title: "Fullstack Me Baby!"
                },
                style: {
                    bgc: "#ffffff"
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
                    bgc: "#ffffff"
                }
            },
            {
                id: "n103",
                type: "note-todos",
                isPinned: false,
                info: {
                    title: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", done: false },
                        { txt: "Coding power", done: true }
                    ]
                },
                style: {
                    bgc: "#ffffff"
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
                    bgc: "#ffffff"
                }
            },
            {
                id: "n105",
                type: "note-txt",
                isPinned: false,
                info: {
                    title: "JavaScript Frameworks > App that use them 😂"
                },
                style: {
                    bgc: "#ffffff"
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
                    bgc: "#ffffff"
                }
            },
            {
                id: "n107",
                type: "note-todos",
                info: {
                    title: "Learn some code",
                    todos: [
                        { txt: "HTML", done: false },
                        { txt: "CSS", done: true },
                        { txt: "JavaScript", done: false }
                    ]
                },
                style: {
                    bgc: "#ffffff"
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
                    bgc: "#ffffff"
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
                    title: note.info.title,
                },
                style: {
                    bgc: '#ffffff'
                }
            }
            break
        case 'note-todos':
            let data = note.info.title.split(',')
            let newTodos = []
            data.forEach(todo => {
                newTodos.push({ txt: todo, done: false })
            });
            newNote = {
                id: null,
                type: "note-todos",
                isPinned: false,
                info: {
                    title: 'Click to edit',
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
    return getNoteById(noteId)
        .then(note => {
            note.style.bgc = color
            return note
        })
        .then(note => storageService.put(NOTES_KEY, note)
        )
}
function setTxt(noteId, txt) {
    return getNoteById(noteId)
        .then(note => {
            note.info.title = txt
            return note
        })
        .then(note => storageService.put(NOTES_KEY, note)
        )
}
function setTodos(noteId, title, todos) {
    return getNoteById(noteId)
        .then(note => {
            note.info.title = title
            note.info.todos = todos
            return note
        })
        .then(note => storageService.put(NOTES_KEY, note)
        )
}

function setAnimatedNote(noteId, title, url) {
    return getNoteById(noteId)
        .then(note => {
            note.info.title = title
            note.info.url = url
            return note
        })
        .then(note => storageService.put(NOTES_KEY, note))
}

function setPinnedNote(noteId) {
    return getNoteById(noteId)
        .then(note => {
            note.isPinned = !note.isPinned
            return note
        })
        .then(note => storageService.put(NOTES_KEY, note)
        )
}

function duplicateNote(noteId) {
    return getNoteById(noteId)
        .then(note => {
            let duplicatedNote = JSON.parse(JSON.stringify(note))
            duplicatedNote.id = null
            return note
        })
        .then(note => storageService.post(NOTES_KEY, note))
}

function noteFromMail(mail) {
    let content = `Subject: ${mail.subject}
    
    ${mail.body}

    ${mail.from}
    `
    let newNote = {
        id: null,
        type: "note-txt",
        selected: true,
        isPinned: false,
        info: {
            title: content
        },
        style: {
            bgc: '#ffffff'
        }
    }
    return storageService.post(NOTES_KEY, newNote)
}