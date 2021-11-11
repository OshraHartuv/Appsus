export default {
  props: ['mails'],
  template: `
          <section class="mail-menu flex" v-if="mails">
            <button @click="onCompose">Compose</button>
              <router-link to="/mail" >
                <div class="mail-menu nav flex ">
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
                  <div @click="box('drafts')"
                  :class="{selectedBox: currBox ==='draft'}">Drafts</div>
                  <div>Starred</div>
                  <div>Labels</div>
                  <select @change="setSort" v-model="sort" class="sort-select">
                    <option value="date" >Sort: Date</option>
                    <option value="subject">Sort: Subject</option>
                  </select>
                </div> 
              </router-link>
          </section>
      `,
  data() {
    return {
      currBox: 'all',
      sort: 'date'
    };
  },
  methods: {
    box(box) {
      this.currBox = box;
      this.$emit('mailBoxed', this.currBox);
    },
    onCompose(){
      this.$emit('compose')
    },
    setSort(){
      this.$emit('sort', this.sort)
      console.log(this.sort);
    }
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
