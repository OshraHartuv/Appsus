import mailFilter from './mail-filter.cmp.js';

export default {
  template: `
          <header class="mail-header">
              <div class="logo">
              <h3>mail</h3>
              </div>
              <mail-filter @filtered="setFilter"></mail-filter> 
          </header>
      `,

  components: {
    mailFilter,
  },
};
