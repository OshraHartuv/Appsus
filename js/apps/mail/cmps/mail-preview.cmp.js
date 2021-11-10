import { mailService } from "../services/mail.service.js";

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
          <!-- <router-link :to="'/mail/'+mail.id" > -->
            <section class="mail-preview">
            <router-link :to="'/mail/'+mail.id" >
            <div class="mail-preview-container" :class="{ bold: !mail.isRead}">
            <span class="mail-preview-contact">
              <span v-if="mail.to">to: </span>
                {{ contactToShow }}
            </span>
            <span class="mail-preview-text">
              <span class="mail-preview-subject bold">{{ subjectToShow }}</span>
              <span class="mail-preview-body">{{ mail.body }}</span>
            </span>
            <span class="mail-preview-date">{{ dateToShow }}</span>
          </div>
        </router-link>
        </section>
        
      `,
  computed: {
    subjectToShow() {
      return (
        this.mail.subject[0].toUpperCase() + this.mail.subject.substring(1)
      );
    },
    contactToShow() {
      return mailService.nameToShow(this.mail)
    },
    dateToShow() {
      const date =
       (this.mail.sentAt) ?
        new Date(this.mail.sentAt).toGMTString() :
        new Date(this.mail.receivedAt).toGMTString();
      if (this.mail.sentAt - Date.now() > 86400000) {
        return date.substring(17,22);
      } else {
        return  date.substring(5,11)
      }
    },
  },
};
