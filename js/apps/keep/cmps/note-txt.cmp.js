

export const noteTxt = {
    props: ['data'],
    template: `
        <div class="note-txt">
            <label>
                {{data.info.txt}}
            </label>
        </div>
    `,
    data() {
        return {
        };
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.txt);
        }
    }
};