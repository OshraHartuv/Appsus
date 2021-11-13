import { eventBus } from '../../../services/event-bus-service.js';
import { bookService } from '../services/book-service.js';

const KEY = 'AIzaSyDQjVlpzBYO6aHtrU9ydnXSKqk-zq7c6eQ';

export default {
  template: `
        <section class="search-online app-main">
            <h3>Search online</h3>
            <form class="search-form" @submit.prevent="search">
                <input type="text" placeholder="Book title" v-model="searchStr">
                <button>Search</button>
            </form>
            <ul v-show="searchResults">
                <li v-for="googleBook in searchResults">{{ googleBook.volumeInfo.title}} <button @click="save(googleBook)">+</button></li>
                 
            </ul>
        </section>
    `,
  data() {
    return {
      searchStr: null,
      searchResults: null,
    };
  },
  methods: {
    search() {
      return axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${this.searchStr}:keyes&key=${KEY}
        `
        )
        .then((res) => {
          this.searchResults = res.data.items;
        })
        .catch((err) => {
          console.log('err', err);
          const msg = {
            txt: 'Error. Please try later',
            type: 'error',
          };
          eventBus.$emit('showMsg', msg);
        });
    },
    save(googleBook) {
      console.log(googleBook);
      bookService.addGoogleBook(googleBook)
        .then(() => {
          const msg = {
            txt: 'Book added successfully',
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
};
