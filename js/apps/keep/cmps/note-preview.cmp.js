import { noteTxt } from './note-txt.cmp.js';
import { noteTodos } from './note-todos.cmp.js';
import { noteVideo } from './note-video.cmp.js';
import { noteImg } from './note-img.cmp.js';

// @setInput="setInput($event, idx)"
export default {
    props: ['note'],
    template: `
        <section class="note-preview">
            <!-- <h3>i'm note-details</h3> -->
            <!-- <h2>{{note}}</h2> -->
            <!-- <section class="survey app-main"> -->
           <!-- <h1>Survey</h1> -->
        <!-- <note-txt :data="note"></note-txt> -->
        <!-- <form @submit.prevent="save"> -->
            <component
                        :is="note.type"   
                        :data="note"                       
                        >
            </component>
            <!-- <button type="submit">Save</button> -->
        <!-- </form> -->

    </section> 
          <!-- <p><span class="underline">{{ titleToShow }}</span></p>
          <p v-if="note.listPrice.isOnSale" class="sale">SALE!</p>
          <router-link :to="'/note/'+note.id" >
          <img :src="note.thumbnail" alt="note-img">
          </router-link>
          <p><span class="underline">Price:</span> {{ priceToShow }}</p> -->

    `,
    methods: {
        setInput(ev, inputIdx) {
            this.answers[inputIdx] = ev;
            console.log('Survey Got ev', ev);
        },
        save() {
            console.log('Survey Answers', this.answers);
        }
    },
    computed: {

        // titleToShow() {
        //     return this.note.title[0].toUpperCase() + this.note.title.substring(1)
        // },
    },
    components: {
        noteTxt,
        noteTodos,
        noteVideo,
        noteImg
    }
}

// :data="currCmp.data" 


// export default {
//     template: `
//     <section class="survey app-main">
//         <h1>Survey</h1>


//         <form @submit.prevent="save">
//             <component v-for="(currCmp, idx) in cmps" 
//                         :is="currCmp.type" 
//                         :data="currCmp.data" 
//                         @setInput="setInput($event, idx)">
//             </component>
//             <button type="submit">Save</button>
//         </form>

//     </section> 
//     `,
//     data() {
//         return {
//             cmps: [
//                 {
//                     type: 'textBox',
//                     data: {
//                         label: 'Car Name:'
//                     }
//                 },
//                 {
//                     type: 'textBox',
//                     data: {
//                         label: 'Car model:'
//                     }
//                 },
//                 {
//                     type: 'selectBox',
//                     data: {
//                         label: 'Year',
//                         opts: [2015, 2016, 2017, 2018]
//                     }
//                 },
//                 {
//                     type: 'rangeBox',
//                     data: {
//                         label: 'Range',
//                         min: 10, max: 30
//                     }
//                 },
//                 {
//                     type: 'dateBox',
//                     data: {
//                         label: 'Date',
//                     }
//                 }

//             ],
//             answers: []
//         };
//     },
//     methods: {
//         setInput(ev, inputIdx) {
//             this.answers[inputIdx] = ev;
//             console.log('Survey Got ev', ev);
//         },
//         save() {
//             console.log('Survey Answers', this.answers);
//         }
//     },
//     created() {

//     },
//     computed: {

//     },
//     watch: {

//     },
//     components: {
//         textBox,
//         selectBox,
//         rangeBox,
//         dateBox
//     }
// };