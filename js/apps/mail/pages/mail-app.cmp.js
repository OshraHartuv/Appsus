import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
import mailMenu from '../cmps/mail-menu.cmp.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailAdd from '../cmps/mail-add.cmp.js';
// import mailHeader from '../cmps/mail-header.cmp.js';
import mailDetails from './mail-details.cmp.js';

export default {
  name: 'mail-app',
  template: `
        <section class="mail-app flex" v-if="mails" >
          <div class="mail-header flex">
            <div class="filter-container flex">
              <button class="hamburger-menu" @click.stop= " toggleMenu">
                <span class="fa fa-bars"></span>
              </button>          
              <span class="fa fa-envelope mail-logo"></span>
              <mail-filter @filtered="setFilter" :box="filterBy.box"></mail-filter>
            </div>
          </div>
          <div class="mail-main flex">
            <mail-menu class="mail-menu-container flex" @mailBoxed="setMailBox" 
            :mails="mails" 
            @compose="setNewMail" 
            @sort="setSort"
            :class="{ 'show-menu': !menuClose, 'hide-menu': menuClose}">
            </mail-menu >
            <mail-list v-if="!selectedMail" :mails="mailsToShow" class="mail-list-container"></mail-list>
            <router-view  v-else></router-view>
            <mail-add v-if="isCompose" @close="closeCompose" :mailToEdit="mailToEdit"></mail-add>
            <button v-show="!isCompose" class="compose-btn-mobile flex" @click="setNewMail">
              <span class="fa fa-edit"></span>
              Compose
            </button>
          </div> 

        </section>
    `,

  data() {
    return {
      mails: null,
      mailToEdit: null,
      selectedMail: null,
      isCompose: false,
      sortBy: 'date',
      filterBy: {
        str: '',
        box: 'all',
      },
      menuClose: true,
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
          console.log(this.$route.params);
          const { mailId: mailId } = this.$route.params;
             mailService.getMailById(mailId)
            .then((mail) => {
              this.selectedMail = mail;
            });
      },
      immediate: true,
    },
    '$route.params.note': {
      handler() {
        console.log(this.$route.params);
        const {note} = this.$route.params;
        if (note) this.composeNote(note)
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
      console.log('setBox');
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
      mailService.getMailById(id).then((mail) => {
        if (mail.removedAt)
          mailService
            .removeMail(id)
            .then(() => {
              this.sendMsg('Deleted successfully', 'success');
              this.loadMails();
            })
            .catch(() => {
              this.sendMsg('Error. Please try later', 'error');
            });
        else
          mailService
            .editAndSave(mail, 'removedAt', Date.now())
            .then(() => {
              this.sendMsg('Moved to trash', 'success');
              this.loadMails();
            })
            .catch(() => {
              this.sendMsg('Error. Please try later', 'error');
            });
      });
    },
    onEditDraft(mail) {
      this.mailToEdit = mail;
      this.setNewMail();
    },
    setSort(val) {
      this.sortBy = val;
    },
    sortMails(mails) {
      if (this.sortBy === 'date') {
        return mails.sort((a, b) => {
          return (
            (b.sentAt ? b.sentAt : b.receivedAt) -
            (a.sentAt ? a.sentAt : a.receivedAt)
          );
        });
      } else if (this.sortBy === 'subject') {
        mails.sort((a, b) => {
          if (a.subject.toLowerCase() < b.subject.toLowerCase()) return -1;
          if (a.subject.toLowerCase() > b.subject.toLowerCase()) return 1;
          return 0;
        });
      } else if (this.sortBy === 'body') {
        mails.sort((a, b) => {
          if (a.body.toLowerCase() < b.body.toLowerCase()) return -1;
          if (a.body.toLowerCase() > b.body.toLowerCase()) return 1;
          return 0;
        });
      }
    },
    toggleMenu() {
      this.menuClose ? (this.menuClose = false) : (this.menuClose = true);
    },
    sendMsg(txt, type) {
      const msg = {
        txt,
        type,
      };
      eventBus.$emit('showMsg', msg);
    },
    composeNote(note){
      // var note = JSON.parse(note.note)
      console.log(note);
      // var noteEdit= note +'}}'
      var noteEdit = JSON.parse(note)
      console.log(noteEdit);
      this.mailToEdit=noteEdit
      this.mailToEdit['type'] = 'note'
      // this.mailToEdit['subject'] = 'hi'
      console.log(this.mailToEdit);
      this.setNewMail()
      // if (noteEdit.title) this.mailToEdit.subject = noteEdit.title;
      // if (noteEdit.todos && noteEdit.todos.length) this.mailToEdit.body = noteEdit.todos.join(' ');
      // this.setNewMail;

    }
  },
  computed: {
    mailsToShow() {
      var mailsToShow;
      switch (this.filterBy.box) {
        case 'all':
          mailsToShow = this.mails.filter((mail) => {
            return !mail.removedAt;
          });
          break;
        case 'sent':
          mailsToShow = this.mails.filter((mail) => {
            return mail.to && !mail.isDraft && !mail.removedAt;
          });
          break;
        case 'inbox':
          mailsToShow = this.mails.filter((mail) => {
            return mail.from && !mail.removedAt;
          });
          break;
        case 'read':
          mailsToShow = this.mails.filter((mail) => {
            return mail.isRead && !mail.isDraft && mail.from && !mail.removedAt;
          });
          break;
        case 'unread':
          mailsToShow = this.mails.filter((mail) => {
            return !mail.isRead && !mail.removedAt;
          });
          break;
        case 'drafts':
          mailsToShow = this.mails.filter((mail) => {
            return mail.isDraft && !mail.removedAt;
          });
          break;
        case 'stared':
          mailsToShow = this.mails.filter((mail) => {
            return mail.isStared;
          });
          break;
        case 'trash':
          mailsToShow = this.mails.filter((mail) => {
            return mail.removedAt;
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
    // mailHeader
  },
};
