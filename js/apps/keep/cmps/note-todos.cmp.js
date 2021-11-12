import { noteService } from "../services/note.service.js";
import { eventBus } from '../../../services/event-bus-service.js'

export const noteTodos = {
    props: ['note'],
    template: `    
        <div class="note-todos" @click = "select">
            <pre class="todos-editor" :class="note.id" contenteditable="true">{{note.info.title}}</pre>
                <ul class="todos">
                    <li v-for="(todo,idx) in todosToEdit">
                        <section>
                        <i class="fa fa-trash" @click="removeTodo(idx)" title="Delete"></i>
                        <input :class="{done:todo.done}" :value=todo.txt>
                        </section>
                        <input type="checkbox" :checked="todo.done" @click=done($event,idx)>
                    </li>
                    <li @click="addNewTodo"> <i class="fa fa-plus-square"></i><span>add new todo</span></li>
                </ul>
        </div>
    `,
    data() {
        return {
            selected: false,
            // noteToEdit: null,
            todosToEdit: null
        }
    },
    created() {
        eventBus.$on('unSelect', this.reportVal);
        // this.noteToEdit = JSON.parse(JSON.stringify(this.note))
        this.todosToEdit = JSON.parse(JSON.stringify(this.note.info.todos))
        // this.setTodos()
    },
    methods: {
        // setTodos() {
        //     if (this.note.selected)
        //         this.todosToEdit = JSON.parse(JSON.stringify(this.note.info.todos))
        // },
        removeTodo(idx) {
            this.todosToEdit.splice(idx, 1)
        },
        addNewTodo() {
            this.todosToEdit.push({ txt: 'Click to edit', done: false })
        },
        select() {
            this.selected = true
        },
        reportVal(noteId) {
            if (noteId !== this.note.id) return
            const title = document.querySelector(`.todos-editor.${noteId}`).innerText

            noteService.setTodos(noteId, title, this.todosToEdit)
                .then(() => this.selected = false)
        },
        done(ev, idx) {
            let currTodo = this.todosToEdit[idx]
            if (ev.target.checked) currTodo.done = true
            else currTodo.done = false
        }
    }
};









// export const noteTxt = {
//     props: ['note'],
//     template: `
//         <section class="note-txt" @click = "selected = true">
//             <pre class="txt-editor" :class="note.id" id="note-txt" contenteditable="true" @input="lala">{{note.info.txt}}</pre>
//         </section>
//     `,
//     data() {
//         return {
//             selected: false,
//         };
//     },
//     created() {
//         eventBus.$on('unSelect', this.unSelectNote);
//     },
//     methods: {
//         unSelectNote(noteId) {
//             const txt = document.querySelector(`.txt-editor.${noteId}`).innerText
//             console.log(noteId, txt);
//             noteService.setTxt(noteId, txt)
//                 .then(() => this.selected = false)
//         },
//         don
//     }
// };