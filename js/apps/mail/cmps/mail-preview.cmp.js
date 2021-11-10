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
          <router-link :to="'/mail/'+mail.id" >
            <div class="mail-preview" :class="{ bold: !mail.isRead}">
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
      `,
  computed: {
    subjectToShow() {
      return (
        this.mail.subject[0].toUpperCase() + this.mail.subject.substring(1)
      );
    },
    contactToShow() {
      const contactMail = this.mail.to ? this.mail.to : this.mail.from;
      const contactName = contactMail.substring(0, contactMail.indexOf('@'));
      return contactName;
    },
    dateToShow() {
      const date =
       (this.mail.sentAt) ?
        new Date(this.mail.sentAt).toGMTString() :
        new Date(this.mail.receivedAt).toGMTString();
      if (this.mail.sentAt - Date.now() > 86400000) {
        console.log(date, 'today');
        return date.substring(17,22);
      } else {
        console.log(date, 'not today');
        return  date.substring(5,11)
      }
    },
  },
};
