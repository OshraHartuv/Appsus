export const noteVideo = {
    props: ['data'],
    template: `
        <div class="note-txt">
            <label>
                {{data.label}}
                <input type="text" v-model="txt" @blur="reportVal" />
            </label>
        </div>
    `,
    data() {
        return {
            txt: '',
        };
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.txt);
        }
    }
};