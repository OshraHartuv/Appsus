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
                        <button class="close-new-mail">x</button>
                    </span>
                </div>
                <div class="mail-add-main flex">
                    <div class="mail-add-to">
                    <input @input="draftMail" v-model="newMail.to" type="email" id="email" name="email" class="mail-add-input" placeholder="To">
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
                    <button class="trash-btn flex"><img src="img/trash.svg" class="trash-img"></button>
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
        sentAt:'null'
      },
    };
  },
  methods: {
    draftMail() {
      console.log(this.newMail);
    },
    contentEditableChange() {
      this.newMail.body = document.getElementById('mail-add-body').innerHTML;
      this.draftMail();
    },
    sendMail() {
        console.log(this.newMail);
        if(!this.newMail.to.includes('@') || !this.newMail.to.includes('.')){
            user
        }
        this.newMail.sentAt= Date.now()
        // mailService.saveMail(this.newMail)
        //     .then(()=>{
        //         this.$emit('sentMail')
        //     })
        console.log(this.newMail);
        
    },
  },
};
