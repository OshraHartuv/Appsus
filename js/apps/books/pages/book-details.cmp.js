import longText from '../../../cmps/long-text.cmp.js';
import { bookService } from '../services/book-service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
  template: `
        <section class="book-details app-main" v-if="book">
          <div class="book-details-nav">
            <div class="book-links">
              <router-link class="link-to-prev-book"  :to="'/book/'+previousBookId"><< Previous</router-link>
              <router-link class="link-to-next-book" :to="'/book/'+nextBookId">Next >></router-link>
            </div>
            <router-link to="/book" class="close-details">x</router-link>
          </div>
            <h3>{{ titleToShow }}</h3>
            <p v-if="book.listPrice.isOnSale" class="sale">ON SALE!</p>
            <ul  class="book-details">
              <li>
                <span class="underline">Author:</span>
                {{ (book.authors).join(' , ') }}
              </li>
              <li>
                <span class="underline">Subtitle:</span>
                {{ book.subtitle }}
              </li>
              <li>
                <span class="underline">Published at:</span>
                   {{ publishedToShow }}
                  </li>
                  <li>
                    <span class="underline">Description:</span> 
                    <long-text :txt="book.description"/>
                </li>
                <li>
                  <span class="underline">PageCount:</span>
                  {{ pagesToShow }} 
                </li>
                <li>
                  <span class="underline">Categories:</span>
                  {{ (book.categories).join(' , ') }}
                </li>
                <li>
                  <span class="underline">Language:</span> {{ book.language }}
                </li>
                <li>
                  <span class="underline">Price:</span >
                  <span :class="priceStyle"> 
                    {{ priceToShow }} 
                  </span>
                </li>
              </ul>
              
              <div class="reviews-container">
              <router-link class="link-to-add-review" :to="'/book/'+ this.book.id +'/review-add'">Add review</router-link>
              <p v-if="!book.reviews || !book.reviews.length">No reviews</p>
              <div v-else class="reviews">
                <h1 class="underline">reviews:</h1>
                <div class="review-cards">
                  <ul v-for="(review, idx) in book.reviews" class="review-container">
                <li> <div class="underline">Review from:</div> {{review.fullName}}</li>
                <li><div class="underline">Rating:</div> 
                <span v-for="num in review.rate" class="fa fa-star checked">
                  </span> </li>
                  <li><div class="underline"> Read at:</div> {{review.readAt}} </li>
                  <li class="review-content"><div class="underline">Review:</div><pre>{{review.content}} </pre> </li>
                  <button @click=remove(idx)>Delete</button>
                </ul>
                </div>
              </div>
             
            </div>
            </section>
    `,
  data() {
    return {
      book: null,
      nextBookId: null,
      previousBookId: null
    };
  },
  created() {
    const { bookId } = this.$route.params;
    bookService.getById(bookId).then((book) => (this.book = book));
  },
  watch: {
    '$route.params.bookId': {
      handler() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId)
          .then(book => this.book = book);
        bookService.getNextBookId(bookId)
          .then(bookId => this.nextBookId = bookId);
        bookService.getPreviousBookId(bookId)
          .then(bookId => this.previousBookId = bookId);

      },
      immediate: true,
    },
  },
  methods: {
    remove(idx) {
      this.book.reviews.splice(idx, 1);
      bookService
        .save(this.book)
        .then(() => {
          const msg = {
            txt: 'Review deleted successfully',
            type: 'success',
          };
          eventBus.$emit('showMsg', msg);
        })
        .catch((err) => {
          const msg = {
            txt: 'Error. Please try later',
            type: 'error',
          };
          eventBus.$emit('showMsg', msg);
        });
    },
  },
  computed: {
    titleToShow() {
      return this.book.title[0].toUpperCase() + this.book.title.substring(1);
    },
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
      return this.book.listPrice.amount + sign;
    },
    pagesToShow() {
      let pages = this.book.pageCount;
      if (pages > 500) return pages + ' Long reading';
      if (pages > 200) return pages + ' Decent reading';
      if (pages < 100) return pages + ' Light reading';
      else return pages;
    },
    publishedToShow() {
      if (this.book.publishedDate === 'unknown') return 'unknown';
      let year = +`${this.book.publishedDate}`.substring(0, 4);
      if (year < new Date().getFullYear() - 10) return year + ' Veteran Book';
      if (year > new Date().getFullYear() - 1) return year + ' New!';
      else return year;
    },
    priceStyle() {
      return {
        red: this.book.listPrice.amount > 150,
        green: this.book.listPrice.amount < 20,
      };
    },
  },
  components: {
    longText,
  },
};
