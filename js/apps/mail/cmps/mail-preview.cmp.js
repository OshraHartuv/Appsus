import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';


export default {
  props: ['mail'],
  // {
  //   id: 'e101',
  //   subject: 'Miss you!',
  //   body: 'Would love to catch up sometimes',
  //   isRead: false,
  //   sentAt: 1631279089000,
  //   to: 'momo@momo.com',
  // },
  template: `
      <section class="mail-preview">
        <router-link :to="'/mail/'+mail.id" >
          <div class="mail-preview-container" :class="{ bold: !mail.isRead, read: mail.isRead}">
            <span class="mail-preview-contact">
              <span v-if="mail.to">to: </span>
                {{ contactToShow }}
            </span>
            <span class="mail-preview-text">
              <span class="mail-preview-subject">
                {{ mail.subject }}
                <!-- {{ subjectToShow }} -->
              </span> - 
              <span class="mail-preview-body">
              {{ mail.body }}
              </span>
            </span>
            <span class="mail-preview-date">
            {{ dateToShow }}
            </span>
            <button @click.prevent="deleteMail(mail.id)" class="delete-mail-btn"><img src="img/trash.svg" class="trash-img-preview"></button>
          </div>
        </router-link>
      </section>
        
      `,
  methods: {
    deleteMail(mailId){
      console.log('deleted');
      eventBus.$emit('delete',mailId)
    }
  },
  computed: {
    // subjectToShow() {
    //   return (
    //      (this.mail.subject) ? this.mail.subject[0].toUpperCase() + this.mail.subject.substring(1): ''
    //   );
    // },
    contactToShow() {
      if (!this.mail.to && this.mail.isDraft) return '';
      return mailService.nameToShow(this.mail);
    },
    dateToShow() {
      var date;
      if (this.mail.sentAt) date = new Date(this.mail.sentAt);
      else date = new Date(this.mail.receivedAt);
      if (
        Date.now() - this.mail.sentAt < 86400000 ||
        Date.now() - this.mail.receivedAt < 86400000
      ) {
        return `${date}`.substring(16, 21);
      } else {
        return `${date}`.substring(4, 10);
      }
    },
  },
};
