export default {
  props: ['mail'],
  template: `
          <div class="mail-preview">
            <router-link :to="'/mail/'+mail.id" >
            <p><span class="underline">{{ subjectToShow }}</span></p>
            </router-link>
          </div>
      `,
  computed: {
    subjectToShow() {
      return this.mail.subject[0].toUpperCase() + this.mail.subject.substring(1)
    // return this.mail.subject
      
    },
  },
};
