import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
  props: ['mailToEdit'],
  template: `
          <section class="mail-add flex">
                <div class="mail-add-header flex">
                  <span class="bold">New Massage</span>
                    <span class="nav flex">
                        <button class="downsize">_</button>
                        <button class="expand">&#10530;</button>
                        <button class="close-new-mail" @click="closeDraft">x</button>
                    </span>
                </div>
                <div class="mail-add-main flex">
                    <div class="mail-add-to">
                      <input @input="draftMail" v-model="newMail.to" type="email" class="mail-add-input" placeholder="To">
                    </div>
                    <div class="mail-add-subject">
                      <input @input="draftMail" v-model="newMail.subject" type="text" placeholder="Subject" class="mail-add-input">
                    </div>
                    <textarea @input="draftMail" v-model="newMail.body"  class="mail-add-input mail-add-body">
                    </textarea>
                    <!-- </div> -->
                </div>
                <div class="mail-add-editors flex">
                    <button class="send-btn" @click="sendMail">Send</button>
                    <button class="trash-btn flex" ><img src="img/trash.svg" class="trash-img"></button>
                </div>
          </section>
      `,
  data() {
    return {
      newMail: {
        to: '',
        subject: '',
        body: '',
        isRead: true,
        isDraft: true,
      },
    };
  },
  created() {
    if (this.mailToEdit) {
      mailService.getMailById(this.mailToEdit.id)
      .then((mail) => {
        this.newMail = mail;
      });
    }
  },
  methods: {
    draftMail() {
      this.newMail.sentAt = Date.now();
      // every 5 secs
      mailService.saveMail(this.newMail).then(() => {});
    },
    sendMail() {
      if (!this.newMail.to.includes('@') || !this.newMail.to.includes('.')) {
        const msg = {
          txt: 'Mail not sent, please enter a valid e-mail address',
          type: 'error',
        };
        eventBus.$emit('showMsg', msg);
      } else {
        this.newMail.sentAt = Date.now();
        this.newMail.isDraft = false;
        mailService.saveMail(this.newMail).then(() => {
          this.$emit('close');
        });
      }
    },
    closeDraft() {
      if (!this.newMail.to && !this.newMail.subject && !this.newMail.body) {
        this.$emit('close');
        return;
      }
      this.newMail.sentAt = Date.now();
      mailService.saveMail(this.newMail).then(() => {
        this.$emit('close');
      });
    },
  },
};
