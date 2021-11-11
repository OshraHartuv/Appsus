
export const noteImg = {
    props: ['note'],
    template: `
        <section class="note-img">

                {{note.info.title}}
                <img :src="note.info.url">
                <div></div>

        </section>
    `,
    data() {
        return {
            // txt: '',
        };
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.txt);
        }
    }
};


// id: "n102",
//     type: "note-img",
//         info: {
//     url: "http://some-img/me",
//         title: "Bobi and Me"
// },
// style: {
//     backgroundColor: "#00d"
// }

// export const noteTxt = {
//     props: ['data'],
//     template: `
//         <div class="note-txt">
//             <label>
//                 {{data.info.txt}}
//             </label>
//         </div>
//     `,
//     data() {
//         return {
//         };
//     },
//     methods: {
//         reportVal() {
//             this.$emit('setInput', this.txt);
//         }
//     }
// };