export const noteTodos = {
    props: ['note'],
    template: `
        <div class="row" contenteditable="true">
                {{note.info.title}}
                <div contenteditable="true" autofocus>
                <ul>
                    <li v-for="todo in note.info.todos">{{todo.txt}}</li>
                </ul>
                </div>

        </div>
    `,
    data() {
        return {
            selectedOpt: '',
        };
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.selectedOpt);
        }
    }
};