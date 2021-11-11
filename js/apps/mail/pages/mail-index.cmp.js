import { mailService } from '../services/mail.service.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
import mailMenu from '../cmps/mail-menu.cmp.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailAdd from '../cmps/mail-add.cmp.js';
import mailDetails from './mail-details.cmp.js';
// import userMsg from './../../../services.';


export default {
  name: 'mail-index',
  template: `
        <section class="mail-index flex" v-if="mails">
        <!-- <user-msg /> -->

          <div class="mail-header flex">         
            <h1>Mail</h1>
            <mail-filter @filtered="setFilter"></mail-filter>
          </div>
          <div class="mail-main flex">
            <mail-menu class="mail-menu-container flex" @mailBoxed="setMailBox" :mails="mails" @compose="setNewMail"></mail-menu > 
            <mail-list v-show="!selectedMail" :mails="mailsToShow" class="mail-list-container"></mail-list>
            <mail-add v-show="isCompose"></mail-add>
            <router-view  v-show="selectedMail"></router-view>
          </div> 

        </section>
    `,

  data() {
    return {
      mails: null,
      filterBy: null,
      selectedMail: null,
      box: 'all',
      isCompose:false
    };
  },
  watch: {
    '$route.params.mailId': {
      handler() {
        const { mailId: mailId } = this.$route.params;
        mailService
          .getMailById(mailId)
          .then((mail) => (this.selectedMail = mail));
      },
      immediate: true,
    },
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
    setMailBox(box) {
      this.box = box;
      console.log(this.box);
    },
    setNewMail(){
      this.isCompose= true
      console.log('ready');
    },
    mailSent(){
      console.log('sent');
    }
  },
  computed: {
    mailsToShow() {
      if (!this.filterBy) {
        var mailsToShow ;

        switch (this.box) {
          case 'all':
            mailsToShow = this.mails;
            break;
          case 'sent':
            mailsToShow = this.mails.filter((mail) => {
              return mail.to;
            });
            break;
          case 'inbox':
            mailsToShow = this.mails.filter((mail) => {
              return mail.from;
            });
            break;
          case 'read':
            mailsToShow = this.mails.filter((mail) => {
              return mail.isRead;
            });
            break;
          case 'unread':
            mailsToShow = this.mails.filter((mail) => {
              return !mail.isRead;
            });
            break;
        }
        mailsToShow.sort(
          (a,b)=>{
            return ((b.sentAt) ?  (b.sentAt) : b.receivedAt) - 
            ((a.sentAt) ?  (a.sentAt) : a.receivedAt)
          })
        return mailsToShow;
      }
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
    mailMenu,
    mailAdd
  },
};
