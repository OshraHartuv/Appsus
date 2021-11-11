import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
import mailMenu from '../cmps/mail-menu.cmp.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailAdd from '../cmps/mail-add.cmp.js';
import mailDetails from './mail-details.cmp.js';
import userMsg from './../../../cmps/user-msg.cmp.js';

export default {
  name: 'mail-index',
  template: `
        <section class="mail-index flex" v-if="mails">
        <user-msg />
          <div class="mail-header flex">         
            <h1>Mail</h1>
            <mail-filter @filtered="setFilter"></mail-filter>
          </div>
          <div class="mail-main flex">
            <mail-menu class="mail-menu-container flex" @mailBoxed="setMailBox" :mails="mails" @compose="setNewMail"></mail-menu > 
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
    };
  },
  created() {
    console.log('index created');
    eventBus.$on('savedMail', this.loadMails);
    eventBus.$on('delete', this.deleteMail);
    eventBus.$on('editDraft', this.onEditDraft);
    this.loadMails();
  },
  watch: {
    '$route.params.mailId': {
      handler() {
        const { mailId: mailId } = this.$route.params;
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
      mailService.query().then((mails) => (this.mails = mails));
    },
    closeDetails() {
      // this.mails = null
      this.selectedMail = null;
      // this.loadMails();
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
    onEditDraft(mail){
      this.mailToEdit = mail
      this.setNewMail()
      console.log(mail);
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
        mailsToShow.sort((a, b) => {
          return (
            // var x;
            // if (b.sentAt) x = b.sentAt
            // else if (b.receivedAt) x = b.receivedAt
            // else if (b.editedAt) x= b.editedAt
            (b.sentAt ? b.sentAt : b.receivedAt) -
            (a.sentAt ? a.sentAt : a.receivedAt)
          );
        });
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
    mailAdd,
    userMsg,
  },
};
