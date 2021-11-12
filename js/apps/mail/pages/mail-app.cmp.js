import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
import mailMenu from '../cmps/mail-menu.cmp.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailAdd from '../cmps/mail-add.cmp.js';
import mailDetails from './mail-details.cmp.js';
import userMsg from '../../../cmps/user-msg.cmp.js';
// import VueToggleBtn from 'vue-toggle-btn';
// Vue.use(ToggleButton)
// Vue.component('vue-toggle-btn', VueToggleBtn);

export default {
  name: 'mail-app',
  template: `
        <section class="mail-app flex" v-if="mails">
        <user-msg />
          <div class="mail-header flex">         
              <h1>Mail</h1>
              <mail-filter @filtered="setFilter"></mail-filter>
          </div>
          <div class="mail-main flex">
            <mail-menu class="mail-menu-container flex" @mailBoxed="setMailBox" :mails="mails" @compose="setNewMail" @sort="setSort"></mail-menu > 
            <mail-list v-if="!selectedMail" :mails="mailsToShow" class="mail-list-container"></mail-list>
            <router-view  v-else></router-view>
            <mail-add v-if="isCompose" @close="closeCompose" :mailToEdit="mailToEdit"></mail-add>
          </div> 

        </section>
    `,

  data() {
    return {
      mails: null,
      filterBy: null,
      mailToEdit: null,
      selectedMail: null,
      box: 'all',
      isCompose: false,
      sortBy: 'date',
      checked: false,
    };
  },
  created() {
    console.log('index created');
    eventBus.$on('savedMail', this.loadMails);
    eventBus.$on('delete', this.deleteMail);
    eventBus.$on('editDraft', this.onEditDraft);
    eventBus.$on('sort', this.setSort);
    this.loadMails();
  },
  watch: {
    '$route.params.mailId': {
      handler() {
        const { mailId: mailId } = this.$route.params;
        console.log(this.$route.params);
        mailService.getMailById(mailId).then((mail) => {
          this.selectedMail = mail;
          // eventBus.$on('savedMail', this.loadMails);
        });
      },
      immediate: true,
    },
  },
  methods: {
    loadMails() {
      mailService.query().then((mails) => {
        this.sortMails(mails);
        this.mails = mails;
      });
    },
    closeDetails() {
      this.selectedMail = null;
    },
    setFilter(filterBy) {
      console.log(this.filterBy);
      this.filterBy = filterBy;
    },
    setMailBox(box) {
      this.box = box;
      console.log(this.box);
    },
    setNewMail() {
      this.isCompose = true;
      console.log('ready');
    },
    closeCompose() {
      this.isCompose = false;
      this.mailToEdit = null;
      this.loadMails();
    },
    deleteMail(id) {
      console.log(id);
      mailService
        .removeMail(id)
        .then(() => {
          const msg = {
            txt: 'Deleted successfully',
            type: 'success',
          };
          eventBus.$emit('showMsg', msg);
          this.mails = this.mails.filter((mail) => mail.id !== id);
        })
        .catch((err) => {
          console.log('err', err);
          const msg = {
            txt: 'Error. Please try later',
            type: 'error',
          };
          eventBus.$emit('showMsg', msg);
        });
    },
    onEditDraft(mail) {
      this.mailToEdit = mail;
      this.setNewMail();
      console.log(mail);
    },
    sortMails(mails) {
      console.log(mails);
      if (this.sortBy === 'date') {
        mails.sort((a, b) => {
          return (
            (b.sentAt ? b.sentAt : b.receivedAt) -
            (a.sentAt ? a.sentAt : a.receivedAt)
          );
        });
      } else {
        mails.sort((a, b) => {
          if (a.subject < b.subject) return -1;
          if (a.subject > b.subject) return 1;
          return 0;
        });
      }
    },
    setSort(val){
      this.sortBy = val
      this.loadMails()
    }
  },
  computed: {
    mailsToShow() {
      if (!this.filterBy) {
        var mailsToShow;

        switch (this.box) {
          case 'all':
            mailsToShow = this.mails;
            break;
          case 'sent':
            mailsToShow = this.mails.filter((mail) => {
              return mail.to && !mail.isDraft;
            });
            break;
          case 'inbox':
            mailsToShow = this.mails.filter((mail) => {
              return mail.from;
            });
            break;
          case 'read':
            mailsToShow = this.mails.filter((mail) => {
              return mail.isRead && !mail.isDraft;
            });
            break;
          case 'unread':
            mailsToShow = this.mails.filter((mail) => {
              return !mail.isRead;
            });
            break;
          case 'drafts':
            mailsToShow = this.mails.filter((mail) => {
              return mail.isDraft;
            });
            break;
        }
        // console.log(mailsToShow);
        this.sortMails(mailsToShow);
        console.log(mailsToShow);
        return mailsToShow;
      }
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
    mailAdd,
    userMsg,
    // ToggleBtn
  },
};
