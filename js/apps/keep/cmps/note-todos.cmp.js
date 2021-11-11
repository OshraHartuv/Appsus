export const noteTodos = {
    props: ['note'],
    template: `
        <div class="row">
                {{note.info.title}}
                <ul>
                    <li v-for="todo in note.info.todos">{{todo.txt}}</li>
                </ul>
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