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
  template: `
          <section class="mail-details flex" v-if="mail">
                    <h2>{{ subjectToShow }}</h2>
                    <div class="mail-details-info flex">
                    <div class="mail-details-addresses">
                      <div>
                        <span class="bold">
                        {{ contactToShow }}
                        </span>
                      <{{addressToShow}}>
                      </div>
                      <p>
                        to: {{ destinationToShow }} 
                      </p>
                    </div>
                    <div class="mail-details-date">
                      {{ dateToShow }}
                    </div>
                    </div>
                    <div class="mail-details-body">
                      {{ this.mail.body }}
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
    subjectToShow() {
      return (
        this.mail.subject[0].toUpperCase() + this.mail.subject.substring(1)
      );
    },
    contactToShow() {
      return this.mail.to
        ? mailService.getUser().fullname
        : mailService.nameToShow(this.mail);
    },
    addressToShow() {
      return this.mail.to ? mailService.getUser().email : this.mail.from;
    },
    destinationToShow() {
      return this.mail.to ? this.mail.to : 'me';
    },
    dateToShow() {
      const date = this.mail.sentAt
        ? new Date(this.mail.sentAt).toGMTString()
        : new Date(this.mail.receivedAt).toGMTString();
      return date.substring(5,22);
    },
  },
  components: {},
};
