import { mailService } from '../services/mail.service.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
import mailMenu from '../cmps/mail-menu.cmp.js';
import mailList from '../cmps/mail.list.cmp.js';
import mailDetails from './mail-details.cmp.js';

export default {
  name: 'mail-index',
  template: `
        <section class="mail-index flex" v-if="mails">
          <div class="mail-header flex">         
            <h1>Mail</h1>
            <mail-filter @filtered="setFilter"></mail-filter>
          </div>
          <div class="mail-main flex">
            <mail-menu class="mail-menu-container flex" @mailBoxed="setMailBox" :mails="mails"></mail-menu > 
            <mail-list v-if="!selectedMail" :mails="mailsToShow" class="mail-list-container"></mail-list>
            <router-view v-else></router-view>
          </div> 

        </section>
    `,

  data() {
    return {
      mails: null,
      filterBy: null,
      selectedMail: null,
      box: 'all',
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
  },
  computed: {
    mailsToShow() {
      if (!this.filterBy) {
        // this.getMailsByBox()
        // console.log(this.box);
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
    // // 
    // getMailsByBox(){
    //   console.log(this.box);
    //     var mailsToShow;
    //     switch (this.box) {
    //       case 'all':
    //         mailsToShow = this.mails;
    //         break;
    //       case 'sent':
    //         mailsToShow = this.mails.filter((mail) => {
    //           return mail.to;
    //         });
    //         break;
    //       case 'inbox':
    //         mailsToShow = this.mails.filter((mail) => {
    //           return mail.from;
    //         });
    //         break;
    //       case 'read':
    //         mailsToShow = this.mails.filter((mail) => {
    //           return mail.isRead;
    //         });
    //         break;
    //       case 'unread':
    //         mailsToShow = this.mails.filter((mail) => {
    //           return !mail.isRead;
    //         });
    //         break;
    //     }
    //     console.log(mailsToShow);
    //     return mailsToShow
    // }
  },

  components: {
    mailFilter,
    mailDetails,
    mailList,
    mailMenu,
  },
};
