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
                    <h2>{{ mail.subject }}</h2>
                    <div class="mail-details-info flex">
                    <div class="mail-details-addresses">
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
                      {{ mail.body }}
                    </div>
                  <router-link to="/mail" class="close-details">x</router-link>
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
    //   remove(idx) {
    //     this.mail.reviews.splice(idx, 1);
    //     mailService
    //       .save(this.mail)
    //       .then(() => {
    //         const msg = {
    //           txt: 'Mail deleted successfully',
    //           type: 'success',
    //         };
    //         eventBus.$emit('showMsg', msg);
    //       })
    //       .catch((err) => {
    //         console.log('err', err);
    //         const msg = {
    //           txt: 'Error. Please try later',
    //           type: 'error',
    //         };
    //         eventBus.$emit('showMsg', msg);
    //       });
    //   },
  },
  computed: {
    // subjectToShow() {
    //   return (
    //     this.mail.subject[0].toUpperCase() + this.mail.subject.substring(1)
    //   );
    // },
    contactToShow() {
      if (!this.mail.to && this.mail.isDraft) return ''
      return this.mail.to
        ? mailService.getUser().fullname
        : mailService.nameToShow(this.mail);
    },
    mailFrom() {
      return (this.mail.to || this.mail.isDraft) ? mailService.getUser().email : this.mail.from;
    },
    mailTo() {
      if (!this.mail.to && this.mail.isDraft) return ''
      return this.mail.to ? this.mail.to : 'me';
    },
    dateToShow() {
      var date; 
      if (this.mail.sentAt) date =  new Date(this.mail.sentAt).toGMTString()
      else if (this.mail.receivedAt) date = new Date(this.mail.receivedAt).toGMTString();
      // else if (this.mail.editedAt) date = new Date(this.mail.editedAt).toGMTString();
      console.log(date);
      return date.substring(5,22);
    },
  },
  components: {},
};
