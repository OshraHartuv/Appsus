
export default {
  props: ['book'],
  template: `
        <div class="book-preview">
          <p><span class="underline">{{ titleToShow }}</span></p>
          <p v-if="book.listPrice.isOnSale" class="sale">SALE!</p>
          <router-link :to="'/book/'+book.id" >
          <img :src="book.thumbnail" alt="book-img" class="book-preview-img">
          </router-link>
          <p>
          <span class="underline">Price:</span> 
          {{ priceToShow }}
          </p>
        </div>
    `,
  computed: {
    priceToShow() {
      let sign;
      switch (this.book.listPrice.currencyCode) {
        case 'EUR':
          sign = '€';
          break;
        case 'ILS':
          sign = '₪';
          break;
        case 'USD':
          sign = '$';
          break;
      }
      return this.book.listPrice.amount + ' ' + sign;
    },
    titleToShow() {
      return this.book.title[0].toUpperCase() + this.book.title.substring(1);
    },
  },
};
