

export const noteTxt = {
    props: ['data'],
    template: `
        <section class="note-txt">          
                {{data.info.txt}}          
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