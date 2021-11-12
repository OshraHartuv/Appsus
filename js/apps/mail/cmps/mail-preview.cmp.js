import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';


export default {
  props: ['mail'],
  template: `
      <section class="mail-preview">
          <div  @click="switcher(mail)">
            <div class="mail-preview-container" :class="{ bold: !mail.isRead, read: mail.isRead}">
            <button class="star" 
            @click.stop="starMail" 
            :title="mail.isStared ? 'Remove star': 'Star'">
                  <span class="fa fa-star" 
                  :class="{'stared':mail.isStared,'black-stroke':!mail.isStared}"
                   
                  >
                  </span>
              </button>
              <span class="mail-preview-contact">
                <span v-if="mail.isDraft">
                  <span class="red">Draft</span>
                  <span v-if="contactToShow">,</span>
                </span>
                <span v-if="mail.to">to: </span>
                  {{ contactToShow }}
              </span>
              <span class="mail-preview-text">
                <span class="mail-preview-subject">
                  {{ mail.subject }}
                </span> - 
                <span class="mail-preview-body">
                  {{ mail.body }}
                </span>
              </span>
              <span class="mail-preview-date">
                {{ dateToShow }}
              </span>
              <button @click.stop="deleteMail(mail.id)"
              title="Delete" 
              class="delete-mail-btn">
                <span class="fa fa-trash"></span>
              </button>
            </div>
          </div>
      </section>
        
      `,
  methods: {
    deleteMail(mailId){
      eventBus.$emit('delete',mailId)
    },
    switcher(mail){
      if (!mail.isDraft) this.$router.push('/mail/'+mail.id)
      else eventBus.$emit('editDraft',mail)
    },
    starMail(){
      !this.mail.isStared ? this.mail.isStared =true : this.mail.isStared=false;
      mailService.saveMail(this.mail).then(() => {
        eventBus.$emit('savedMail');
      })
    }
  },
  computed: {
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
