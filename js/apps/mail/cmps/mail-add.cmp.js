import { mailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
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
                    <div class="mail-add-body flex">
                    <div id="mail-add-body" @input="contentEditableChange()" class="mail-add-input mail-add-input-body"  contenteditable></div>  
                    </div>
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
        isRead: false,
        isDraft: true,
        // editedAt: null,
        // sentAt: null
      },
    };
  },
  methods: {
    draftMail() {
      // this.newMail.editedAt = Date.now();
      this.newMail.sentAt = Date.now();

      mailService.saveMail(this.newMail).then(() => {
        console.log('draft');
      });
      //   console.log(this.newMail);
    },
    contentEditableChange() {
      this.newMail.body = document.getElementById('mail-add-body').innerHTML;
      this.draftMail();
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
        console.log('close');
      this.newMail.sentAt = Date.now();
      // this.newMail.editedAt = Date.now();
      mailService.saveMail(this.newMail).then(() => {
        console.log('close');
        this.$emit('close');

      });
    },
  },
};
