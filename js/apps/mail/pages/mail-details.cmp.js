import longText from '../../../cmps/long-text.cmp.js';
import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import mailFilter from '../cmps/mail-filter.cmp.js';
import mailMenu from '../cmps/mail-menu.cmp.js';

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
          <section class="mail-details">
            <mail-menu class="mail-menu-container"></mail-menu> 
            <div class="mail-main">      
                <mail-filter ></mail-filter>
                <div class="mail-content" v-if="mail">
                <
                  <div class="mail-text">
                    <h2>{{ subjectToShow }}</h2>
                    <h3><span class="bold">
                    {{ contactToShow }}
                    </span>< {{addressToShow}} ></h3>
                    <p>to: {{ destinationToShow }} </p>
                    <p>mail details</p>
                    <p>mail details</p>
                    <p>mail details</p>
                  </div>
                     
                  <!-- <router-link :to="'/mail/'+previousMailId"><< Previous mail</router-link>
                  <router-link :to="'/mail/'+nextMailId">Next mail >></router-link> -->
                  <router-link to="/mail" class="close-details">x</router-link>
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
      console.log(this.mail);
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
      return (this.mail.to) ? mailService.getUser().fullname : mailService.nameToShow(this.mail)
    },
    addressToShow(){
      return (this.mail.to) ? mailService.getUser().email : this.mail.from
    },
    destinationToShow(){
      return (this.mail.to) ? this.mail.to: 'me';
    }
  },
  components: {
    longText,
    mailMenu,
    mailFilter,
  },
};
