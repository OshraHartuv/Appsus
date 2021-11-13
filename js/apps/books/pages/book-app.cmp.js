import { bookService } from '../services/book-service.js'
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import appHeader from '../cmps/app-header.cmp.js';

export default {
    template: `
        <section class="book-app app-main">
        <app-header />
        <book-filter @filtered="setFilter"></book-filter> 
        <!-- <router-link to="/search">Search books online</router-link> -->
        <book-details :book="selectedBook" v-if="selectedBook" @close="closeDetails"></book-details>
        <book-list v-else :books="booksToShow"></book-list> 
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null
        };
    },
    created() {
        this.loadBooks();
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books);
        },
        closeDetails() {
            this.selectedBook = null;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const searchStr = this.filterBy.title.toLowerCase();
            const fromPrice = this.filterBy.fromPrice || 0;
            const toPrice = this.filterBy.toPrice || Infinity;
            const booksToShow = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr) &&
                    book.listPrice.amount >= fromPrice &&
                    book.listPrice.amount <= toPrice
            });
            return booksToShow;
        },


    },
    components: {
        bookList,
        bookDetails,
        bookFilter,
        appHeader
    }
};