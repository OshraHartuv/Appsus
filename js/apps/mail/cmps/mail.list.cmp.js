import mailPreview from './mail-preview.cmp.js';

export default {
    props: ['mails'],
    template: `
      <!-- <transition-group
      name="staggered-fade"
      tag="ul"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      class="book-list"
      > -->
        <ul class="mail-list">
          <li v-for="mail in mails" :key="mail.id" class="mail-preview-container" >
              <mail-preview :mail="mail" @click.native="select(mail)" />
            </li>
        </ul>
      <!-- </transition-group> -->
      `,
    methods: {},
    computed: {
    //   computedList: function () {
    //     var vm = this;
    //     return this.list.filter(function (item) {
    //       return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;
    //     });
    //   },
    },
    methods: {
      select(mail) {
        this.$emit('selected', mail);
      },
    //   beforeEnter: function (el) {
    //     el.style.opacity = 0;
    //     el.style.height = 0;
    //   },
    //   enter: function (el, done) {
    //     var delay = el.dataset.index * 150;
    //     setTimeout(function () {
    //       Velocity(el, { opacity: 1, height: '100%' }, { complete: done });
    //     }, delay);
    //   },
    //   leave: function (el, done) {
    //     var delay = el.dataset.index * 150;
    //     setTimeout(function () {
    //       Velocity(el, { opacity: 0, height: 0 }, { complete: done });
    //     }, delay);
    //   },
    },
  
    components: {
      mailPreview,
    },
  };