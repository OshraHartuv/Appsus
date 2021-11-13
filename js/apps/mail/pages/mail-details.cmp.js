import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';

// {
//   id: 'e101',
//   subject: 'Miss you!',
//   body: 'Would love to catch up sometimes',
//   isRead: false,
//   sentAt: 1631279089000,
//   to: 'momo@momo.com',
// }

export default {
  name: 'mail-details',
  template: `
          <section class="mail-details flex" v-if="mail">
            <div class="details-header flex">
              <div class="mail-details-tools flex">
                <button @click="deleteMail" title="Delete">
                  <span class="fa fa-trash"></span>
                </button>
                <button class="mark-as">
                    <span class="fa" 
                    :class="{'fa-envelope': !mail.isRead ,  'fa-envelope-open': mail.isRead}"
                    :title="(mail.isRead)?'Mark as unread': 'Mark as read'"
                    @click="markAs">
                    </span>
                </button>
                <button class="star">
                    <span class="fa fa-star" 
                    :class="{'stared':mail.isStared,'grey-color':!mail.isStared}"
                    :title="(mail.isStared)?'Remove star': 'Star'" 
                    @click="starMail">
                    </span>
                </button>
              </div>
              <div class="details-nav">
                <button title="save note" 
                @click="saveNote"
                title="save as note">
                  <span class="fa fa-sticky-note"></span>
                </button>
                <button title="Previous mail" @click="goToPrev">
                  <span class="fa fa-arrow-left"></span>
                </button>
                <button title="Next mail" @click="goToNext">
                  <span class="fa fa-arrow-right" ></span>
                </button>
                <button @click="closeDetails">
                  <span class="fa fa-times"></span>
                </button>
              </div>
            </div>
            <div class="mail-content">
                <h2>{{ mail.subject }}</h2>
                <div class="mail-details-info flex">
                  <div class="mail-details-addresses flex">
                    <div>
                      <span class="bold">
                        {{ contactToShow }}
                      </span>
                      <{{ mailFrom }}>
                    </div>
                      <p>
                        to: {{ mailTo }} 
                      </p>
                  </div>
                  <div class="mail-details-date">
                    {{ dateToShow }}
                  </div>
                </div>
                <div class="mail-details-body">
                    <pre>{{ mail.body }}</pre>
                </div>
            </div>
          </section>
      `,
  data() {
    return {
      mail: null,
      nextMailId: null,
      previousMailId: null,
    };
  },
  created() {
    const { mailId: mailId } = this.$route.params;
    mailService.getMailById(mailId).then((mail) => {
      this.mail = mail;
      // this.mail.isRead = true;
      mailService.editAndSave(this.mail, 'isRead',true)
      // this.mail = mail;
      // this.mail.isRead = true;
      // mailService.saveMail(this.mail)
      .then(() => {
        eventBus.$emit('savedMail');
      });
    });
  },
  watch: {
    '$route.params.mailId': {
      handler() {
        const { mailId: mailId } = this.$route.params;
        mailService.getMailById(mailId).then((mail) => (this.mail = mail));
        mailService
          .getNextMailId(mailId)
          .then((mailId) => (this.nextMailId = mailId));
        mailService
          .getPreviousMailId(mailId)
          .then((mailId) => (this.previousMailId = mailId));
      },
      immediate: true,
    },
  },
  methods: {
    markAs() {
      const val = this.mail.isRead ?  false : true;
      mailService.editAndSave(this.mail, 'isRead',val).then(() => {
      // this.mail.isRead ? (this.mail.isRead = false) : (this.mail.isRead = true);
      // mailService.saveMail(this.mail).then(() => {
        eventBus.$emit('savedMail');
      });
    },
    deleteMail(){
      eventBus.$emit('delete',this.mail.id)
      this.$router.push('/mail')
    },
    starMail(){
      const val = (this.mail.isStared) ? false : true;
      mailService.editAndSave(this.mail,'isStared',val).then(() => {
      // (!this.mail.isStared) ? (this.mail.isStared =true) : (this.mail.isStared=false);
      // mailService.saveMail(this.mail).then(() => {
        eventBus.$emit('savedMail');
      })
    },
    goToNext(){
      this.$router.push('/mail/'+this.nextMailId)
    },
    goToPrev(){
      this.$router.push('/mail/'+this.previousMailId)
    },
    closeDetails(){
      this.$router.push('/mail')

    },
    saveNote(){
      let msg = JSON.stringify(this.mail)
      this.$router.push(`/keep/notefrommail/${msg}`);
    }
  },
  computed: {
    contactToShow() {
      if (!this.mail.to && this.mail.isDraft) return '';
      return this.mail.to
        ? mailService.getUser().fullname
        : mailService.nameToShow(this.mail);
    },
    mailFrom() {
      return this.mail.to || this.mail.isDraft
        ? mailService.getUser().email
        : this.mail.from;
    },
    mailTo() {
      if (!this.mail.to && this.mail.isDraft) return '';
      return this.mail.to ? this.mail.to : 'me';
    },
    dateToShow() {
      var date;
      if (this.mail.sentAt) date = new Date(this.mail.sentAt);
      else if (this.mail.receivedAt) date = new Date(this.mail.receivedAt);
      return `${date}`.substring(4, 21);
    },
  },
  components: {},
};
