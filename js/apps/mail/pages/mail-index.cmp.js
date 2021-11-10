import { mailService } from '../services/mail.service.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
// import bookList from '../cmps/book-list.cmp.js';
// import bookDetails from './book-details.cmp.js';

export default {
  template: `
        <section class="mail-index app-main">            
            <h1>Welcome To Your Mail</h1>
            <mail-filter @filtered="setFilter"></mail-filter> 
            <!-- <book-details :book="selectedBook" v-if="selectedBook" @close="closeDetails"></book-details>
            <book-list v-else :books="booksToShow"></book-list>  -->
        </section>
    `,

  components: {
    mailFilter,
  },
};
