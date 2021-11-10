import { mailService } from '../services/mail.service.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
import mailList from '../cmps/mail.list.cmp.js';
import mailDetails from './mail-details.cmp.js';

export default {
  name: 'mail-index',
  template: `
        <section class="mail-index app-main">            
            <h1>Welcome To Your Mail</h1>
            <mail-filter @filtered="setFilter"></mail-filter> 
            <mail-details :mail="selectedMail" v-if="selectedMail" @close="closeDetails"></mail-details>
            <mail-list v-else :mails="mailsToShow"></mail-list> 
        </section>
    `,

  data() {
    return {
      mails: null,
      filterBy: null,
      selectedMail: null,
    };
  },
  created() {
    this.loadMails();
  },
  methods: {
    loadMails() {
      mailService.query().then((mails) => (this.mails = mails));
    },
    closeDetails() {
      this.selectedMail = null;
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  computed: {
    mailsToShow() {
      if (!this.filterBy) return this.mails;
      // const searchStr = this.filterBy.title.toLowerCase();
      // const fromPrice = this.filterBy.fromPrice || 0;
      // const toPrice = this.filterBy.toPrice || Infinity;
      // const booksToShow = this.books.filter(book => {
      //     return book.title.toLowerCase().includes(searchStr) &&
      //     book.listPrice.amount >= fromPrice &&
      //     book.listPrice.amount <= toPrice
      // });
      // return booksToShow;
    },
  },

  components: {
    mailFilter,
    mailDetails,
    mailList,
  },
};
