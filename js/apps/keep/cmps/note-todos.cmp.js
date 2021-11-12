import { noteService } from "../services/note.service.js";
import { eventBus } from '../../../services/event-bus-service.js'

export const noteTodos = {
    props: ['note'],
    template: `    
        <div class="note-todos">
            <pre class="todos-editor" 
            :class="note.id" 
            contenteditable="true" 
            @click.stop="edit" 
            @focusout="setTodos(note.id)">{{note.info.title}}</pre>
                <ul class="todos">
                    <li v-for="(todo,idx) in todosToEdit">
                        <template>
                        <i class="fa fa-trash" @click.stop="removeTodo(idx)" title="Delete"></i>
                        <input :class="{done:todo.done}" 
                        v-model:value=todo.txt 
                        @click.stop="edit" 
                        @input=setTodos(note.id)>
                        </template>
                        <input type="checkbox" :checked="todo.done" @click.stop=done($event,idx) title="Mark as done">
                    </li>
                    <li @click.stop="addNewTodo"> <i class="fa fa-plus-square"></i><span>add new todo</span></li>
                </ul>
        </div>
    `,
    data() {
        return {
            selected: false,
            todosToEdit: null
        }
    },
    created() {
        // eventBus.$on('unSelect', this.reportVal);
        this.todosToEdit = JSON.parse(JSON.stringify(this.note.info.todos))
    },
    methods: {
        removeTodo(idx) {
            this.todosToEdit.splice(idx, 1)
        },
        addNewTodo() {
            this.todosToEdit.push({ txt: 'Click to edit', done: false })
        },
        select() {
            this.selected = true
        },
        setTodos(noteId) {
            if (noteId !== this.note.id) return
            const title = document.querySelector(`.todos-editor.${noteId}`).innerText

            eventBus.$emit('setTodos', noteId, title, this.todosToEdit)
        },
        done(ev, idx) {
            // let currTodo = this.todosToEdit[idx]
            if (ev.target.checked) this.todosToEdit[idx].done = true
            else this.todosToEdit[idx].done = false
        },
        edit(ev) {
            if (ev.target.value === 'Click to edit') ev.target.value = ''
            if (ev.target.innerText === 'Click to edit') ev.target.innerText = ''
        },
    }
};