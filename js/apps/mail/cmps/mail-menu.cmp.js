export default {
  props: ['mails'],
  template: `
          <section class="mail-menu flex" v-if="mails">
              <button>Compose</button>
              <!-- <ul class="clean-list"> -->
                <div  @click="box('all')" 
                :class="{selectedBox: currBox ==='all'}">All mail</div>
                <div  @click="box('inbox')"
                :class="{selectedBox: currBox ==='inbox'}">Inbox</div>
                <div  @click="box('sent')"
                :class="{selectedBox: currBox ==='sent'}">Sent</div>
                <div  @click="box('read')"
                :class="{selectedBox: currBox ==='read'}">Read</div>
                <div  @click="box('unread')"
                :class="{selectedBox: currBox ==='unread'}">Unread
                <span>
                    {{ unreadCount }}
                </span>
                </div>
                <div>Starred</div>
                <div>Drafts</div>
                <div>Labels</div>
                <!-- <div class="clean-list"> -->
                    <!-- <li>label</li>
                    <li>label</li>
                    <li>label</li> -->
                <!-- </div>     -->
              <!-- </ul>             -->

          </section>
      `,
  data() {
    return {
      currBox: 'all',
    };
  },
  methods: {
    box(box) {
      this.currBox = box;
      this.$emit('mailBoxed', this.currBox);
    },
  },
  computed: {
    unreadCount() {
      var count = 0;
      this.mails.forEach(mail => {
        count += mail.isRead ? 0 : 1;
      });
      return count;
    },
    add(accumulator, a) {
      return accumulator + a;
    },
  },
};
