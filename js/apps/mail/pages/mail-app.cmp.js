import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
import mailMenu from '../cmps/mail-menu.cmp.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailAdd from '../cmps/mail-add.cmp.js';
import mailDetails from './mail-details.cmp.js';
import userMsg from '../../../cmps/user-msg.cmp.js';

export default {
  name: 'mail-app',
  template: `
        <section class="mail-app flex" v-if="mails">
        <user-msg />
          <div class="mail-header flex">         
              <h1>Mail</h1>
              <mail-filter @filtered="setFilter" :box="filterBy.box"></mail-filter>
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
      filterBy: {
        str: '',
        box: 'all',
      },
      mailToEdit: null,
      selectedMail: null,
      isCompose: false,
      sortBy: 'date',
      checked: false,
    };
  },
  created() {
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
        // console.log(mails);
      });
    },
    closeDetails() {
      this.selectedMail = null;
    },
    setFilter(filterBy) {
      this.filterBy.str = filterBy;
    },
    setMailBox(box) {
      this.filterBy.str = '';
      this.filterBy.box = box;
    },
    setNewMail() {
      this.isCompose = true;
    },
    closeCompose() {
      this.isCompose = false;
      this.mailToEdit = null;
      this.loadMails();
    },
    deleteMail(id) {
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
    },
    setSort(val) {
      this.sortBy = val;
      this.loadMails();
    },
    sortMails(mails) {
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
  },
  computed: {
    mailsToShow() {
      var mailsToShow;
      switch (this.filterBy.box) {
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
      if (this.filterBy.str) {
        const searchStr = this.filterBy.str.toLowerCase();
        var filteredMails = [];
        mailsToShow.filter((mail) => {
          if (mail.to && mail.to.toLowerCase().includes(searchStr)) {
            filteredMails.push(mail);
            return;
          } else if (mail.from && mail.from.toLowerCase().includes(searchStr)) {
            filteredMails.push(mail);
            return;
          } else if (
            mail.subject &&
            mail.subject.toLowerCase().includes(searchStr)
          ) {
            filteredMails.push(mail);
            return;
          } else if (mail.body && mail.body.toLowerCase().includes(searchStr)) {
            filteredMails.push(mail);
            return;
          }
        });
        mailsToShow = filteredMails;
      }
      this.sortMails(mailsToShow);
      return mailsToShow;
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

// var mailsToStr = mailsToShow.filter((mail) => {
//   if (mail.to) return mail.to.toLowerCase().includes(searchStr);
// });
// var mailsFromStr = mailsToShow.filter((mail) => {
//   if (mail.from) return mail.from.toLowerCase().includes(searchStr);
// });
// var mailsSubStr = mailsToShow.filter((mail) => {
//   if (mail.subject)
//     return mail.subject.toLowerCase().includes(searchStr);
// });
// var mailsBodyStr = mailsToShow.filter((mail) => {
//   if (mail.body) return mail.body.toLowerCase().includes(searchStr);
// });

// console.log('mailsToStr', mailsToStr);
// console.log('mailsFromStr', mailsFromStr);
// console.log('mailsSubStr', mailsSubStr);
// console.log('mailsBodyStr', mailsBodyStr);
// return mail.to.toLowerCase().includes(searchStr)

// mailsToShow = mailsToShow.filter((mail) =>
//         {return mail.to
//         ? mail.to.toLowerCase().includes(searchStr)
//         : true ||
//         mail.from
//         ? mail.from.toLowerCase().includes(searchStr)
//         : true ||
//         mail.subject
//         ? mail.subject.toLowerCase().includes(searchStr)
//         : true ||
//         mail.body
//         ? mail.body.toLowerCase().includes(searchStr)
//         : true}
// )
// }
