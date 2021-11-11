import { noteTxt } from './note-txt.cmp.js';
import { noteTodos } from './note-todos.cmp.js';
import { noteVideo } from './note-video.cmp.js';
import { noteImg } from './note-img.cmp.js';

export default {
    props: ['note'],
    template: `<component :is="note.type" :data="note"></component>`,
    methods: {
        // setInput(ev, inputIdx) {
        //     this.answers[inputIdx] = ev;
        //     console.log('Survey Got ev', ev);
        // },
        // save() {
        //     console.log('Survey Answers', this.answers);
        // }
    },
    computed: {},
    components: {
        noteTxt,
        noteTodos,
        noteVideo,
        noteImg
    }
}