export const noteTodos = {
    props: ['data'],
    template: `
        <div class="row">

                {{data.info.title}}
                <ul>
                    <li v-for="todo in data.info.todos">{{todo.txt}}</li>
                </ul>
                <!-- <select v-model="selectedOpt" @blur="reportVal">
                    <option v-for="opt in data.opts">{{opt}}</option>
                </select> -->

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
