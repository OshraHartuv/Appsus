

export const noteTxt = {
    props: ['note'],
    template: `
        <section class="note-txt">          
                {{note.info.txt}}          
        </section>
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